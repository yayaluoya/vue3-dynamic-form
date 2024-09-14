import { NonForm } from "./NonForm";

/**
 * 分隔线
 */
export class Divider extends NonForm {
  /** 控件类型 */
  static ConType = "Divider";
  /** 控件名字 */
  static ConName = "分隔线";
  /** 单例对象 */
  static I = new Divider();

  props = {
    direction: "horizontal",
    borderStyle: "solid",
    contentPosition: "center",
    text: "",
  };

  renderRaw() {
    return (
      <el-divider
        direction={this.props.direction}
        border-style={this.props.borderStyle}
        content-position={this.props.contentPosition}
      >
        {this.props.text}
      </el-divider>
    );
  }

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments);
    hasEditor &&
      _.find((_) => _.title == "常用属性").childs.unshift(
        ...[
          {
            label: "方向",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.props.direction}
                onChange={(v) => {
                  this.props.direction = v;
                }}
              >
                <el-radio-button label="horizontal" value="horizontal" />
                <el-radio-button label="vertical" value="vertical" />
              </el-radio-group>
            ),
          },
          {
            label: "样式",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.props.borderStyle}
                onChange={(v) => {
                  this.props.borderStyle = v;
                }}
              >
                <el-radio-button label="none" value="none" />
                <el-radio-button label="solid" value="solid" />
                <el-radio-button label="dashed" value="dashed" />
                <el-radio-button label="dotted" value="dotted" />
                <el-radio-button label="inset" value="inset" />
              </el-radio-group>
            ),
          },
          {
            label: "内容位置",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.props.contentPosition}
                onChange={(v) => {
                  this.props.contentPosition = v;
                }}
              >
                <el-radio-button label="left" value="left" />
                <el-radio-button label="center" value="center" />
                <el-radio-button label="right" value="right" />
              </el-radio-group>
            ),
          },
          {
            label: "文字内容",
            editor: (
              <el-input
                size="small"
                model-value={this.props.text}
                onInput={(v) => {
                  this.props.text = v;
                }}
              />
            ),
          },
        ]
      );
    return _;
  }
}
