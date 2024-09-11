<script>
import { defineComponent } from "vue";
import Draggable from "vuedraggable";
import draggableC from "../config/draggableC";
import Item from "./item.vue";
import { BaseCon } from "../controls/BaseCon.jsx";
import { ArrayUtils } from "../tool/ArrayUtils";

export default defineComponent({
  components: { Draggable, Item },
  props: {
    formConfig: {
      type: Object,
      required: true,
    },
    parent: {
      type: Object,
      default: undefined,
    },
    cons: {
      type: Array,
      required: true,
    },
    activateCon: {
      type: Object,
      default: null,
    },
  },
  emits: ["update:activateCon", "update:cons"],
  setup(props, ctx) {
    function activateConChange(con) {
      ctx.emit("update:activateCon", con);
    }

    /** 拖拽改变 */
    function draggableChange(list) {
      ctx.emit("update:cons", [...list]);
    }

    /** 删除控件 */
    function removeF(con) {
      /** @type {BaseCon[]} */
      const list = [...props.cons];
      ArrayUtils.eliminate(list, (_) => _.key == con.key);
      ctx.emit("update:cons", list);
      if (props.activateCon?.key == con.key) {
        activateConChange(null);
      }
    }

    /** 移动控件 */
    function moveF(con, type) {
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
      ({ added, removed, moved }) => {
        (added || moved) && activateConChange((added || moved).element);
      }
    "
    @start="
      ({ oldIndex }) => {
        activateConChange(cons[oldIndex]);
      }
    "
    :animation="draggableC.animation"
    item-key="renderKey"
    handle=".drag-handler"
  >
    <template #item="{ element: con }">
      <Item
        :key="con.key"
        :parent="parent"
        :data-key="con.key"
        :formConfig="formConfig"
        :cons="cons"
        :con="con"
        :activateCon="activateCon"
        @activateConF="
          (v) => {
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
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep > .draggable-item {
    > *:not(.draggable-show-item) {
      display: none;
    }
  }
}
</style>
