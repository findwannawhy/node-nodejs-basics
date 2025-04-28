import { Transform } from "stream";
import { pipeline } from "stream/promises";
const transform = async () => {
  const reverse = new Transform({
    transform(chunk, _, cb) {
      cb(null, [...String(chunk)].reverse().join("") + "\n");
    },
  });

  await pipeline(process.stdin, reverse, process.stdout);
};

await transform();