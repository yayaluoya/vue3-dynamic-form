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
  NFlex,
  NGrid,
  NGridItem,
  NIcon,
  NInput,
  NSelect,
  NSwitch,
  NTabPane,
  NTabs,
  type TabsProps,
} from "naive-ui";
import { Move, RemoveCircle } from "@vicons/ionicons5";

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

  tabs: {
    key: string;
    label: string;
    activate: boolean;
    childs: BaseCon[];
  }[] = [
    {
      key: BaseCon.getHash(),
      label: "tab1",
      activate: true,
      childs: [],
    },
  ];
  activeName = 0;
  tabsProps: TabsProps = {
    /** 风格类型 */
    type: "line",
    /** 选项卡所在位置 */
    placement: "top",
  };

  getChild() {
    return this.tabs.reduce<BaseCon[]>((a, b) => {
      return [...a, ...b.childs];
    }, []);
  }

  initConfig(configs: any, toCons: any) {
    super.initConfig(configs, toCons);
    this.tabs.forEach((_) => {
      _.childs = toCons(_.childs);
    });
    return this;
  }

  renderRaw({ ctx, formConfig, cons, activateCon, formData }: IConRenderOp) {
    return (
      <NTabs
        style={`${
          activateCon?.key != this.key
            ? "border: 1px dashed var(--borderColor)"
            : ""
        }`}
        v-model:value={this.activeName}
        type={this.tabsProps.type}
        placement={this.tabsProps.placement}
        tabs-padding={10}
      >
        {this.tabs.map((_, i) => {
          return (
            <NTabPane key={_.key} tab={_.label} name={i} disabled={!_.activate}>
              {formData ? (
                _.activate ? (
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
                ) : null
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
            </NTabPane>
          );
        })}
      </NTabs>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "风格类型",
        editor: (
          <NSelect
            v-model:value={this.tabsProps.type}
            placeholder="请选择"
            options={[
              { label: "line", value: "line" },
              { label: "card", value: "card" },
              { label: "bar", value: "bar" },
              { label: "segment", value: "segment" },
            ]}
          />
        ),
      },
      {
        label: "选项卡位置",
        editor: (
          <NSelect
            v-model:value={this.tabsProps.placement}
            placeholder="请选择"
            options={[
              { label: "top", value: "top" },
              { label: "left", value: "left" },
              { label: "right", value: "right" },
              { label: "bottom", value: "bottom" },
            ]}
          />
        ),
      },
      {
        label: "选项卡设置",
      },
      {
        editor: (
          <NFlex vertical style={"width: 100%"}>
            <Draggable
              class="draggable"
              modelValue={this.tabs}
              onUpdate:modelValue={(_: any[]) => {
                this.tabs = [..._];
              }}
              animation={draggableC.animation}
              handle=".drag-handler"
              item-key="key"
            >
              {{
                item: ({
                  element: _,
                }: {
                  element: getArrayItemType<LabelPage["tabs"]>;
                }) => {
                  return (
                    <NGrid yGap={5} xGap={5} style={"margin-bottom: 5px"}>
                      <NGridItem span={7}>
                        <NFlex align="center" wrap={false} size={"small"}>
                          <span>激活</span>
                          <NSwitch size="small" v-model:value={_.activate} />
                        </NFlex>
                      </NGridItem>
                      <NGridItem span={17}>
                        <NFlex align="center" wrap={false} size={"small"}>
                          <NInput v-model:value={_.label} />
                          <NIcon
                            class="drag-handler"
                            style="cursor: move;"
                            size={20}
                          >
                            <Move />
                          </NIcon>
                          <NButton
                            size="small"
                            quaternary
                            circle
                            disabled={this.tabs.length <= 1}
                            onClick={() => {
                              let i = this.tabs.findIndex(
                                (__) => _.key == __.key
                              );
                              if (i >= 0) {
                                this.tabs.splice(i, 1);
                              }
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
                },
              }}
            </Draggable>
            <NButton
              type="primary"
              onClick={() => {
                this.tabs.push({
                  key: BaseCon.getHash(),
                  label: "tab" + (this.tabs.length + 1),
                  activate: true,
                  childs: [],
                });
              }}
            >
              增加选项卡
            </NButton>
          </NFlex>
        ),
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
