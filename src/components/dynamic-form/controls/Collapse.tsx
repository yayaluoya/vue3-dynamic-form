import DraggableCon from "../com/draggable.vue";
import Item from "../com/item.vue";
import Draggable from "vuedraggable";
import draggableC from "../config/draggableC";
import {
  BaseCon,
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightRenderItemOp,
} from "./BaseCon";
import {
  NButton,
  NCollapse,
  NCollapseItem,
  NFlex,
  NGrid,
  NGridItem,
  NIcon,
  NInput,
  NSelect,
  NSwitch,
  type CollapseProps,
} from "naive-ui";
import { Move, RemoveCircle } from "@vicons/ionicons5";

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

  collapses: {
    key: string;
    title: string;
    childs: BaseCon[];
  }[] = [
    {
      key: BaseCon.getHash(),
      title: "Collapse1",
      childs: [],
    },
  ];
  activeNames = [0];
  collapseProps: CollapseProps = {
    accordion: false,
    arrowPlacement: "left",
  };

  getChild() {
    return this.collapses.reduce<BaseCon[]>((a, b) => {
      return [...a, ...b.childs];
    }, []);
  }

  initConfig(configs: any, toCons: any) {
    super.initConfig(configs, toCons);
    this.collapses.forEach((_) => {
      _.childs = toCons(_.childs);
    });
    return this;
  }

  renderRaw({ ctx, formConfig, cons, activateCon, formData }: IConRenderOp) {
    return (
      <NCollapse
        v-model:expanded-names={this.activeNames}
        accordion={this.collapseProps.accordion}
        arrowPlacement={this.collapseProps.arrowPlacement}
      >
        {this.collapses.map((_, i) => {
          return (
            <NCollapseItem key={_.key} title={_.title} name={i}>
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
                      formRender
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
            </NCollapseItem>
          );
        })}
      </NCollapse>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "手风琴模式",
        editor: <NSwitch v-model:value={this.collapseProps.accordion} />,
      },
      {
        label: "",
        editor: (
          <NSelect
            v-model:value={this.collapseProps.arrowPlacement}
            placeholder="请选择"
            options={[
              { label: "left", value: "left" },
              { label: "right", value: "right" },
            ]}
          />
        ),
      },
      {
        label: "选项设置",
      },
      {
        editor: (
          <NFlex vertical style={"width: 100%"}>
            <Draggable
              class="draggable"
              modelValue={this.collapses}
              onUpdate:modelValue={(_: Collapse["collapses"]) => {
                this.collapses = [..._];
              }}
              animation={draggableC.animation}
              handle=".drag-handler"
              item-key="key"
            >
              {{
                item: ({
                  element: _,
                }: {
                  element: getArrayItemType<Collapse["collapses"]>;
                }) => {
                  return (
                    <NGrid yGap={5} xGap={5} style={"margin-bottom: 5px"}>
                      <NGridItem span={19}>
                        <NInput v-model:value={_.title} />
                      </NGridItem>
                      <NGridItem span={5}>
                        <NIcon
                          class="drag-handler"
                          style="cursor: move;"
                          size={20}
                        >
                          <Move />
                        </NIcon>
                        <NButton
                          disabled={this.collapses.length <= 1}
                          size="small"
                          quaternary
                          circle
                          onClick={() => {
                            let i = this.collapses.findIndex(
                              (__) => _.key == __.key
                            );
                            if (i >= 0) {
                              this.collapses.splice(i, 1);
                            }
                          }}
                        >
                          <NIcon size={20}>
                            <RemoveCircle />
                          </NIcon>
                        </NButton>
                      </NGridItem>
                    </NGrid>
                  );
                },
              }}
            </Draggable>
            <NButton
              type="primary"
              onClick={() => {
                this.collapses.push({
                  key: BaseCon.getHash(),
                  title: "Collapse" + (this.collapses.length + 1),
                  childs: [],
                });
              }}
            >
              增加选项
            </NButton>
          </NFlex>
        ),
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
