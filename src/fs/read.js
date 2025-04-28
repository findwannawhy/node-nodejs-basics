import { readFile, access } from 'fs/promises';
import { resolve } from 'path';

const read = async () => {
    const __dirname = import.meta.dirname;
    const filePath = resolve(__dirname, 'files', 'fileToRead.txt');

    try {
        await access(filePath);
    } catch (error) {
        throw new Error("FS operation failed");
    }

    try {
        const content = await readFile(filePath, { encoding: "utf8" });
        console.log(content);
    } catch (error) {
        throw error;
    }
};

await read();