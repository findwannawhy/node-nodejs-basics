import fs from "fs";
import path from "path";

const write = async () => {
  const __dirname = import.meta.dirname;
  const filePath = path.resolve(__dirname, "files", "fileToWrite.txt");
  const stream = fs.createWriteStream(filePath);
  process.stdin.pipe(stream);
};

await write();