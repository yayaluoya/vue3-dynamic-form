import { glob } from "glob";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { customAlphabet } from "nanoid";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 15);

let dirname = path.dirname(fileURLToPath(import.meta.url));
let cwd = path.join(dirname, "../");
glob("**/*.ts.scss", {
  cwd,
}).then((list) => {
  for (let item of list) {
    let scssPath = path.join(cwd, item);
    console.log(scssPath);
    let name = path.parse(item).base.replace(/\.ts\.scss$/, "");
    let tsPath = path.join(
      path.dirname(path.join(cwd, item)),
      "__" + name + ".cssr.ts"
    );
    let scssStr = fs.readFileSync(scssPath).toString();
    let tsStr = getCF(scssStr);
    fs.writeFileSync(
      tsPath,
      `
/** 
 * 该文件是 脚本 .node/scss-handle.js 通过 ${item} 生成的
 */
import { useSsrAdapter } from '@css-render/vue3-ssr'
import {c} from "${path
        .relative(
          path.dirname(tsPath),
          path.join(cwd, "src/components/dynamic-form/_utils/cssr.ts")
        )
        .replace(/\.ts$/, "")
        .replace(/\\/g, "/")}";
const className = '${name}-${nanoid()}';
const cssr = c('.' + className,${tsStr});
cssr.mount({
  id: className,
  ssr: useSsrAdapter(),
});
export {
  className,
};
    `.trim()
    );
  }
});

/**
 *
 * @param {string} str
 * @returns
 */
function getCF(str) {
  let list = [];
  let stack = [];
  let queryExpS = /^((?:\s*[>&]?\s*[*]?[.#:]?[\w-\(\).#]+,?\s*)+|\s*&\s*){/;
  let queryExp = /((?:\s*[>&]?\s*[*]?[.#:]?[\w-\(\).#]+,?\s*)+|\s*&\s*){/;
  let propsExpS = /^(?:\s*[\w-]+:.*?;\s*)+/;
  let propsExp = /(?:\s*[\w-]+:.*?;\s*)+/;
  let endExp = /\s*}\s*/;
  let dExp = /\s*\/\*[\s\S]*?\*\/\s*/;
  while (str.length > 0) {
    if (queryExpS.test(str)) {
      let match = str.match(queryExp);
      let p = stack.at(-1);
      let i = {
        q: match[1].trim(),
        p: "",
        c: [],
      };
      p?.c.push(i);
      stack.push(i);
      str = str.slice(match[0].length);
    } else if (propsExpS.test(str)) {
      let match = str.match(propsExp);
      stack.at(-1).p = match[0].trim();
      str = str.slice(match[0].length);
    } else if (str.search(endExp) == 0) {
      let match = str.match(endExp);
      if (stack.length == 1) {
        list.push(stack.pop());
      } else {
        stack.pop();
      }
      str = str.slice(match[0].length);
    } else if (str.search(dExp) == 0) {
      let match = str.match(dExp);
      str = str.slice(match[0].length);
    } else {
      console.log("无法识别的语法", str);
      str = "";
    }
  }
  let getC = (list) => {
    return `
[
  ${list
    .map((_) => {
      return `c(\`${_.q}\`,\`
  ${_.p}
    \`, ${getC(_.c)})`;
    })
    .join(",")}    
]
    `;
  };
  return getC(list);
}
