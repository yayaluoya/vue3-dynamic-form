import draggableC from "../config/draggableC";
import { BaseCon, type IConRightRenderItemOp } from "./BaseCon";
import {
  NButton,
  NFlex,
  NGrid,
  NGridItem,
  NIcon,
  NInput,
  NSwitch,
} from "naive-ui";
import Draggable from "vuedraggable";
import { Move, RemoveCircle } from "@vicons/ionicons5";
import { BaseForm } from "./BaseForm";
import type { JSX } from "vue/jsx-runtime";

export interface IOpItem {
  key: string;
  value: string;
  label: string;
  activate: boolean;
}

/**
 * 选项式控件基类
 */
export class BaseOption extends BaseForm {
  list: IOpItem[] = [];

  constructor() {
    super();
    this.list.push(this.getOp());
    this.list.push(this.getOp());
  }

  getOp(): IOpItem {
    return {
      key: BaseCon.getHash(),
      value: (this.list.length + 1).toString(),
      label: "Option" + (this.list.length + 1),
      activate: true,
    };
  }

  getRightOptionEditor(
    op: {
      showActivate?: boolean;
      getValueEditor?: (_: IOpItem) => JSX.Element | undefined;
      getLableEditor?: (_: IOpItem) => JSX.Element | undefined;
    } = { showActivate: true }
  ): IConRightRenderItemOp["childs"] {
    return [
      {
        label: "选项设置",
      },
      {
        editor: (
          <NFlex vertical style={"width: 100%"}>
            <Draggable
              class="draggable"
              modelValue={this.list}
              onUpdate:modelValue={(_: any[]) => {
                this.list = [..._];
              }}
              animation={draggableC.animation}
              handle=".drag-handler"
              item-key="key"
            >
              {{
                item: ({ element: _ }: { element: IOpItem }) => {
                  return (
                    <NGrid yGap={5} xGap={5}>
                      {op.showActivate ? (
                        <>
                          <NGridItem span={3}>激活</NGridItem>
                          <NGridItem span={4}>
                            <NSwitch size="small" v-model:value={_.activate} />
                          </NGridItem>
                        </>
                      ) : undefined}
                      {op?.getLableEditor ? (
                        op.getLableEditor(_)
                      ) : (
                        <NGridItem span={6}>
                          <NInput v-model:value={_.label} />
                        </NGridItem>
                      )}
                      {op?.getValueEditor ? (
                        op.getValueEditor(_)
                      ) : (
                        <NGridItem span={6}>
                          <NInput v-model:value={_.value} />
                        </NGridItem>
                      )}
                      <NGridItem span={5}>
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
                          onClick={() => {
                            let i = this.list.findIndex(
                              (__) => _.key == __.key
                            );
                            if (i >= 0) {
                              this.list.splice(i, 1);
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
              size="small"
              type="primary"
              onClick={() => {
                this.list.push(this.getOp());
              }}
            >
              增加选项
            </NButton>
          </NFlex>
        ),
      },
    ];
  }
}
