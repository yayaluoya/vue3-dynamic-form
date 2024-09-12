import { BaseCon } from "./BaseCon";
import DraggableCon from "../com/draggable.vue";

/**
 * 折叠面板
 */
export class Collapse extends BaseCon {
  /** 控件类型 */
  static ConType = "Collapse";
  /** 控件名字 */
  static ConName = "折叠面板";
  /** 单例对象 */
  static I = new Collapse();

  collapses = [
    {
      title: "Consistency1",
      childs: [],
    },
    {
      title: "Consistency2",
      childs: [],
    },
  ];
  activeNames = [0];
  collapseProps = {
    /** 是否手风琴模式 */
    accordion: false,
  };

  initConfig(configs, toCons) {
    super.initConfig(configs, toCons);
    this.collapses.forEach((_) => {
      _.childs = toCons(_.childs);
    });
    return this;
  }

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  renderRaw({ ctx, formConfig, cons, activateCon }) {
    return (
      <div>
        <el-collapse
          model-value={this.activeNames}
          onChange={(_) => {
            this.activeNames = _;
          }}
          accordion={this.collapseProps.accordion}
        >
          {this.collapses.map((_, i) => {
            return (
              <el-collapse-item title={_.title} name={i}>
                <DraggableCon
                  parent={this}
                  cons={_.childs}
                  formConfig={formConfig}
                  activateCon={activateCon}
                  onUpdate:cons={(__) => {
                    _.childs = __;
                  }}
                  onUpdate:activateCon={(_) => {
                    ctx.emit("activateConF", _);
                  }}
                  style={
                    _.childs.length <= 0
                      ? "min-height: 80px;"
                      : "min-height: 20px;"
                  }
                />
              </el-collapse-item>
            );
          })}
        </el-collapse>
      </div>
    );
  }
}
