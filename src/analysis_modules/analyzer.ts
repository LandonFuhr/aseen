import { AnalysisIpcResponse } from "../frontend/src/shared/ipc/analysis";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import log from "electron-log";
import { IpcAnalyzer } from "./ipc";

export function createAnalysisRunner<Args>({
  command,
  name,
  ipcAnalyzer,
  stdioListenerHooks,
}: AnalysisRunnerDependencies<Args>): AnalysisRunner<Args> {
  return async (args) => {
    const child = createChild({ command, name });
    setupListeners({ child, ipcAnalyzer, name, stdioListenerHooks });
    const { code, signal } = await runChild({ child, args, name });
    return getResponse({ code, signal, name });
  };
}

function setupListeners<Args>({
  child,
  ipcAnalyzer,
  stdioListenerHooks,
  name,
}: {
  child: ChildProcessWithoutNullStreams;
  ipcAnalyzer: IpcAnalyzer<Args>;
  stdioListenerHooks: StdioListenerHooks<Args>;
  name: string;
}) {
  setupKillListener({ child, ipcAnalyzer, name });
  listenToStderr({
    child,
    ipcAnalyzer,
    stderrListenerHook: stdioListenerHooks.onStderr,
  });
  listenToStdout({
    child,
    ipcAnalyzer,
    stdoutListenerHook: stdioListenerHooks.onStdout,
  });
}

async function runChild<Args>({
  child,
  args,
  name,
}: {
  args: Args;
  child: ChildProcessWithoutNullStreams;
  name: string;
}): Promise<ChildExitInfo> {
  return new Promise((resolve) => {
    log.info(`Starting child "${name}" with`, args);
    child.stdin.write(JSON.stringify(args) + "\n");
    child.on("exit", (code, signal) => {
      log.info(`Child "${name}" exited with`, { code, signal });
      resolve({ code, signal });
    });
  });
}

function setupKillListener<Args>({
  child,
  ipcAnalyzer,
  name,
}: {
  child: ChildProcessWithoutNullStreams;
  ipcAnalyzer: IpcAnalyzer<Args>;
  name: string;
}) {
  ipcAnalyzer.on((signal) => {
    if (signal.type === "EXIT") {
      log.info(`Child "${name}" killed`);
      child.kill();
    }
  });
}
function listenToStdout<Args>({
  child,
  stdoutListenerHook,
  ipcAnalyzer,
}: {
  child: ChildProcessWithoutNullStreams;
  stdoutListenerHook: StdioListener<Args>;
  ipcAnalyzer: IpcAnalyzer<Args>;
}) {
  child.stdout.on("data", (chunk) => {
    const message: string = chunk.toString();
    log.info(message);
    stdoutListenerHook({ ipcAnalyzer, message });
  });
}

function listenToStderr<Args>({
  child,
  stderrListenerHook,
  ipcAnalyzer,
}: {
  child: ChildProcessWithoutNullStreams;
  stderrListenerHook: StdioListener<Args>;
  ipcAnalyzer: IpcAnalyzer<Args>;
}) {
  child.stderr.on("data", (chunk) => {
    const message: string = chunk.toString();
    log.error(message);
    stderrListenerHook({ ipcAnalyzer, message });
  });
}

function createChild({
  command,
  name,
}: {
  command: string;
  name: string;
}): ChildProcessWithoutNullStreams {
  log.info(`Creating child "${name}"`);
  return spawn(command);
}

function getResponse({
  code,
  signal,
  name,
}: ResponseInfo): AnalysisIpcResponse {
  if (code === 0) {
    return { type: "SUCCESS" };
  }
  if (signal === "SIGTERM") {
    return { type: "KILLED", data: { code, signal } };
  }
  return {
    type: "ERROR",
    data: {
      error: `Child "${name}" exited with unexpected code/signal: ${JSON.stringify(
        {
          code,
          signal,
        }
      )}`,
    },
  };
}

interface ResponseInfo extends ChildExitInfo {
  name: string;
}

interface ChildExitInfo {
  code: number | null;
  signal: NodeJS.Signals | null;
}

type AnalysisRunner<Args> = (args: Args) => Promise<AnalysisIpcResponse>;

interface AnalysisRunnerDependencies<Args> {
  command: string;
  name: string;
  ipcAnalyzer: IpcAnalyzer<Args>;
  stdioListenerHooks: StdioListenerHooks<Args>;
}

interface StdioListenerHooks<Args> {
  onStdout: StdioListener<Args>;
  onStderr: StdioListener<Args>;
}

export type StdioListener<Args> = (args: {
  ipcAnalyzer: IpcAnalyzer<Args>;
  message: string;
}) => void;
