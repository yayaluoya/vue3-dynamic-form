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
  NSpace,
  NDialog,
  NDialogProvider,
  NMessageProvider,
  useThemeVars,
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
    NSpace,
    NDialog,
    IndexDialog,
    NDialogProvider: NDialogProvider as any,
    NMessageProvider: NMessageProvider as any,
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
        ],
      },
      {
        label: "高级类型",
        cons: [],
      },
      {
        label: "容器类型",
        cons: [Grid, Table, LabelPage, Card, Collapse],
      },
      {
        label: "其他类型",
        cons: [Divider, Alert, Button],
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
      let rootHeight = rootElRef.value!.getBoundingClientRect().height;
      rootElRef.value!.style.setProperty("--height", `${rootHeight}px`);
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
    background-color: ${themeVars.baseColor}
    `"
  >
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
                        :style="`
                          --hover-color: ${themeVars.primaryColorHover};
                          background-color: ${themeVars.baseColor};
                          border: 1px solid ${themeVars.borderColor};
                        `"
                      >
                        <span>{{ Con.ConName }}</span>
                        <div class="draggable-show-item">
                          <Item drag :formConfig="formConfig" :con="Con.I!" />
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
          <NScrollbar style="height: calc(var(--height) - 60px)"></NScrollbar>
        </NTabPane>
      </NTabs>
    </div>
    <div class="b">
      <div
        class="top"
        :style="`
          border-bottom: 1px solid ${themeVars.dividerColor};
        `"
      >
        <div></div>
        <NSpace>
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
        </NSpace>
      </div>
      <div
        class="content"
        :style="`
          background-color: ${themeVars.dividerColor}
        `"
      >
        <span
          class="null"
          v-if="cons.length <= 0"
          :style="`
          color: ${themeVars.textColor3}
        `"
          >请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处</span
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
                :style="`
                  --primary-color: ${themeVars.primaryColor};
                  background-color: ${themeVars.baseColor};
                `"
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
      <Right :cons="cons" :activateCon="activateCon" :formConfig="formConfig" />
    </div>
    <NMessageProvider>
      <NDialogProvider>
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
        > .draggable-show-item {
          display: none;
        }
        &.on,
        &:hover {
          border-color: var(--hover-color) !important;
          > span {
            color: var(--hover-color);
          }
        }
        > span {
          font-family: "Source Han Sans CN";
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 20px;
          /* identical to box height */
          color: #7a7a86;
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
      > div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      > div:nth-child(2) {
        > .el-icon {
          cursor: pointer;
        }
      }
    }
    > .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      > .null {
        position: absolute;
        font-size: 18px;
        pointer-events: none;
        z-index: 2;
      }
      .draggable-con-div {
        padding: 10px;
        width: 100%;
        > .draggable-con {
          min-height: calc(var(--height) - 40px - 25px);
          &.draggableLoading {
            box-shadow: 0px 0px 4px var(--primary-color);
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
