<script lang="ts">
import {
  ref,
  reactive,
  defineComponent,
  onMounted,
  onUnmounted,
  toRef,
  nextTick,
  type PropType,
} from "vue";
import draggableC from "./config/draggableC";
import Right from "./right/index.vue";
import Item from "./com/item.vue";
import { WindowSizeChangeE } from "./tool/web/event/WindowSizeChangeE";
import {
  Button,
  Grid,
  Card,
  LabelPage,
  Table,
  Collapse,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  Select,
  Divider,
  Alert,
  ColorPicker,
  Rate,
  Slider,
  BaseCon,
  Split,
  Interval,
  Text,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
} from "./controls";
import Draggable from "vuedraggable";
import DraggableCon from "./com/draggable.vue";
import CodeEditInput from "./com/codeEditInput.vue";
import { ConT } from "./ConT";
import { ObjectUtils } from "./tool/obj/ObjectUtils";
import Render from "./render.vue";
import type { TFormConfig } from "./config/getFormConfig";
import {
  NTabs,
  NTabPane,
  NForm,
  NFormItem,
  NCollapse,
  NCollapseItem,
  NSwitch,
  NInput,
  NRadioGroup,
  NRadioButton,
  NSelect,
  NScrollbar,
  NButton,
  NDialog,
  NDialogProvider,
  NMessageProvider,
  useThemeVars,
  NFlex,
  NText,
} from "naive-ui";
import IndexDialog, { type IJSONH, type IRenderOp } from "./indexDialog";

export default defineComponent({
  components: {
    NForm,
    NTabs,
    NTabPane,
    NFormItem,
    NCollapse,
    NCollapseItem,
    NSwitch,
    NInput,
    NRadioGroup,
    NRadioButton,
    NSelect,
    NScrollbar,
    Draggable,
    DraggableCon,
    Item,
    Right,
    CodeEditInput,
    Render,
    NButton,
    NDialog,
    IndexDialog,
    NFlex,
    NDialogProvider: NDialogProvider as any,
    NMessageProvider: NMessageProvider as any,
    NText,
  },
  props: {
    cons: {
      type: Array as PropType<BaseCon[]>,
      required: true,
    },
    /** 扩展组件列表 */
    extendCons: {
      type: Array as PropType<(typeof BaseCon)[]>,
      default: () => [],
    },
    formConfig: {
      type: Object as PropType<TFormConfig>,
      required: true,
    },
  },
  emits: ["update:cons"],
  setup(props, ctx) {
    const rootElRef = ref<HTMLDivElement>();
    const DialogI = ref<InstanceType<typeof IndexDialog>>();
    const leftTabsActiveNames = ref<"con" | "template">("con");
    const renderOp = reactive<IRenderOp>({});
    const themeVars = useThemeVars();
    const rootHeight = ref(0);
    /** 拖拽中 */
    const draggableLoading = ref(false);
    /** 控件列表 */
    const Cons = reactive([
      {
        label: "表单类型",
        cons: [
          Input,
          InputNumber,
          Radio,
          Checkbox,
          Select,
          ColorPicker,
          Rate,
          Slider,
          Switch,
          DatePicker,
          TimePicker,
        ],
      },
      {
        label: "高级类型",
        cons: [Upload],
      },
      {
        label: "容器类型",
        cons: [Grid, Table, LabelPage, Card, Collapse, Split],
      },
      {
        label: "其他类型",
        cons: [Divider, Interval, Alert, Button, Text],
      },
      {
        label: "扩展类型",
        cons: toRef(props, "extendCons"),
      },
    ]);
    const ConsCollapseActiveNames = ref(Cons.map((_) => _.label));

    /** 当前激活的控件 */
    const activateCon = ref<BaseCon>();

    /** Json导入导出处理 */
    const JSONH = reactive<IJSONH>({
      type: "",
      title: "",
      jsonText: "",
    });

    /** 更新控件列表 */
    function updateCons(cons: BaseCon[]) {
      ctx.emit("update:cons", cons);
    }

    /** 克隆组件 */
    function cloneComponent(Con: typeof BaseCon) {
      return new Con();
    }

    /** 预览 */
    function preview() {
      renderOp.cons = ConT.toCons(ConT.toConfigs(props.cons), props.extendCons);
      renderOp.formData = ConT.getFromData(renderOp.cons as any);
      renderOp.formConfig = ObjectUtils.clone2(props.formConfig);
      DialogI.value?.preview(renderOp as any);
    }

    /** 导入json */
    function importJSON() {
      JSONH.type = "import";
      JSONH.title = "导入JSON";
      JSONH.jsonText = JSON.stringify(
        {
          formConfig: props.formConfig,
          cons: ConT.toConfigs(props.cons),
        },
        undefined,
        2
      );
      DialogI.value?.importExport(JSONH, (jsonText: string) => {
        let { formConfig, cons } = JSON.parse(jsonText) as {
          formConfig: TFormConfig;
          cons: BaseCon[];
        };
        updateCons(ConT.toCons(cons, props.extendCons));
        for (let i in formConfig) {
          (props.formConfig as any)[i] = (formConfig as any)[i];
        }
        activateCon.value = undefined;
      });
    }

    /** 导出json */
    function exportJSON() {
      JSONH.type = "export";
      JSONH.title = "导出JSON";
      JSONH.jsonText = JSON.stringify(
        {
          formConfig: props.formConfig,
          cons: ConT.toConfigs(props.cons),
        },
        undefined,
        2
      );
      DialogI.value?.importExport(JSONH);
    }

    function getContentHeight() {
      rootHeight.value = rootElRef.value!.getBoundingClientRect().height;
    }
    onMounted(() => {
      getContentHeight();
      WindowSizeChangeE.instance.on("resize", ctx, getContentHeight);
    });
    onUnmounted(() => {
      WindowSizeChangeE.instance.off("resize", ctx);
    });

    return {
      log: console.log,
      rootHeight,
      themeVars,
      rootElRef,
      leftTabsActiveNames,
      ConsCollapseActiveNames,
      draggableLoading,
      draggableC,
      Cons,
      activateCon,
      cloneComponent,
      updateCons,
      JSONH,
      importJSON,
      exportJSON,
      preview,
      renderOp,
      DialogI,
    };
  },
});
</script>

<template>
  <div
    class="dynamic-form"
    :ref="(_: any)=>{ 
      rootElRef= _;
    }"
    :style="`
    --height: ${rootHeight}px;
    --primaryColor: ${themeVars.primaryColor};
    --primaryColorHover: ${themeVars.primaryColorHover};
    --borderColor: ${themeVars.borderColor};
    --baseColor: ${themeVars.baseColor};
    --dividerColor: ${themeVars.dividerColor};
    --textColor1: ${themeVars.textColor1};
    --textColor2: ${themeVars.textColor2};
    --textColor3: ${themeVars.textColor3};
    `"
  >
    <NMessageProvider>
      <NDialogProvider>
        <div class="a">
          <NTabs
            v-model:value="leftTabsActiveNames"
            type="line"
            :tabs-padding="10"
            pane-wrapper-style="padding: 0 10px"
            animated
          >
            <NTabPane tab="组件库" name="con">
              <NScrollbar style="height: calc(var(--height) - 60px)">
                <NForm
                  :inline="formConfig.inline"
                  :label-width="formConfig.labelWidth"
                  :label-align="formConfig.labelAlign"
                  :label-placement="formConfig.labelPlacement"
                  :show-feedback="formConfig.showFeedback"
                  :show-label="formConfig.showLabel"
                  :show-require-mark="formConfig.showRequireMark"
                  :require-mark-placement="formConfig.requireMarkPlacement"
                  :size="formConfig.size"
                >
                  <NCollapse :default-expanded-names="ConsCollapseActiveNames">
                    <NCollapseItem
                      v-for="(item, index) in Cons"
                      :key="index"
                      :title="item.label"
                      :name="item.label"
                    >
                      <Draggable
                        :class="draggableC.class + ' a'"
                        :list="item.cons"
                        :group="{
                          name: draggableC.group,
                          pull: 'clone',
                          put: false,
                        }"
                        :clone="cloneComponent"
                        :sort="false"
                        @start="draggableLoading = true"
                        @end="draggableLoading = false"
                        item-key="type"
                      >
                        <template
                          #item="{ element: Con }: { element: typeof BaseCon }"
                        >
                          <div
                            class="draggable-item"
                            :class="{
                              on: Con.ConType === activateCon?.conType,
                            }"
                          >
                            <NText class="name">{{ Con.ConName }}</NText>
                            <div class="draggable-show-item">
                              <Item
                                drag
                                :formConfig="formConfig"
                                :con="Con.I!"
                              />
                            </div>
                          </div>
                        </template>
                      </Draggable>
                    </NCollapseItem>
                  </NCollapse>
                </NForm>
              </NScrollbar>
            </NTabPane>
            <NTabPane tab="表单模板" name="template">
              <NScrollbar
                style="height: calc(var(--height) - 60px)"
              ></NScrollbar>
            </NTabPane>
          </NTabs>
        </div>
        <div class="b">
          <div class="top">
            <div></div>
            <NFlex>
              <NButton
                style="margin-right: 10px"
                type="primary"
                :disabled="cons.length <= 0"
                text
                @click="updateCons([])"
              >
                清空
              </NButton>
              <NButton
                style="margin-right: 10px"
                type="primary"
                :disabled="cons.length <= 0"
                text
                @click="preview()"
              >
                预览
              </NButton>
              <NButton
                style="margin-right: 10px"
                type="primary"
                text
                @click="importJSON()"
              >
                导入JSON
              </NButton>
              <NButton
                style="margin-right: 10px"
                type="primary"
                text
                @click="exportJSON()"
              >
                导出JSON
              </NButton>
            </NFlex>
          </div>
          <div class="content">
            <NText class="null" v-if="cons.length <= 0">
              请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处</NText
            >
            <NScrollbar style="height: calc(var(--height) - 42px)">
              <NForm
                :inline="formConfig.inline"
                :label-width="formConfig.labelWidth"
                :label-align="formConfig.labelAlign"
                :label-placement="formConfig.labelPlacement"
                :show-feedback="formConfig.showFeedback"
                :show-label="formConfig.showLabel"
                :show-require-mark="formConfig.showRequireMark"
                :require-mark-placement="formConfig.requireMarkPlacement"
                :size="formConfig.size"
              >
                <div class="draggable-con-div">
                  <DraggableCon
                    class="draggable-con"
                    :class="{
                      draggableLoading: draggableLoading,
                    }"
                    :cons="cons"
                    :formConfig="formConfig"
                    :activateCon="activateCon"
                    @update:cons="
                      (_) => {
                        updateCons(_);
                      }
                    "
                    @update:activateCon="
                      (_) => {
                        activateCon = _;
                      }
                    "
                  />
                </div>
              </NForm>
            </NScrollbar>
          </div>
        </div>
        <div class="c">
          <Right
            :cons="cons"
            :activateCon="activateCon"
            :formConfig="formConfig"
          />
        </div>
        <IndexDialog
          :ref="
            (_: any) => {
              DialogI = _;
            }
          "
        >
        </IndexDialog>
      </NDialogProvider>
    </NMessageProvider>
  </div>
</template>

<style scoped lang="scss">
.dynamic-form {
  --height: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  background-color: var(--baseColor);

  > .a,
  > .b,
  > .c {
    box-sizing: border-box;
    height: var(--height);
  }

  > .a {
    width: 260px;
    box-sizing: border-box;
    display: flex;

    .dynamic-form-draggable.a {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      .draggable-item {
        width: calc(50% - 4px);
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding: 4px;
        border-radius: 4px;
        margin-bottom: 5px;
        cursor: move;
        background-color: var(--baseColor);
        border: 1px solid var(--borderColor);
        > .draggable-show-item {
          display: none;
        }
        &.on,
        &:hover {
          border-color: var(--primaryColorHover) !important;
          > .name {
            color: var(--primaryColorHover);
          }
        }
        > .name {
          font-family: "Source Han Sans CN";
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 20px;
          /* identical to box height */
        }
      }
    }
  }
  > .b {
    width: 0;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    > .top {
      height: 41.8px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--dividerColor);
    }
    > .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      background-color: var(--dividerColor);

      > .null {
        position: absolute;
        pointer-events: none;
        z-index: 2;
        color: var(--textColor3);
      }
      .draggable-con-div {
        padding: 10px;
        width: 100%;
        background-color: var(--dividerColor);
        > .draggable-con {
          min-height: calc(var(--height) - 40px - 22px);
          background-color: var(--baseColor);
          &.draggableLoading {
            box-shadow: 0px 0px 4px var(--primaryColor);
          }
        }
      }
    }
  }
  > .c {
    width: 280px;
    box-sizing: border-box;
    display: flex;
  }
}
</style>
