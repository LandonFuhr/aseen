import type { Shell } from "electron";

let shell: Shell;
try {
  shell = window.require("electron").shell;
} catch {
  try {
    shell = require("electron").shell;
  } catch {}
}

export async function openFolder(path: string) {
  return shell.openPath(path);
}

export async function openExternalLink(url: string) {
  await shell.openExternal(url);
}
