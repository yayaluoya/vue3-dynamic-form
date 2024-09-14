<script>
import {
  ref,
  reactive,
  defineComponent,
  onMounted,
  onUnmounted,
  toRef,
  nextTick,
} from "vue";
import draggableC from "./config/draggableC";
import { DocumentCopy } from "@element-plus/icons-vue";
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
} from "./controls";
import Draggable from "vuedraggable";
import DraggableCon from "./com/draggable.vue";
import CodeEditInput from "./com/codeEditInput.vue";
import { ConT } from "./ConT";
import { Clipboard } from "./tool/web/Clipboard";
import { FileT } from "./tool/web/FileT";
import { ElMessage } from "element-plus";
import { ObjectUtils } from "./tool/obj/ObjectUtils";
import Preview from "./preview.vue";

export default defineComponent({
  components: {
    Draggable,
    DraggableCon,
    Item,
    Right,
    DocumentCopy,
    CodeEditInput,
    Preview,
  },
  props: {
    cons: {
      type: Array,
      required: true,
    },
    extendCons: {
      type: Array,
      default: () => [],
    },
    formConfig: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:cons"],
  setup(props, ctx) {
    const rootElRef = ref();
    const bScrollbarRef = ref();
    const leftTabsActiveNames = ref("con");
    const previewEl = ref();
    const previewOp = reactive({
      show: false,
      cons: [],
      formData: {},
      formConfig: {},
    });
    /** 拖拽中 */
    const draggableLoading = ref(false);
    /** 控件列表 */
    const Cons = reactive([
      {
        label: "基础类型",
        cons: [Input, InputNumber, Radio, Checkbox, Select, Button],
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
        label: "扩展类型",
        cons: toRef(props, "extendCons"),
      },
    ]);
    const ConsCollapseActiveNames = ref(Cons.map((_) => _.label));

    /** 当前激活的控件 */
    const activateCon = ref(null);
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
        let el = bScrollbarRef.value.$el.firstElementChild;
        bScrollbarRef.value.$el.firstElementChild.scrollTo({
          top:
            el.scrollTop +
            el
              .querySelector(`[data-key='${activateCon.value.key}']`)
              .getBoundingClientRect().y -
            el.getBoundingClientRect().y -
            50,
          behavior: "smooth",
        });
      }, 0);
    }

    /** 更新控件列表 */
    function updateCons(cons) {
      ctx.emit("update:cons", cons);
    }

    /** 克隆组件 */
    function cloneComponent(Con) {
      return new Con();
    }

    /** 预览 */
    function preview() {
      previewOp.show = true;
      previewOp.cons = ConT.toCons(
        ConT.toConfigs(props.cons),
        props.extendCons
      );
      previewOp.formData = ConT.getFromData(previewOp.cons);
      previewOp.formConfig = ObjectUtils.clone2(props.formConfig);
      nextTick(() => {
        previewEl.value.clearValidate();
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
        4
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
        4
      );
    }

    function importJSONH() {
      try {
        let { formConfig, cons } = JSON.parse(JSONH.jsonText);
        updateCons(ConT.toCons(cons), props.extendCons);
        for (let i in formConfig) {
          props.formConfig[i] = formConfig[i];
        }
        JSONH.show = false;
      } catch (e) {
        ElMessage({
          message: e,
          type: "error",
        });
      }
    }
    function copy() {
      Clipboard.set(JSONH.jsonText)
        .then(() => {
          ElMessage({
            message: "已复制到剪切板",
            type: "success",
          });
          JSONH.show = false;
        })
        .catch((e) => {
          ElMessage({
            message: e,
            type: "error",
          });
        });
    }
    function saveToFile() {
      FileT.download(
        URL.createObjectURL(new Blob([JSONH.jsonText])),
        `vue3-dynamic-form-${JSONH.type}.json`
      );
      JSONH.show = false;
    }

    function getFromData() {
      previewEl.value.validate().then(() => {
        JSONH.type = "getFromData";
        JSONH.show = true;
        JSONH.title = "表单数据";
        JSONH.jsonText = JSON.stringify(previewOp.formData, undefined, 4);
      });
    }

    function getContentHeight() {
      let rootHeight = rootElRef.value.getBoundingClientRect().height;
      rootElRef.value.style.setProperty("--height", `${rootHeight}px`);
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
      previewOp,
      getFromData,
      previewEl,
    };
  },
});
</script>

<template>
  <div class="dynamic-form" ref="rootElRef">
    <div class="a">
      <el-tabs v-model="leftTabsActiveNames">
        <el-tab-pane label="组件库" name="con">
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <div class="content__">
              <el-form
                :inline="formConfig.inline"
                :label-position="formConfig.labelPosition"
                :label-width="formConfig.labelWidth"
                :label-suffix="formConfig.labelsuffix"
                :hide-required-asterisk="formConfig.hideRequiredAsterisk"
                :require-asterisk-position="formConfig.requireAsteriskPosition"
                :show-message="formConfig.showMessage"
                :inline-message="formConfig.inlineMessage"
                :status-icon="formConfig.statusIcon"
                :size="formConfig.size"
                :disabled="formConfig.disabled"
              >
                <el-collapse v-model="ConsCollapseActiveNames">
                  <el-collapse-item
                    v-for="(item, index) in Cons"
                    :key="index"
                    :title="item.label"
                    :name="item.label"
                  >
                    <Draggable
                      :class="draggableC.class"
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
                      <template #item="{ element: Con }">
                        <div
                          class="draggable-item"
                          :class="{
                            on: Con.ConType === activateCon?.conType,
                          }"
                        >
                          <span>{{ Con.ConName }}</span>
                          <div class="draggable-show-item">
                            <Item drag :formConfig="formConfig" :con="Con.I" />
                          </div>
                        </div>
                      </template>
                    </Draggable>
                  </el-collapse-item>
                </el-collapse>
              </el-form>
            </div>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="表单模板" name="template"></el-tab-pane>
      </el-tabs>
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
            @click="preview([])"
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
          <el-icon @click="positionToOnCon()"><Aim /></el-icon>
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
        <el-scrollbar wrap-class="scrollbar-wrapper" ref="bScrollbarRef">
          <div class="content__">
            <el-form
              :inline="formConfig.inline"
              :label-position="formConfig.labelPosition"
              :label-width="formConfig.labelWidth"
              :label-suffix="formConfig.labelsuffix"
              :hide-required-asterisk="formConfig.hideRequiredAsterisk"
              :require-asterisk-position="formConfig.requireAsteriskPosition"
              :show-message="formConfig.showMessage"
              :inline-message="formConfig.inlineMessage"
              :status-icon="formConfig.statusIcon"
              :size="formConfig.size"
              :disabled="formConfig.disabled"
            >
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
            </el-form>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="c">
      <Right :cons="cons" :activateCon="activateCon" :formConfig="formConfig" />
    </div>
    <el-dialog v-model="JSONH.show" :title="JSONH.title" width="800" draggable>
      <el-scrollbar style="height: 500px" wrap-class="scrollbar-wrapper">
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
      </el-scrollbar>
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
    <el-dialog v-model="previewOp.show" title="表单预览" width="900" draggable>
      <el-scrollbar style="height: 500px" wrap-class="scrollbar-wrapper">
        <Preview
          ref="previewEl"
          :cons="previewOp.cons"
          :formConfig="previewOp.formConfig"
          :formData="previewOp.formData"
        />
      </el-scrollbar>
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
    > .el-tabs {
      width: 100%;
      ::v-deep .el-tabs__header {
        margin-bottom: 0;
      }
      ::v-deep .el-tabs__nav-scroll {
        padding: 0 10px;
      }
      .el-scrollbar {
        width: 100%;
        height: calc(var(--height) - 40px);
        .content__ {
          display: flex;
          flex-direction: column;
          padding: 0 10px;
          ::v-deep .el-collapse-item__header {
            font-weight: bold;
          }
          ::v-deep .el-collapse-item__content {
            padding-bottom: 10px;
          }
          .dynamic-form-draggable {
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
          > .list:nth-last-child(1) {
            margin-bottom: 0px;
          }
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
      height: 40px;
      border-bottom: 1px solid var(--el-border-color-light);
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
      height: calc(var(--height) - 40px);
      display: flex;
      flex-direction: column;
      position: relative;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      &.draggableLoading {
        .dynamic-form-draggable {
          box-shadow: 0px 0px 4px #409eff;
        }
      }
      > .null {
        position: absolute;
        color: #999;
        font-size: 18px;
        pointer-events: none;
        z-index: 2;
      }
      > .el-scrollbar {
        width: 100%;
        position: relative;
        z-index: 1;
        background-color: #f3f3f3;
        box-sizing: border-box;
        .content__ {
          width: 100%;
          box-sizing: border-box;
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 10px;
          > .el-form {
            width: 100%;
            .draggable-con {
              min-height: calc(var(--height) - 40px - 20px);
            }
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
