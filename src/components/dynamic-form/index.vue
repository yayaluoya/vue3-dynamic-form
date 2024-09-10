<script>
import { ref, reactive, defineComponent, onMounted, onUnmounted } from "vue";
import draggableC from "./config/draggableC";
import { DocumentCopy } from "@element-plus/icons-vue";
import Right from "./right/index.vue";
import Item from "./com/item.vue";
import { WindowSizeChangeE } from "./tool/web/event/WindowSizeChangeE";
import { Button, Subfield, Card, LabelPage, Table } from "./controls";
import Draggable from "vuedraggable";
import DraggableCon from "./com/draggable.vue";

export default defineComponent({
  components: { Draggable, DraggableCon, Item, Right, DocumentCopy },
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
    /** 拖拽中 */
    const draggableLoading = ref(false);
    /** 控件列表 */
    const Cons = reactive([
      {
        label: "基础类型",
        cons: [Button],
      },
      {
        label: "高级类型",
        cons: [],
      },
      {
        label: "容器类型",
        cons: [Subfield, Table, LabelPage, Card],
      },
      {
        label: "扩展类型",
        cons: props.extendCons,
      },
    ]);
    const ConsCollapseActiveNames = ref(Cons.map((_) => _.label));

    /** 当前激活的控件 */
    const activateCon = ref(null);
    /** 鼠标是否在控件内 */
    const mouseOn = ref(false);

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
        </el-scrollbar>
      </div>
    </div>
    <div class="c">
      <Right :cons="cons" :activateCon="activateCon" :formConfig="formConfig" />
    </div>
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
      > div:nth-child(1) {
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
          > .draggable-con {
            min-height: calc(var(--height) - 40px - 20px);
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
