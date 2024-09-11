import { BaseCon } from "./BaseCon";
import DraggableCon from "../com/draggable.vue";

/**
 * 卡片
 */
export class Card extends BaseCon {
  /** 控件类型 */
  static ConType = "Card";
  /** 控件名字 */
  static ConName = "卡片";
  /** 单例对象 */
  static I = new Card();

  cardName = "name";
  cardFooter = "footer";

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  renderRaw({ ctx, formConfig, cons, activateCon }) {
    return (
      <div>
        <el-card>
          {{
            header: () => {
              return this.cardName ? (
                <div class="card-header">
                  <span>{this.cardName}</span>
                </div>
              ) : null;
            },
            default: () => {
              return (
                <DraggableCon
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
                      ? "min-height: 50px;"
                      : "min-height: 20px;"
                  }
                />
              );
            },
            footer: () => {
              return this.cardFooter ? (
                <div class="card-footer">
                  <span>{this.cardFooter}</span>
                </div>
              ) : null;
            },
          }}
        </el-card>
      </div>
    );
  }
}
