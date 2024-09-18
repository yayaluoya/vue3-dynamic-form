import type { IConRightRenderOp } from "./BaseCon";
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

  getRight(op: IConRightRenderOp, hasEditor = true) {
    let _ = super.getRight(op, hasEditor);
    hasEditor &&
      _.find((_) => _.key == "com")?.childs!.unshift(
        ...[
          {
            label: "方向",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.props.direction}
                onChange={(v: any) => {
                  this.props.direction = v;
                }}
              >
                <el-radio-button label="水平" value="horizontal" />
                <el-radio-button label="垂直" value="vertical" />
              </el-radio-group>
            ),
          },
          {
            label: "样式",
            editor: (
              <el-select
                model-value={this.props.borderStyle}
                size="small"
                onChange={(v: any) => {
                  this.props.borderStyle = v;
                }}
                placeholder="请选择"
              >
                <el-option label="none" value="none" />
                <el-option label="solid" value="solid" />
                <el-option label="dashed" value="dashed" />
                <el-option label="dotted" value="dotted" />
                <el-option label="inset" value="inset" />
              </el-select>
            ),
          },
          {
            label: "内容位置",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.props.contentPosition}
                onChange={(v: any) => {
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
                onInput={(v: any) => {
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
