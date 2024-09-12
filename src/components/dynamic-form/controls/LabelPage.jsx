import DraggableCon from "../com/draggable.vue";
import "../style/label-page.scss";
import { Layout } from "./Layout";
import Item from "../com/item.vue";

/**
 * 标签页
 */
export class LabelPage extends Layout {
  /** 控件类型 */
  static ConType = "LabelPage";
  /** 控件名字 */
  static ConName = "标签页";
  /** 单例对象 */
  static I = new LabelPage();

  tabs = [
    {
      label: "tab1",
      name: "tab1",
      activate: true,
      childs: [],
    },
    {
      label: "tab2",
      name: "tab2",
      activate: true,
      childs: [],
    },
  ];
  activeName = 0;
  tabsProps = {
    /** @type {'' | 'card' | 'border-card'} 风格类型 */
    type: "card",
    /** @type {'top' | 'right' | 'bottom' | 'left'} 选项卡所在位置 */
    tabPosition: "top",
  };

  getChild() {
    return this.tabs.reduce((a, b) => {
      return [...a, ...b.childs];
    }, []);
  }

  initConfig(configs, toCons) {
    super.initConfig(configs, toCons);
    this.tabs.forEach((_) => {
      _.childs = toCons(_.childs);
    });
    return this;
  }

  renderRaw({ ctx, formConfig, cons, activateCon, formData }) {
    return (
      <div
        class={[
          "controls__ label-page",
          activateCon?.key == this.key || this.tabsProps.type == "border-card"
            ? ""
            : "border",
        ].join(" ")}
      >
        <el-tabs
          model-value={this.activeName}
          onTabChange={(_) => {
            this.activeName = _;
          }}
          type={this.tabsProps.type}
          tab-position={this.tabsProps.tabPosition}
          style="margin: 1px;"
        >
          {this.tabs.map((_, i) => {
            return _.activate ? (
              <el-tab-pane label={_.label} name={i}>
                {formData ? (
                  this.childs.map((con) => {
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
              </el-tab-pane>
            ) : null;
          })}
        </el-tabs>
      </div>
    );
  }
}
