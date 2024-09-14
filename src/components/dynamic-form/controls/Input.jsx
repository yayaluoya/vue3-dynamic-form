import { BaseCon } from "./BaseCon";

/**
 * 输入框
 */
export class Input extends BaseCon {
  /** 控件类型 */
  static ConType = "Input";
  /** 控件名字 */
  static ConName = "输入框";
  /** 单例对象 */
  static I = new Input();

  props = {
    type: "text",
    maxlength: undefined,
    minlength: undefined,
    showWordLimit: false,
    placeholder: "",
    clearable: false,
    size: "default",
    rows: 2,
  };

  formDefaultValue = "";

  renderRaw({ formData }) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <el-input
        model-value={ref.value}
        onInput={(v) => {
          ref.value = v;
        }}
        type={this.props.type}
        maxlength={this.props.maxlength}
        minlength={this.props.minlength}
        show-word-limit={this.props.showWordLimit}
        placeholder={this.props.placeholder}
        clearable={this.props.clearable}
        size={this.props.size}
      />
    );
  }

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments);
    hasEditor &&
      _.find((_) => _.title == "常用属性").childs.unshift(
        ...[
          {
            label: "类型",
            editor: (
              <el-select
                model-value={this.props.type}
                onChange={(v) => {
                  this.props.type = v;
                }}
                size="small"
                placeholder="选择类型"
                filterable
              >
                <el-option label="text" value="text" />
                <el-option label="textarea" value="textarea" />
              </el-select>
            ),
          },
          {
            label: "占位字符串",
            editor: (
              <el-input
                size="small"
                model-value={this.props.placeholder}
                onInput={(v) => {
                  this.props.placeholder = v;
                }}
              />
            ),
          },
          ...(this.props.type != "textarea"
            ? [
                {
                  label: "可清除",
                  editor: (
                    <el-switch
                      model-value={this.props.clearable}
                      onChange={(v) => {
                        this.props.clearable = v;
                      }}
                    ></el-switch>
                  ),
                },
              ]
            : []),
          ...(this.props.type == "textarea"
            ? [
                {
                  label: "行数",
                  editor: (
                    <el-input-number
                      size="small"
                      model-value={this.props.rows}
                      min={0}
                      onChange={(_) => {
                        this.props.rows = _;
                      }}
                    />
                  ),
                },
                {
                  label: "显示统计字数",
                  editor: (
                    <el-switch
                      size="small"
                      model-value={this.props.showWordLimit}
                      onChange={(v) => {
                        this.props.showWordLimit = v;
                      }}
                    ></el-switch>
                  ),
                },
              ]
            : []),
          {
            label: "大小",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.props.size}
                onChange={(v) => {
                  this.props.size = v;
                }}
              >
                <el-radio-button label="large" value="large" />
                <el-radio-button label="default" value="default" />
                <el-radio-button label="small" value="small" />
              </el-radio-group>
            ),
          },
        ]
      );
    return _;
  }
}
