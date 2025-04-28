import fs from "fs";
import path from "path";
import stream from "stream/promises";
import crypto from "crypto";

const calculateHash = async () => {
  let hash;
  const __dirname = import.meta.dirname;
  const targetPath = path.resolve(
    __dirname,
    "files",
    "fileToCalculateHashFor.txt"
  );

  try {
    await stream.pipeline(
      fs.createReadStream(targetPath),
      crypto.createHash("sha256").setEncoding("hex"),
      async (source) => {
        hash = (await source.toArray())[0];
      }
    );
  } catch (error) {
    console.error(error);
  }

  console.log(hash);
};

await calculateHash();