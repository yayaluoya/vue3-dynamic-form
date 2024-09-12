import DraggableCon from "../com/draggable.vue";
import "../style/grid.scss";
import { Layout } from "./Layout";
import Item from "../com/item.vue";

/**
 * 栅格列
 */
class GridCol extends Layout {
  /** 控件类型 */
  static ConType = "GridCol";
  /** 控件名字 */
  static ConName = "栅格列";

  towable = false;

  colProps = {
    /** 栅格占据的列数 */
    span: 24,
    /** 栅格左侧的间隔格数 */
    offset: 0,
    /** 栅格向右移动格数 */
    push: 0,
    /** 栅格向左移动格数 */
    pull: 0,
  };

  setCol(span, offset, push, pull) {
    typeof span != "undefined" && (this.colProps.span = span);
    typeof offset != "undefined" && (this.colProps.offset = offset);
    typeof push != "undefined" && (this.colProps.push = push);
    typeof pull != "undefined" && (this.colProps.pull = pull);
    return this;
  }

  render({ ctx, formConfig, cons, formData, activateCon, parent }) {
    return (
      <el-col
        class={[
          formData ? "" : "controller",
          "controls__ grid-col",
          activateCon?.key == this.key ? "on" : "border",
          formData ? "preview" : "",
        ].join(" ")}
        key={this.renderKey}
        span={this.colProps.span}
        offset={this.colProps.offset}
        push={this.colProps.push}
        pull={this.colProps.pull}
        onClick={(e) => {
          e.stopPropagation();
          ctx.emit("activateConF", this);
        }}
      >
        {activateCon?.key == this.key
          ? [
              <div class="con-name">
                <span>{this.conName}</span>
              </div>,
              <div class="handler-button">
                <el-icon
                  title="选择父组件"
                  onClick={(e) => {
                    e.stopPropagation();
                    ctx.emit("activateConF", parent);
                  }}
                >
                  <Back />
                </el-icon>
                {this.getHandler(...arguments)}
              </div>,
            ]
          : null}
        <div class="form-item">
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
          )}
        </div>
      </el-col>
    );
  }

  getHandler({ parent, ctx }, row, col) {
    return [];
  }
}

/**
 * 栅格
 */
export class Grid extends Layout {
  /** 控件类型 */
  static ConType = "Grid";
  /** 控件名字 */
  static ConName = "栅格";
  /** 单例对象 */
  static I = new Grid();

  rowProps = {
    /** 栅格间隔 */
    gutter: 0,
    /** flex 布局下的水平排列方式 */
    justify: "start",
    /** flex 布局下的垂直排列方式 */
    align: undefined,
  };

  list = [new GridCol().setCol(12), new GridCol().setCol(12)];

  getChild() {
    return this.list;
  }

  initConfig(configs, toCons) {
    super.initConfig(configs, toCons);
    this.list = toCons(this.list, [GridCol]);
    return this;
  }

  renderRaw(op) {
    return (
      <el-row
        class={[
          "controls__ grid",
          op.activateCon?.key == this.key ? "" : "border",
          op.formData ? "preview" : "",
        ].join(" ")}
        gutter={this.rowProps.gutter}
        justify={this.rowProps.justify}
        align={this.rowProps.align}
      >
        {this.list.map((_) => {
          return _.render({
            ...op,
            parent: this,
          });
        })}
      </el-row>
    );
  }
}
