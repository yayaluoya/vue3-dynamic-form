import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let dirname = path.dirname(fileURLToPath(import.meta.url));

[
  {
    from: path.join(dirname, "../lib-package.json"),
    to: path.join(dirname, "../dist-lib/package.json"),
  },
].forEach((_) => {
  copyFile(_.from, _.to);
});

function copyFile(from, to) {
  let state = fs.statSync(from, {
    throwIfNoEntry: false,
  });
  if (state?.isFile()) {
    fs.createReadStream(from).pipe(fs.createWriteStream(to));
  } else if (state?.isDirectory()) {
    try {
      fs.mkdirSync(to, { recursive: true });
    } catch {}
    fs.readdirSync(from).forEach((_) => {
      copyFile(path.join(from, _), path.join(to, _));
    });
  }
}
