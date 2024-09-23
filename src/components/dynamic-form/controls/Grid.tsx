import DraggableCon from "../com/draggable.vue";
import "../style/grid.scss";
import Item from "../com/item.vue";
import {
  BaseCon,
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightRenderItemOp,
} from "./BaseCon";
import {
  NButton,
  NFlex,
  NGrid,
  NGridItem,
  NIcon,
  NInputNumber,
} from "naive-ui";
import {
  ArrowBack,
  ArrowDown,
  ArrowUp,
  EyeOff,
  RemoveCircle,
} from "@vicons/ionicons5";

/**
 * 栅格列
 */
class GridCol extends BaseCon {
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
  };

  setCol(span?: number, offset?: number) {
    typeof span != "undefined" && (this.colProps.span = span);
    typeof offset != "undefined" && (this.colProps.offset = offset);
    return this;
  }

  render({
    ctx,
    formConfig,
    cons,
    formData,
    activateCon,
    parent,
  }: IConRenderOp) {
    if (formData && this.hide) {
      return undefined;
    }
    return (
      <NGridItem
        class={[
          formData ? "" : "controller",
          "controls__ grid-col",
          activateCon?.key == this.key ? "on" : "border",
          formData ? "form-render" : "",
        ].join(" ")}
        key={this.renderKey}
        span={this.colProps.span}
        offset={this.colProps.offset}
      >
        {activateCon?.key == this.key
          ? [
              <NFlex class="con-name" size={[3, 0]} align="center">
                <span>{this.conName}</span>
                {this.hide ? (
                  <NIcon size={15}>
                    <EyeOff />
                  </NIcon>
                ) : null}
              </NFlex>,
              <NFlex class="handler-button" size={[3, 0]} align="center">
                <div
                  title="选择父组件"
                  onClick={(e: Event) => {
                    e.stopPropagation();
                    ctx.emit("activateConF", parent);
                  }}
                >
                  <NIcon size={15}>
                    <ArrowBack />
                  </NIcon>
                </div>
                {this.getHandler(arguments[0])}
              </NFlex>,
            ]
          : null}
        <div
          class="content"
          onClick={(e: Event) => {
            e.stopPropagation();
            ctx.emit("activateConF", this);
          }}
        >
          {formData ? (
            this.childs.map((con) => {
              return (
                <Item
                  key={con.key}
                  parent={this as BaseCon}
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
              parent={this as BaseCon}
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
      </NGridItem>
    );
  }

  getHandler({ parent }: IConRenderOp & { parent: Grid }) {
    return [
      <div
        title="上移组件"
        onClick={(e: Event) => {
          e.stopPropagation();
          parent.moveChild(this, "up");
        }}
      >
        <NIcon size={15}>
          <ArrowUp />
        </NIcon>
      </div>,
      <div
        title="下移组件"
        onClick={(e: Event) => {
          e.stopPropagation();
          parent.moveChild(this, "down");
        }}
      >
        <NIcon size={15}>
          <ArrowDown />
        </NIcon>
      </div>,
      <div
        title="删除组件"
        onClick={(e: Event) => {
          e.stopPropagation();
          parent.removeChild(this);
        }}
      >
        <NIcon size={15}>
          <RemoveCircle />
        </NIcon>
      </div>,
    ];
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "占据列数量",
        editor: (
          <NInputNumber v-model:value={this.colProps.span} min={1} max={24} />
        ),
      },
      {
        label: "栅格左侧间隔",
        editor: (
          <NInputNumber v-model:value={this.colProps.offset} min={0} max={24} />
        ),
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}

/**
 * 栅格
 */
export class Grid extends BaseCon {
  /** 控件类型 */
  static ConType = "Grid";
  /** 控件名字 */
  static ConName = "栅格";
  /** 单例对象 */
  static I = new Grid();

  props = {
    cols: 24,
    xGap: 0,
    yGap: 0,
  };

  list = [new GridCol().setCol(12), new GridCol().setCol(12)];

  getChild() {
    return this.list;
  }

  initConfig(configs: any, toCons: any) {
    super.initConfig(configs, toCons);
    this.list = toCons(this.list, [GridCol]);
    return this;
  }

  /**
   * @param con
   * @param type
   */
  moveChild(con: GridCol, type: "up" | "down") {
    BaseCon.moveCon(this.list, con, type);
  }
  /**
   * @param con
   */
  removeChild(con: GridCol) {
    let i = this.list.findIndex((_) => _.key == con.key);
    if (i >= 0) {
      this.list.splice(i, 1);
    }
  }

  renderRaw(op: IConRenderOp) {
    return (
      <NGrid
        class={[
          "controls__ grid",
          op.activateCon?.key == this.key ? "" : "border",
          op.formData ? "form-render" : "",
        ].join(" ")}
        cols={this.props.cols}
        xGap={this.props.xGap}
        yGap={this.props.yGap}
      >
        {this.list.map((_) => {
          return _.render({
            ...op,
            parent: this,
          });
        })}
      </NGrid>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "栅格数量",
        editor: <NInputNumber v-model:value={this.props.cols} min={0} />,
      },
      {
        label: "横向间隔",
        editor: <NInputNumber v-model:value={this.props.xGap} min={0} />,
      },
      {
        label: "纵向间隔",
        editor: <NInputNumber v-model:value={this.props.yGap} min={0} />,
      },
    ];
    let push: IConRightRenderItemOp["childs"] = [
      {
        label: "当前栅格列",
      },
      {
        editor: (
          <NFlex vertical style={"width: 100%"}>
            {this.list.map((_, i) => {
              return (
                <NGrid xGap={5}>
                  <NGridItem span={6}>栅格{i + 1}</NGridItem>
                  <NGridItem span={18}>
                    <NFlex wrap={false}>
                      <NInputNumber
                        v-model:value={_.colProps.span}
                        min={1}
                        max={24}
                      />
                      <NButton
                        quaternary
                        circle
                        disabled={this.list.length <= 1}
                        onClick={() => {
                          this.list.splice(i, 1);
                        }}
                      >
                        <NIcon size={20}>
                          <RemoveCircle />
                        </NIcon>
                      </NButton>
                    </NFlex>
                  </NGridItem>
                </NGrid>
              );
            })}
            <NButton
              size="small"
              type="primary"
              onClick={() => {
                this.list.push(new GridCol().setCol(12));
              }}
            >
              增加栅格
            </NButton>
          </NFlex>
        ),
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    _.find((_) => _.key == "com")?.childs!.push(...push);
    return _;
  }
}
