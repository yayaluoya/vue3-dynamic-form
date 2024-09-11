import { BaseCon } from "./BaseCon";
import DraggableCon from "../com/draggable.vue";

/**
 * 标签页
 */
export class LabelPage extends BaseCon {
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

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  renderRaw({ ctx, formConfig, cons, activateCon }) {
    return (
      <div
        style={
          activateCon?.key == this.key || this.tabsProps.type == "border-card"
            ? ""
            : `border: 1px dashed #afafaf;`
        }
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
                <DraggableCon
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
                      ? "min-height: 50px;"
                      : "min-height: 20px;"
                  }
                />
              </el-tab-pane>
            ) : null;
          })}
        </el-tabs>
      </div>
    );
  }
}
