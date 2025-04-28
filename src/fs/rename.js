import { rename as fsRename, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const rename = async () => {
    const __dirname = import.meta.dirname;
    const srcPath = resolve(__dirname, "files", "wrongFilename.txt");
    const destPath = resolve(__dirname, "files", "properFilename.md");

    let srcExists = false;
    try {
        await stat(srcPath);
        srcExists = true;
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
    }

    let destExists = false;
    try {
        await stat(destPath);
        destExists = true;
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
    }

    if (!srcExists || destExists) {
        throw new Error("FS operation failed");
    }

    try {
        await fsRename(srcPath, destPath);
    } catch (error) {
        throw new Error(error);
    }
};

await rename();