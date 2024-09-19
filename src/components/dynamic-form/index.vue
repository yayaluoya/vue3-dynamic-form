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
import { Clipboard } from "./tool/web/Clipboard";
import { FileT } from "./tool/web/FileT";
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
} from "naive-ui";

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
    const bScrollbarRef = ref();
    const renderEl = ref();
    const leftTabsActiveNames = ref<"con" | "template">("con");
    const renderOp = reactive<{
      show: boolean;
      cons?: BaseCon[];
      formData?: Record<string, any>;
      formConfig?: TFormConfig;
    }>({
      show: false,
      cons: undefined,
      formData: undefined,
      formConfig: undefined,
    });
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
    /** 鼠标是否在控件内 */
    const mouseOn = ref(false);

    /** Json导入导出处理 */
    const JSONH = reactive({
      type: "",
      show: false,
      title: "",
      jsonText: "",
    });

    /** 定位到当前操作con */
    function positionToOnCon() {
      if (!activateCon.value) {
        return;
      }
      setTimeout(() => {
        bScrollbarRef.value.scrollTo({
          top: document
            .querySelector(`[data-key='${activateCon.value!.key}']`)!
            .getBoundingClientRect().y,
          behavior: "smooth",
        });
      }, 0);
    }

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
      renderOp.show = true;
      renderOp.cons = ConT.toCons(ConT.toConfigs(props.cons), props.extendCons);
      renderOp.formData = ConT.getFromData(renderOp.cons);
      renderOp.formConfig = ObjectUtils.clone2(props.formConfig);
      nextTick(() => {
        renderEl.value.restoreValidation();
      });
    }

    /** 导入json */
    function importJSON() {
      JSONH.type = "import";
      JSONH.show = true;
      JSONH.title = "导入JSON";
      JSONH.jsonText = JSON.stringify(
        {
          formConfig: props.formConfig,
          cons: ConT.toConfigs(props.cons),
        },
        undefined,
        2
      );
    }
    /** 导出json */
    function exportJSON() {
      JSONH.type = "export";
      JSONH.show = true;
      JSONH.title = "导出JSON";
      JSONH.jsonText = JSON.stringify(
        {
          formConfig: props.formConfig,
          cons: ConT.toConfigs(props.cons),
        },
        undefined,
        2
      );
    }

    function importJSONH() {
      try {
        let { formConfig, cons } = JSON.parse(JSONH.jsonText) as {
          formConfig: TFormConfig;
          cons: BaseCon[];
        };
        updateCons(ConT.toCons(cons, props.extendCons));
        for (let i in formConfig) {
          (props.formConfig as any)[i] = (formConfig as any)[i];
        }
        activateCon.value = undefined;
        JSONH.show = false;
      } catch (e) {}
    }
    function copy() {
      Clipboard.set(JSONH.jsonText)
        .then(() => {
          JSONH.show = false;
        })
        .catch((e) => {});
    }
    function saveToFile() {
      FileT.download(
        URL.createObjectURL(new Blob([JSONH.jsonText])),
        `vue3-dynamic-form-${JSONH.type}.json`
      );
      JSONH.show = false;
    }

    function getFromData() {
      renderEl.value.validate().then(() => {
        JSONH.type = "getFromData";
        JSONH.show = true;
        JSONH.title = "表单数据";
        JSONH.jsonText = JSON.stringify(renderOp.formData, undefined, 2);
      });
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
      rootElRef,
      bScrollbarRef,
      leftTabsActiveNames,
      ConsCollapseActiveNames,
      draggableLoading,
      draggableC,
      Cons,
      activateCon,
      mouseOn,
      cloneComponent,
      positionToOnCon,
      updateCons,
      JSONH,
      importJSON,
      exportJSON,
      importJSONH,
      copy,
      saveToFile,
      preview,
      renderOp,
      getFromData,
      renderEl,
    };
  },
});
</script>

<template>
  <div class="dynamic-form" ref="rootElRef">
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
      <div class="top">
        <div></div>
        <div>
          <el-button
            style="margin-right: 10px"
            type="primary"
            link
            @click="updateCons([])"
          >
            清空
          </el-button>
          <el-button
            style="margin-right: 10px"
            type="primary"
            link
            @click="preview()"
          >
            预览
          </el-button>
          <el-button
            style="margin-right: 10px"
            type="primary"
            link
            @click="importJSON()"
          >
            导入JSON
          </el-button>
          <el-button
            style="margin-right: 10px"
            type="primary"
            link
            @click="exportJSON()"
          >
            导出JSON
          </el-button>
          <!-- <el-icon @click="positionToOnCon()"><Aim /></el-icon> -->
        </div>
      </div>
      <div
        class="content"
        :class="{
          draggableLoading: draggableLoading,
        }"
        @mouseover="mouseOn = true"
        @mouseleave="mouseOn = false"
      >
        <span class="null" v-if="cons.length <= 0"
          >请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处</span
        >
        <NScrollbar
          ref="bScrollbarRef"
          style="height: calc(var(--height) - 42px)"
        >
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
    <el-dialog v-model="JSONH.show" :title="JSONH.title" width="800" draggable>
      <CodeEditInput
        :value="JSONH.jsonText"
        @update:value="
          (v) => {
            JSONH.jsonText = v;
          }
        "
        :options="{
          lang: 'json',
        }"
      />
      <template #footer>
        <template v-if="JSONH.type == 'import'">
          <el-button type="primary" @click="importJSONH()">导入</el-button>
        </template>
        <template v-if="JSONH.type == 'export' || JSONH.type == 'getFromData'">
          <el-button type="primary" @click="copy()">复制</el-button>
          <el-button type="primary" @click="saveToFile()"
            >保存为文件 ({{
              (JSONH.jsonText.length / 1024).toFixed(2)
            }}kb)</el-button
          >
        </template>
        <el-button @click="JSONH.show = false">关闭</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="renderOp.show" title="表单预览" width="900" draggable>
      <NScrollbar style="max-height: 700px" wrap-class="scrollbar-wrapper">
        <Render
          ref="renderEl"
          :cons="renderOp.cons!"
          :formConfig="renderOp.formConfig!"
          :formData="renderOp.formData!"
        />
      </NScrollbar>
      <template #footer>
        <el-button type="primary" @click="getFromData()"
          >获取表单数据</el-button
        >
      </template>
    </el-dialog>
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
    background: #ffffff;
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
        background-color: white;
        border: 1px solid #dddddd;
        border-radius: 4px;
        margin-bottom: 5px;
        cursor: move;
        > .draggable-show-item {
          display: none;
        }
        &.on,
        &:hover {
          border-color: #1890ff;
          background-color: #eff2f5;
          > span {
            color: #1890ff;
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
      background-color: #f3f3f3;
      > .null {
        position: absolute;
        color: #999;
        font-size: 18px;
        pointer-events: none;
        z-index: 2;
      }
      .draggable-con-div {
        padding: 10px;
        > .draggable-con {
          background-color: white;
          min-height: calc(var(--height) - 40px - 25px);
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
