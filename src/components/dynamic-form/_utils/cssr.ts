import { CssRender } from "css-render";

const cssr = CssRender();
const { c, find } = cssr;
const cC: typeof c = (...args: any[]) => {
  return c(">", [(c as any)(...args)]);
};

export { c, cC, find };
