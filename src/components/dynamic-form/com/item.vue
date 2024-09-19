<script lang="tsx">
import { defineComponent, type PropType } from "vue";
import type { TFormConfig } from "../config/getFormConfig";
import type { BaseCon } from "../controls";
import type { JSX } from "vue/jsx-runtime";

export default defineComponent({
  components: {},
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
      default: () => [],
    },
    con: {
      type: Object as PropType<BaseCon>,
      required: true,
    },
    formData: {
      type: Object as PropType<Record<string, any>>,
      default: undefined,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    formRender: {
      type: Boolean,
      default: false,
    },
    activateCon: {
      type: Object as PropType<BaseCon>,
      default: null,
    },
  },
  emits: ["activateConF", "removeF", "moveF"],
  setup(props, ctx) {
    return () => {
      let _: JSX.Element | undefined;
      if (props.drag) {
        _ = props.con.renderDrag({
          ctx,
          formConfig: props.formConfig,
          parent: props.parent,
          cons: props.cons,
          activateCon: props.con,
        });
      } else if (props.formRender) {
        _ = props.con.render({
          ctx,
          formConfig: props.formConfig,
          parent: props.parent,
          cons: props.cons,
          activateCon: props.con,
          formData: props.formData,
        });
      } else {
        _ = props.con.render({
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
