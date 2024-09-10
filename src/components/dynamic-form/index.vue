<script>
import { ref, reactive, defineComponent, onMounted, onUnmounted } from "vue";
import Draggable from "vuedraggable";
import draggableC from "./config/draggableC";
import { DocumentCopy } from "@element-plus/icons-vue";
import Right from "./right/index.vue";
import Item from "./item.vue";
import { WindowSizeChangeE } from "./tool/web/event/WindowSizeChangeE";
import { Button, Test } from "./controls";
import { BaseCon } from "./controls/BaseCon.jsx";
import { ArrayUtils } from "./tool/ArrayUtils";

export default defineComponent({
  components: { Draggable, Item, Right, DocumentCopy },
  props: {
    cons: {
      type: Array,
      required: true,
    },
    formConfig: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:cons"],
  setup(props, ctx) {
    const contentElRef = ref();
    const bScrollbarRef = ref();
    /** 拖拽中 */
    const draggableLoading = ref(false);
    /** 控件列表 */
    const Cons = reactive([
      {
        launch: true,
        label: "基础类型",
        cons: [Button],
      },
      {
        launch: true,
        label: "其它类型",
        cons: [Test],
      },
    ]);

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

    /** 删除控件 */
    function removeF(con) {
      /** @type {BaseCon[]} */
      const list = [...props.cons];
      ArrayUtils.eliminate(list, (_) => _.key == con.key);
      list.forEach((_) => {
        _.removeChild(con);
      });
      ctx.emit("update:cons", list);
      if (activateCon.value?.key == con.key) {
        activateCon.value = null;
      }
    }

    /** 移动控件 */
    function moveF(con, type) {
      BaseCon.moveCon(props.cons, con, type);
      ctx.emit("update:cons", [...props.cons]);
    }

    /** 克隆组件 */
    function cloneComponent(Con) {
      return new Con();
    }

    /** 拖拽改变 */
    function draggableChange(list) {
      ctx.emit("update:cons", [...list]);
    }

    function getContentHeight() {
      let contentHeight = contentElRef.value.getBoundingClientRect().height;
      let el = contentElRef.value.querySelector(".dynamic-form-draggable");
      el.style.setProperty("min-height", `${contentHeight - 11}px`);
    }
    onMounted(() => {
      getContentHeight();
      WindowSizeChangeE.instance.on("resize", ctx, getContentHeight);
    });
    onUnmounted(() => {
      WindowSizeChangeE.instance.off("resize", ctx);
    });

    return {
      contentElRef,
      bScrollbarRef,
      draggableLoading,
      draggableC,
      Cons,
      cloneComponent,
      draggableChange,
      activateCon,
      removeF,
      moveF,
      mouseOn,
    };
  },
});
</script>

<template>
  <div class="dynamic-form">
    <div class="a">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <div class="content__">
          <template v-for="(item, index) in Cons" :key="index">
            <div class="tab" @click="item.launch = !item.launch">
              <span>{{ item.label }}</span>
            </div>
            <div
              class="list"
              :class="{
                hide: !item.launch,
              }"
            >
              <Draggable
                :class="draggableC.class"
                :list="item.cons"
                :group="{ name: draggableC.group, pull: 'clone', put: false }"
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
                      <Item
                        drag
                        :formConfig="formConfig"
                        :cons="cons"
                        :con="Con.I"
                      />
                    </div>
                  </div>
                </template>
              </Draggable>
            </div>
          </template>
        </div>
      </el-scrollbar>
    </div>
    <div class="b">
      <div
        class="content"
        ref="contentElRef"
        @mouseover="mouseOn = true"
        @mouseleave="mouseOn = false"
      >
        <span class="null" v-if="cons.length <= 0">拖到这里来</span>
        <el-scrollbar wrap-class="scrollbar-wrapper" ref="bScrollbarRef">
          <div class="content__">
            <Draggable
              :class="draggableC.class"
              :group="draggableC.group"
              :modelValue="cons"
              @update:modelValue="draggableChange"
              @change="
                ({ added, removed, moved }) => {
                  (added || moved) && (activateCon = (added || moved).element);
                }
              "
              @start="
                ({ oldIndex }) => {
                  activateCon = cons[oldIndex];
                }
              "
              :animation="draggableC.animation"
              item-key="renderKey"
              handle=".drag-handler"
            >
              <template #item="{ element: con }">
                <Item
                  :formConfig="formConfig"
                  :cons="cons"
                  :con="con"
                  :activateCon="activateCon"
                  @activateConF="
                    (v) => {
                      activateCon = v;
                    }
                  "
                  @removeF="removeF"
                  @moveF="moveF"
                />
              </template>
            </Draggable>
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
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 10px;

  > .a,
  > .b,
  > .c {
    box-sizing: border-box;
    background: #ffffff;
  }

  > .a {
    width: 260px;
    box-sizing: border-box;
    display: flex;
    margin-right: 10px;
    > .el-scrollbar {
      width: 100%;
      .content__ {
        display: flex;
        flex-direction: column;
        > .tab {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;
          cursor: pointer;
          > span {
            font-family: "Source Han Sans CN";
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 20px;
            /* identical to box height */
            color: #818194;
          }
        }
        > .list {
          margin-bottom: 12px;
          &.hide {
            display: none !important;
          }
          > .dynamic-form-draggable {
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
        > .list:nth-last-child(1) {
          margin-bottom: 0px;
        }
      }
    }
  }
  > .b {
    width: 0;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    > .content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      flex: 1 1 0;
      border: 1px dashed rgb(122 122 134 / 50%);
      position: relative;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      > .null {
        position: absolute;
        color: gray;
        font-size: 16px;
        pointer-events: none;
      }
      > .el-scrollbar {
        width: 100%;
        .content__ {
          width: 100%;
          box-sizing: border-box;
          padding: 5px;
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          > .dynamic-form-draggable {
            width: 100%;
            display: flex;
            flex-direction: column;
            ::v-deep > .draggable-item {
              > *:not(.draggable-show-item) {
                display: none;
              }
            }
          }
        }
      }
    }
  }
  > .c {
    margin-left: 10px;
    width: 280px;
    box-sizing: border-box;
    display: flex;
  }
}
</style>
