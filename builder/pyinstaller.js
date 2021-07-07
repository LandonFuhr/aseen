const { spawn } = require("child_process");
const { pyinstaller } = require("./paths");

async function runPyinstaller(...cmds) {
  return new Promise((resolve) => {
    const child = spawn(pyinstaller.pythonPath, [
      "-m",
      "PyInstaller",
      ...cmds,
      "-y",
      "--workpath",
      pyinstaller.workPath,
      "--specpath",
      pyinstaller.workPath,
    ]);
    child.stdout.on("data", (chunk) => {
      process.stdout.write(chunk.toString());
    });
    child.stderr.on("data", (chunk) => {
      process.stderr.write(chunk.toString());
    });
    child.on("exit", (code, signal) => {
      console.log(`Exited with code: ${code}. Signal: ${signal}`);
      resolve();
    });
  });
}

module.exports = {
  runPyinstaller,
};
