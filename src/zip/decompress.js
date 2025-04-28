import fs from "node:fs"
import fsPromises from "node:fs/promises"
import path from "path";
import { pipeline } from "node:stream/promises";
import { createGunzip } from "node:zlib"

const __dirname = import.meta.dirname;
const pathFileSource = path.join(__dirname, "./files/archive.gz");
const pathFileDesination = path.join(__dirname, "./files/fileToCompress.txt");

const unzip = createGunzip()

const decompress = async () => {
    const file = (await fsPromises.open(pathFileSource)).createReadStream();
    const destination = fs.createWriteStream(pathFileDesination);
    await pipeline(file, unzip, destination)
};

await decompress();