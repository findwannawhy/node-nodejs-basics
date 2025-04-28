import { readdir, access } from "fs/promises";
import { resolve } from "path";

const list = async () => {
    const __dirname = import.meta.dirname;
    const targetPath = resolve(__dirname, "files");
  
    try {
      await access(targetPath);
    } catch (error) {
      throw new Error("FS operation failed");
    }
  
    try {
      const files = await readdir(targetPath);
      console.log(files);
    } catch (error) {
      console.error(error);
    }
};

await list();