<script lang="ts">
import { defineComponent, type PropType } from "vue";
import Draggable from "vuedraggable";
import draggableC from "../config/draggableC";
import Item from "./item.vue";
import { BaseCon } from "../controls/BaseCon.jsx";
import { ArrayUtils } from "../tool/ArrayUtils";
import type { TFormConfig } from "../config/getFormConfig";

export default defineComponent({
  components: { Draggable, Item },
  props: {
    formConfig: {
      type: Object as PropType<TFormConfig>,
      required: true,
    },
    parent: {
      type: Object as PropType<BaseCon>,
      default: undefined,
    },
    cons: {
      type: Array as PropType<BaseCon[]>,
      required: true,
    },
    activateCon: {
      type: Object as PropType<BaseCon>,
      default: null,
    },
  },
  emits: ["update:activateCon", "update:cons"],
  setup(props, ctx) {
    function activateConChange(con: BaseCon | null) {
      ctx.emit("update:activateCon", con);
    }

    /** 拖拽改变 */
    function draggableChange(list: BaseCon[]) {
      ctx.emit("update:cons", [...list]);
    }

    /** 删除控件 */
    function removeF(con: BaseCon) {
      /** @type {BaseCon[]} */
      const list = [...props.cons];
      ArrayUtils.eliminate(list, (_) => _.key == con.key);
      ctx.emit("update:cons", list);
      if (props.activateCon?.key == con.key) {
        activateConChange(null);
      }
    }

    /** 移动控件 */
    function moveF(con: BaseCon, type: "up" | "down") {
      BaseCon.moveCon(props.cons, con, type);
      ctx.emit("update:cons", [...props.cons]);
    }

    return { draggableC, activateConChange, draggableChange, removeF, moveF };
  },
});
</script>

<template>
  <Draggable
    :class="draggableC.class"
    :group="draggableC.group"
    :modelValue="cons"
    @update:modelValue="draggableChange"
    @change="
      ({ added, removed, moved }: any) => {
        (added || moved) && activateConChange((added || moved).element);
      }
    "
    @start="
      ({ oldIndex }: any) => {
        activateConChange(cons[oldIndex]);
      }
    "
    :animation="draggableC.animation"
    item-key="renderKey"
    handle=".drag-handler"
  >
    <template #item="{ element: con }: { element: BaseCon }">
      <Item
        :key="con.key"
        :parent="parent"
        :data-key="con.key"
        :formConfig="formConfig"
        :cons="cons"
        :con="con"
        :activateCon="activateCon"
        @activateConF="
          (v: any) => {
            activateConChange(v);
          }
        "
        @removeF="removeF"
        @moveF="moveF"
      />
    </template>
  </Draggable>
</template>

<style lang="scss" scoped>
.dynamic-form-draggable {
  padding: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep > .draggable-item {
    > *:not(.draggable-show-item) {
      display: none;
    }
  }
}
</style>
