import { NCard, NInput, NSelect, NSwitch, type CardProps } from "naive-ui";
import DraggableCon from "../com/draggable.vue";
import Item from "../com/item.vue";
import type {
  IConRenderOp,
  IConRightRenderOp,
  IConRightReterItemOp,
} from "./BaseCon";
import { NonForm } from "./NonForm";

/**
 * 卡片
 */
export class Card extends NonForm {
  /** 控件类型 */
  static ConType = "Card";
  /** 控件名字 */
  static ConName = "卡片";
  /** 单例对象 */
  static I = new Card();

  props: CardProps = {
    bordered: false,
    hoverable: false,
    size: "medium",
  };
  cardName = "name";
  cardFooter = "footer";

  renderRaw({ ctx, formConfig, cons, activateCon, formData }: IConRenderOp) {
    let _ = {
      header: () => {
        return (
          <div class="card-header">
            <span>{this.cardName}</span>
          </div>
        );
      },
      default: () => {
        return formData ? (
          this.childs.map((con) => {
            return (
              <Item
                key={con.key}
                parent={this}
                formConfig={formConfig}
                formData={formData}
                cons={cons}
                con={con}
                formRender
              />
            );
          })
        ) : (
          <DraggableCon
            parent={this}
            cons={this.childs}
            formConfig={formConfig}
            activateCon={activateCon}
            onUpdate:cons={(_) => {
              this.childs = _;
            }}
            onUpdate:activateCon={(_) => {
              ctx.emit("activateConF", _);
            }}
            style={
              this.childs.length <= 0
                ? "min-height: 80px;"
                : "min-height: 20px;"
            }
          />
        );
      },
      footer: () => {
        return (
          <div class="card-footer">
            <span>{this.cardFooter}</span>
          </div>
        );
      },
    };
    if (!this.cardName) {
      Reflect.deleteProperty(_, "header");
    }
    if (!this.cardFooter) {
      Reflect.deleteProperty(_, "footer");
    }
    return (
      <NCard
        bordered={this.props.bordered}
        hoverable={this.props.hoverable}
        size={this.props.size}
      >
        {_}
      </NCard>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightReterItemOp["childs"] = [
      {
        label: "标题",
        editor: <NInput v-model:value={this.cardName} />,
      },
      {
        label: "页脚",
        editor: <NInput v-model:value={this.cardFooter} />,
      },
      {
        label: "显示卡片边框",
        editor: <NSwitch v-model:value={this.props.bordered} />,
      },
      {
        label: "可悬浮",
        editor: <NSwitch v-model:value={this.props.hoverable} />,
      },
      {
        label: "尺寸",
        editor: (
          <NSelect
            v-model:value={this.props.size}
            placeholder="请选择"
            options={[
              { label: "small", value: "small" },
              { label: "medium", value: "medium" },
              { label: "large", value: "large" },
              { label: "huge", value: "huge" },
            ]}
          />
        ),
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
