import { BaseCon } from "./BaseCon";
import DraggableCon from "../com/draggable.vue";

/**
 * 分栏
 */
export class Subfield extends BaseCon {
  /** 控件类型 */
  static ConType = "Subfield";
  /** 控件名字 */
  static ConName = "分栏";
  /** 单例对象 */
  static I = new Subfield();

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  renderRaw({ ctx, formConfig, cons, activateCon }) {
    return (
      <div
        style={
          activateCon?.key == this.key ? "" : `border: 1px dashed #afafaf;`
        }
      >
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
            this.childs.length <= 0 ? "min-height: 50px;" : "min-height: 20px;"
          }
        />
      </div>
    );
  }
}
