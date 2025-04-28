import fs from "node:fs"
import fsPromises from "node:fs/promises"
import path from "path";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib"

const __dirname = import.meta.dirname;
const pathFileSource = path.join(__dirname, "./files/fileToCompress.txt");
const pathFileDesination = path.join(__dirname, "./files/archive.gz");

const gzip = createGzip()

const compress = async () => {
    const file = (await fsPromises.open(pathFileSource)).createReadStream();
    const destination = fs.createWriteStream(pathFileDesination);
    await pipeline(file, gzip, destination); 
};

await compress();