import type { FormProps } from "naive-ui";

/**
 * 表单配置
 */
export type TFormConfig = Pick<
  FormProps,
  | "inline"
  | "labelWidth"
  | "labelAlign"
  | "labelPlacement"
  | "showFeedback"
  | "showLabel"
  | "showRequireMark"
  | "requireMarkPlacement"
  | "size"
>;

/**
 * 获取默认表单配置
 */
export function getFormConfig(): TFormConfig {
  return {
    inline: false,
    labelWidth: "120px",
    labelAlign: "left",
    labelPlacement: "top",
    showFeedback: true,
    showLabel: true,
    showRequireMark: true,
    requireMarkPlacement: "right",
    size: "medium",
  };
}
