/**
 * 获取表单配置
 */
export function getFormConfig() {
  return {
    /** 行内表单模式 */
    inline: false,
    /** 表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性 */
    labelPosition: "left",
    /** 标签对齐方式 */
    labelAlign: "right",
    /** 标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。 */
    labelWidth: 80,
    /** 表单域标签的后缀 */
    labelsuffix: "",
    /** 是否隐藏必填字段标签旁边的红色星号 */
    hideRequiredAsterisk: false,
    /** 星号的位置。 */
    requireAsteriskPosition: "left",
    /** 是否显示校验错误信息 */
    showMessage: true,
    /** 是否以行内形式展示校验信息 */
    inlineMessage: false,
    /** 是否在输入框中显示校验结果反馈图标 */
    statusIcon: false,
    /** 用于控制该表单内组件的尺寸 */
    size: "",
    /** 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性 */
    disabled: false,
  };
}
