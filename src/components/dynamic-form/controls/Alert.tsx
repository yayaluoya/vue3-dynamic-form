import type { IConRightRenderOp } from "./BaseCon";
import { NonForm } from "./NonForm";

/**
 * 提示
 */
export class Alert extends NonForm {
  /** 控件类型 */
  static ConType = "Alert";
  /** 控件名字 */
  static ConName = "提示";
  /** 单例对象 */
  static I = new Alert();

  props = {
    title: "alert",
    type: "info",
    description: "",
    closable: false,
    center: false,
    showIcon: false,
    effect: "light",
  };

  renderRaw() {
    return (
      <el-alert
        title={this.props.title}
        type={this.props.type}
        description={this.props.description}
        closable={this.props.closable}
        center={this.props.center}
        show-icon={this.props.showIcon}
        effect={this.props.effect}
      />
    );
  }

  getRight(op: IConRightRenderOp, hasEditor = true) {
    let _ = super.getRight(op, hasEditor);
    hasEditor &&
      _.find((_) => _.key == "com")?.childs!.unshift(
        ...[
          {
            label: "标题",
            editor: (
              <el-input
                size="small"
                model-value={this.props.title}
                onInput={(v: any) => {
                  this.props.title = v;
                }}
              />
            ),
          },
          {
            label: "描述性文本",
            editor: (
              <el-input
                type="textarea"
                rows={2}
                size="small"
                model-value={this.props.description}
                onInput={(v: any) => {
                  this.props.description = v;
                }}
              />
            ),
          },
          {
            label: "类型",
            editor: (
              <el-select
                model-value={this.props.type}
                size="small"
                onChange={(v: any) => {
                  this.props.type = v;
                }}
                placeholder="请选择"
              >
                <el-option label="success" value="success" />
                <el-option label="warning" value="warning" />
                <el-option label="info" value="info" />
                <el-option label="error" value="error" />
              </el-select>
            ),
          },
          {
            label: "可关闭",
            editor: (
              <el-switch
                size="small"
                model-value={this.props.closable}
                onChange={(v: any) => {
                  this.props.closable = v;
                }}
              ></el-switch>
            ),
          },
          {
            label: "文字居中",
            editor: (
              <el-switch
                size="small"
                model-value={this.props.center}
                onChange={(v: any) => {
                  this.props.center = v;
                }}
              ></el-switch>
            ),
          },
          {
            label: "显示图标",
            editor: (
              <el-switch
                size="small"
                model-value={this.props.showIcon}
                onChange={(v: any) => {
                  this.props.showIcon = v;
                }}
              ></el-switch>
            ),
          },
          {
            label: "主题样式",
            editor: (
              <el-select
                model-value={this.props.effect}
                size="small"
                onChange={(v: any) => {
                  this.props.effect = v;
                }}
                placeholder="请选择"
              >
                <el-option label="light" value="light" />
                <el-option label="dark" value="dark" />
              </el-select>
            ),
          },
        ]
      );
    return _;
  }
}
