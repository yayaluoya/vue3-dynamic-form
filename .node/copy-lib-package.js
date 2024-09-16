import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let dirname = path.dirname(fileURLToPath(import.meta.url));

fs.createReadStream(path.join(dirname, "../lib-package.json")).pipe(
  fs.createWriteStream(path.join(dirname, "../dist-lib/package.json"))
);
