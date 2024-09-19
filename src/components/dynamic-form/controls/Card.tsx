import DraggableCon from "../com/draggable.vue";
import Item from "../com/item.vue";
import "../style/card.scss";
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

  props = {
    /** 卡片阴影显示时机 */
    shadow: "always",
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
      <div class="controls__ card">
        <el-card shadow={this.props.shadow}>{_}</el-card>
      </div>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightReterItemOp["childs"] = [
      {
        label: "标题",
        editor: (
          <el-input
            size="small"
            clearable
            model-value={this.cardName}
            onInput={(v: any) => {
              this.cardName = v;
            }}
          />
        ),
      },
      {
        label: "页脚",
        editor: (
          <el-input
            size="small"
            clearable
            model-value={this.cardFooter}
            onInput={(v: any) => {
              this.cardFooter = v;
            }}
          />
        ),
      },
      {
        label: "阴影显示时机",
        editor: (
          <el-select
            model-value={this.props.shadow}
            size="small"
            onChange={(v: any) => {
              this.props.shadow = v;
            }}
            placeholder="请选择"
          >
            <el-option label="always" value="always" />
            <el-option label="never" value="never" />
            <el-option label="hover" value="hover" />
          </el-select>
        ),
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
