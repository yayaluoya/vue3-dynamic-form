<script>
import { defineComponent, h } from "vue";
import { BaseCon } from "./controls/BaseCon";
import { getFormConfig } from "./config/getFormConfig";

export default defineComponent({
  components: {},
  props: {
    formConfig: {
      type: Object,
      required: true,
    },
    con: {
      type: Object,
      required: true,
    },
    /** 是否是拖拽时显示 */
    drag: {
      type: Boolean,
      default: false,
    },
    activateCon: {
      type: Object,
      default: null,
    },
  },
  emits: ["activateConF", "removeF"],
  setup(props, ctx) {
    /** @type {ReturnType<getFormConfig>} */
    let formConfig = props.formConfig;
    /** @type {BaseCon} */
    let con = props.con;
    /** @type {boolean} */
    let drag = props.drag;
    /** @type {BaseCon} */
    let activateCon = props.activateCon;
    return () => {
      if (drag) {
        return con.renderDrag(h, { ctx, formConfig });
      } else {
        return con.renderCol(h, { ctx, formConfig });
      }
    };
  },
});
</script>

<template>
  <div></div>
</template>

<style scoped lang="scss"></style>
