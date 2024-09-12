import DraggableCon from "../com/draggable.vue";
import { Layout } from "./Layout";
import Item from "../com/item.vue";

/**
 * 折叠面板
 */
export class Collapse extends Layout {
  /** 控件类型 */
  static ConType = "Collapse";
  /** 控件名字 */
  static ConName = "折叠面板";
  /** 单例对象 */
  static I = new Collapse();

  collapses = [
    {
      title: "Collapse1",
      childs: [],
    },
    {
      title: "Collapse2",
      childs: [],
    },
  ];
  activeNames = [0];
  collapseProps = {
    /** 是否手风琴模式 */
    accordion: false,
  };

  getChild() {
    return this.collapses.reduce((a, b) => {
      return [...a, ...b.childs];
    }, []);
  }

  initConfig(configs, toCons) {
    super.initConfig(configs, toCons);
    this.collapses.forEach((_) => {
      _.childs = toCons(_.childs);
    });
    return this;
  }

  renderRaw({ ctx, formConfig, cons, activateCon, formData }) {
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
                {formData ? (
                  _.childs.map((con) => {
                    return (
                      <Item
                        key={con.key}
                        parent={this}
                        formConfig={formConfig}
                        formData={formData}
                        cons={cons}
                        con={con}
                        preview
                      />
                    );
                  })
                ) : (
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
                )}
              </el-collapse-item>
            );
          })}
        </el-collapse>
      </div>
    );
  }
}
