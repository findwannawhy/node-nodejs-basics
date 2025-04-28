import { unlink } from 'fs/promises';
import { resolve } from 'path';

const __dirname = import.meta.dirname;
const filePath = resolve(__dirname, "files", "fileToRemove.txt");

const remove = async () => {
    try {
        await unlink(filePath);
    } catch (error) {
        if (error.code === "ENOENT") {
            throw new Error("FS operation failed");
        } else {
            throw error;
        }
    }
};

await remove();