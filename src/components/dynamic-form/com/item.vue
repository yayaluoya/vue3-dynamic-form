<script lang="jsx">
import { defineComponent } from "vue";
import { BaseCon } from "../controls/BaseCon";
import { getFormConfig } from "../config/getFormConfig";

export default defineComponent({
  components: {},
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
      default: () => [],
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
      /** @type {BaseCon} */
      let con = props.con;
      /** @type {boolean} */
      let drag = props.drag;
      let _ = [];
      if (drag) {
        _ = con.renderDrag({
          ctx,
          formConfig: props.formConfig,
          parent: props.parent,
          cons: props.cons,
          activateCon: con,
          formData: props.formData,
        });
      } else {
        _ = con.render({
          ctx,
          formConfig: props.formConfig,
          parent: props.parent,
          cons: props.cons,
          activateCon: props.activateCon,
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
    }
    > .drag-handler,
    > .con-name,
    > .handler-button {
      padding: 2px 3px;
      display: flex;
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
    > .con-name {
      top: 0;
      left: 0;
      background: #409eff;
      > span {
        font-size: 12px;
        font-style: normal;
        color: #fff;
      }
    }
    > .handler-button {
      padding: 3px 4px;
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
