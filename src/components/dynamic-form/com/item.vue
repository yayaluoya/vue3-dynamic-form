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
    /** 是否在预览时显示 */
    preview: {
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
      let _ = [];
      if (props.drag) {
        _ = con.renderDrag({
          ctx,
          formConfig: props.formConfig,
          parent: props.parent,
          cons: props.cons,
          activateCon: con,
        });
      } else if (props.preview) {
        _ = con.render({
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
        });
      }
      return _;
    };
  },
});
</script>
