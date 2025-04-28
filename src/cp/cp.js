import { spawn } from "child_process";
import path from "path";

const __dirname = import.meta.dirname;

export const spawnChildProcess = async (args) => {
  const child = spawn("node", [path.join(__dirname, "./files/script"), args]);
  child.stdout.pipe(process.stdout);
  process.stdin.pipe(child.stdin);
};

spawnChildProcess("--argument1 privet");