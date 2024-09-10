<script lang="jsx">
import { defineComponent } from "vue";
import { BaseCon } from "./controls/BaseCon";
import { getFormConfig } from "./config/getFormConfig";

export default defineComponent({
  components: {},
  props: {
    formConfig: {
      type: Object,
      required: true,
    },
    cons: {
      type: Array,
      required: true,
    },
    con: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
      default: undefined,
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
  emits: ["activateConF", "removeF", "moveF"],
  setup(props, ctx) {
    return () => {
      /** @type {ReturnType<getFormConfig>} */
      let formConfig = props.formConfig;
      /** @type {BaseCon[]} */
      let cons = props.con;
      /** @type {BaseCon} */
      let con = props.con;
      /** @type {boolean} */
      let drag = props.drag;
      /** @type {BaseCon} */
      let activateCon = props.activateCon;
      let _ = [];
      if (drag) {
        _ = con.renderDrag({
          ctx,
          formConfig,
          cons,
          activateCon: con,
          formData: props.formData,
        });
      } else {
        _ = con.renderCol({
          ctx,
          formConfig,
          cons,
          activateCon,
          formData: props.formData,
        });
      }
      return <div class="dynamic-form-item">{_}</div>;
    };
  },
});
</script>

<template>
  <div></div>
</template>

<style lang="scss">
.dynamic-form-item {
  .controller {
    position: relative;
    border: 2px solid transparent;
    &.on {
      border: 2px solid #1890ff;
      > .drag-handler,
      > .handler-button {
        display: flex !important;
      }
    }
    &:hover {
      background-color: #eff2f5;
    }
    > .drag-handler,
    > .handler-button {
      padding: 2px 3px;
      display: none;
      flex-direction: row;
      align-items: center;
      position: absolute;
      z-index: 2;
      > .el-icon {
        color: white;
        margin-right: 4px;
      }
      > *:nth-last-child(1) {
        margin-right: 0;
      }
    }
    > .drag-handler {
      top: 0;
      left: 0;
      background: rgba(64, 158, 255, 0.6);
      cursor: move;
      &:hover {
        background: #409eff;
      }
      > span {
        font-size: 12px;
        font-style: normal;
        color: #fff;
      }
    }
    > .handler-button {
      bottom: 0;
      right: 0;
      cursor: pointer;
      background: #409eff;
    }
    > .form-item {
      position: relative;
      z-index: 1;
    }
  }
}
</style>
