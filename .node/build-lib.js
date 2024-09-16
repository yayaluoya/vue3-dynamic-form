import { fork } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let dirname = path.dirname(fileURLToPath(import.meta.url));

let viteBuild = fork(
  path.join(dirname, "../node_modules/vite/bin/vite.js"),
  process.argv.slice(2),
  {
    cwd: process.cwd(),
  }
);

viteBuild.on("close", () => {
  fs.createReadStream(path.join(dirname, "../lib-package.json")).pipe(
    fs.createWriteStream(path.join(dirname, "../dist-lib/package.json"))
  );
});
