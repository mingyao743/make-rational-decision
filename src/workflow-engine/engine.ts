// ============================================================
// workflow-engine/engine.ts
// Workflow state machine and session management
// ============================================================

import type { WorkflowSession, StepExecution, WorkflowDefinition, SkillSlug } from './types.js';
import { getWorkflow, WORKFLOWS } from './workflows.js';
import { writeJson, readJson, fileExists, ensureDir, listDir } from '../tracking-system/store.js';
import * as path from 'node:path';

/** Session ID generator */
let sessionCounter = 0;
function generateSessionId(): string {
  sessionCounter++;
  return `WS-${Date.now()}-${sessionCounter}`;
}

/** The workflow engine */
export class WorkflowEngine {
  private sessionsDir: string;

  constructor(basePath: string) {
    this.sessionsDir = path.join(basePath, 'workflow-sessions');
    ensureDir(this.sessionsDir);
  }

  private sessionPath(sessionId: string): string {
    return path.join(this.sessionsDir, `${sessionId}.json`);
  }

  /** Start a new workflow session */
  startSession(workflowId: string): WorkflowSession {
    const wf = getWorkflow(workflowId);
    if (!wf) throw new Error(`Workflow "${workflowId}" not found`);

    const sessionId = generateSessionId();
    const session: WorkflowSession = {
      id: sessionId,
      workflowId,
      currentStepIndex: -1, // Not started yet
      executions: [],
      context: {},
      status: 'active',
      startedAt: new Date().toISOString(),
      endedAt: null,
      branchedTo: null,
    };

    this.saveSession(session);
    return session;
  }

  /** Advance to the next step */
  advanceStep(sessionId: string): WorkflowSession {
    const session = this.getSession(sessionId);
    if (!session) throw new Error(`Session "${sessionId}" not found`);
    if (session.status !== 'active') throw new Error(`Session is ${session.status}`);

    const wf = getWorkflow(session.workflowId)!;
    session.currentStepIndex++;

    if (session.currentStepIndex >= wf.steps.length) {
      // Workflow complete
      session.status = 'completed';
      session.endedAt = new Date().toISOString();
      this.saveSession(session);
      return session;
    }

    const step = wf.steps[session.currentStepIndex];
    const execution: StepExecution = {
      step: step.step,
      skill: step.skill,
      status: 'in-progress',
      startedAt: new Date().toISOString(),
      completedAt: null,
      output: null,
      checkpointPassed: false,
    };

    session.executions.push(execution);
    this.saveSession(session);
    return session;
  }

  /** Complete the current step with output and checkpoint */
  completeStep(
    sessionId: string,
    output: string,
    checkpointPassed: boolean,
    contextUpdates?: Record<string, string>,
  ): WorkflowSession {
    const session = this.getSession(sessionId);
    if (!session) throw new Error(`Session "${sessionId}" not found`);

    const currentExecution = session.executions[session.executions.length - 1];
    if (!currentExecution || currentExecution.status !== 'in-progress') {
      throw new Error('No in-progress step to complete');
    }

    currentExecution.status = checkpointPassed ? 'completed' : 'skipped';
    currentExecution.completedAt = new Date().toISOString();
    currentExecution.output = output;
    currentExecution.checkpointPassed = checkpointPassed;

    // Update context
    if (contextUpdates) {
      Object.assign(session.context, contextUpdates);
    }

    this.saveSession(session);
    return session;
  }

  /** Get the current step definition for a session */
  getCurrentStep(sessionId: string): WorkflowDefinition['steps'][0] | null {
    const session = this.getSession(sessionId);
    if (!session || session.status !== 'active') return null;

    const wf = getWorkflow(session.workflowId);
    if (!wf) return null;

    if (session.currentStepIndex < 0 || session.currentStepIndex >= wf.steps.length) {
      return null;
    }

    return wf.steps[session.currentStepIndex];
  }

  /** Get progress info */
  getProgress(sessionId: string): {
    currentStep: number;
    totalSteps: number;
    percentComplete: number;
    skillList: SkillSlug[];
    completedSkills: SkillSlug[];
  } {
    const session = this.getSession(sessionId);
    if (!session) throw new Error(`Session "${sessionId}" not found`);

    const wf = getWorkflow(session.workflowId)!;
    const totalSteps = wf.steps.length;
    const currentStep = session.currentStepIndex + 1; // 1-indexed display
    const completedExecutions = session.executions.filter((e) => e.status === 'completed');

    return {
      currentStep: Math.min(currentStep, totalSteps),
      totalSteps,
      percentComplete: Math.round((completedExecutions.length / totalSteps) * 100),
      skillList: wf.steps.map((s) => s.skill),
      completedSkills: completedExecutions.map((e) => e.skill),
    };
  }

  /** Branch to a different workflow */
  branchTo(sessionId: string, newWorkflowId: string): WorkflowSession {
    const session = this.getSession(sessionId);
    if (!session) throw new Error(`Session "${sessionId}" not found`);

    const newWf = getWorkflow(newWorkflowId);
    if (!newWf) throw new Error(`Workflow "${newWorkflowId}" not found`);

    session.status = 'branched';
    session.endedAt = new Date().toISOString();
    session.branchedTo = newWorkflowId;
    this.saveSession(session);

    // Start new session with inherited context
    const newSession = this.startSession(newWorkflowId);
    newSession.context = { ...session.context };
    this.saveSession(newSession);

    return newSession;
  }

  /** Abandon a session */
  abandonSession(sessionId: string): WorkflowSession {
    const session = this.getSession(sessionId);
    if (!session) throw new Error(`Session "${sessionId}" not found`);

    session.status = 'abandoned';
    session.endedAt = new Date().toISOString();
    this.saveSession(session);
    return session;
  }

  /** Get a session */
  getSession(sessionId: string): WorkflowSession | null {
    const p = this.sessionPath(sessionId);
    if (!fileExists(p)) return null;
    return readJson<WorkflowSession>(p);
  }

  /** Save a session */
  private saveSession(session: WorkflowSession): void {
    writeJson(this.sessionPath(session.id), session);
  }

  /** List all active sessions */
  listActiveSessions(): WorkflowSession[] {
    if (!fileExists(this.sessionsDir)) return [];
    const files = listDir(this.sessionsDir).filter((f) => f.endsWith('.json'));
    return files
      .map((f) => readJson<WorkflowSession>(path.join(this.sessionsDir, f)))
      .filter((s) => s.status === 'active');
  }

  /** Render session as a progress summary string */
  renderProgress(sessionId: string): string {
    const session = this.getSession(sessionId);
    if (!session) return 'Session not found';

    const wf = getWorkflow(session.workflowId)!;
    const progress = this.getProgress(sessionId);

    const lines: string[] = [
      `## Workflow: ${wf.name}`,
      `**Session**: ${session.id}`,
      `**Progress**: ${progress.percentComplete}% (Step ${progress.currentStep}/${progress.totalSteps})`,
      '',
      '| Step | Skill | Status | Output |',
      '|------|-------|--------|--------|',
    ];

    for (const step of wf.steps) {
      const exec = session.executions.find((e) => e.step === step.step);
      const status = exec?.status ?? 'pending';
      const icon = status === 'completed' ? '✅' : status === 'in-progress' ? '🔄' : status === 'skipped' ? '⏭️' : '⏳';
      const output = exec?.output ? exec.output.slice(0, 60) + (exec.output.length > 60 ? '...' : '') : '—';
      lines.push(`| ${step.step} | ${step.skill} | ${icon} ${status} | ${output} |`);
    }

    lines.push('', `**Context accumulated**:`, '```json', JSON.stringify(session.context, null, 2), '```');

    return lines.join('\n');
  }
}
