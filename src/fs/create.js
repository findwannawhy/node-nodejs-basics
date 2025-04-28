import { writeFile } from "fs/promises";
import { resolve } from "path";

const create = async () => {
    const __dirname = import.meta.dirname;
    const filePath = resolve(__dirname, "files", "fresh.txt");
    try {
        await writeFile(filePath, "I am fresh and young", { flag: "wx" });
    } catch (error) {
        if (error.code === "EEXIST") {
            throw new Error("FS operation failed");
        } else {
            throw error;
        }
    }
};

await create();