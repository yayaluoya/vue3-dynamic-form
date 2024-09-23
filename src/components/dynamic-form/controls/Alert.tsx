import { NAlert, NInput, NSelect, NSwitch, type AlertProps } from "naive-ui";
import {
  BaseCon,
  type IConRightRenderOp,
  type IConRightRenderItemOp,
} from "./BaseCon";

/**
 * 提示
 */
export class Alert extends BaseCon {
  /** 控件类型 */
  static ConType = "Alert";
  /** 控件名字 */
  static ConName = "提示";
  /** 单例对象 */
  static I = new Alert();

  props: {
    bordered: boolean;
    closable: boolean;
    showIcon: boolean;
    title: string;
    type: AlertProps["type"];
    content: string;
  } = {
    bordered: true,
    closable: false,
    showIcon: true,
    title: "标题",
    type: "default",
    content: "",
  };

  renderRaw() {
    return (
      <NAlert
        bordered={this.props.bordered}
        closable={this.props.closable}
        show-icon={this.props.showIcon}
        title={this.props.title}
        type={this.props.type}
      >
        {{
          default: this.props.content ? () => this.props.content : undefined,
        }}
      </NAlert>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "类型",
        editor: (
          <NSelect
            v-model:value={this.props.type}
            placeholder="请选择"
            options={[
              { label: "info", value: "info" },
              { label: "warning", value: "warning" },
              { label: "error", value: "error" },
              { label: "success", value: "success" },
              { label: "default", value: "default" },
            ]}
          />
        ),
      },
      {
        label: "标题",
        editor: <NInput v-model:value={this.props.title} />,
      },
      {
        label: "内容",
        editor: <NInput type="textarea" v-model:value={this.props.content} />,
      },
      {
        label: "边框",
        editor: <NSwitch v-model:value={this.props.bordered} />,
      },
      {
        label: "可关闭",
        editor: <NSwitch v-model:value={this.props.closable} />,
      },
      {
        label: "展示 icon",
        editor: <NSwitch v-model:value={this.props.showIcon} />,
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
