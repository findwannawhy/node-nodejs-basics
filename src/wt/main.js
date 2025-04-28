import os from "os";
import path from "path";
import { Worker } from "worker_threads";

const performCalculations = async () => {
  const __dirname = import.meta.dirname;
  const workerPath = path.resolve(__dirname, "./worker.js");
  const startNumber = 10;
  const numbers = Array.from(
    { length: os.cpus().length },
    (_, idx) => startNumber + idx
  );

  const processCalculation = (value) =>
    new Promise((resolve) => {
      const worker = new Worker(workerPath, { workerData: value });
      const resolveError = () => resolve({ status: "error", data: null });

      worker.on("message", (data) => resolve({ status: "resolved", data }));
      worker.on("messageerror", resolveError);
      worker.on("error", resolveError);
    });

  try {
    const results = await Promise.all(
      numbers.map((value) => processCalculation(value))
    );
    console.log(results);
  } catch (error) {
    console.error(error);
  }
};

await performCalculations();