<script lang="tsx">
import { defineComponent, onMounted, reactive, ref } from "vue";
import Render from "./render.vue";
import { NButton, useDialog } from "naive-ui";
import type { PropType } from "vue";
import type { BaseCon } from "./controls";
import type { TFormConfig } from "./config/getFormConfig";

export default defineComponent({
  components: { Render, NButton },
  props: {
    config: {
      type: String,
      required: true,
    },
    cons: {
      type: Array as PropType<BaseCon[]>,
      required: true,
    },
    formConfig: {
      type: Object as PropType<TFormConfig>,
      required: true,
    },
    formData: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
    useTemplate: Function,
  },
  emits: [],
  setup(props, ctx) {
    const dialog = useDialog();
    const elRef = ref<HTMLDivElement>();
    const renderTransform = reactive({
      scale: 1,
      pwidth: 0,
      pheight: 0,
      x: 0,
      y: 0,
    });
    function useTemplate(str: string) {
      let d = dialog.success({
        showIcon: false,
        style: `width: 1000px;`,
        title: "导入模板",
        content: () => {
          const Render_ = Render as any;
          return (
            <Render_
              style="pointer-events: none"
              cons={props.cons}
              form-config={props.formConfig}
              form-data={props.formData}
            />
          );
        },
        action: () => {
          return (
            <NButton
              type="primary"
              onClick={() => {
                props.useTemplate?.(str);
                d.destroy();
              }}
            >
              确定使用此模板
            </NButton>
          );
        },
      });
    }

    onMounted(() => {
      let el = elRef.value!;
      let renderEl = el.firstElementChild!.firstElementChild!;
      renderTransform.pwidth = el.getBoundingClientRect().width;
      renderTransform.scale = renderTransform.pwidth / 500;
      let renderR = renderEl.getBoundingClientRect();
      renderTransform.pheight = renderR.height * renderTransform.scale;
      renderTransform.x =
        (-renderR.width * (1 - renderTransform.scale)) /
        2 /
        renderTransform.scale;
      renderTransform.y =
        (-renderR.height * (1 - renderTransform.scale)) /
        2 /
        renderTransform.scale;
    });

    return {
      useTemplate,
      elRef,
      renderTransform,
    };
  },
});
</script>

<template>
  <div ref="elRef">
    <div
      :style="`width: ${renderTransform.pwidth}px;height: ${renderTransform.pheight}px`"
    >
      <Render
        :style="`width: 500px; pointer-events: none;transform: scale(${renderTransform.scale}) translate(${renderTransform.x}px, ${renderTransform.y}px);`"
        :cons="cons"
        :form-config="formConfig"
        :form-data="formData"
      />
    </div>
    <NButton type="primary" @click="useTemplate(config)" block
      >使用此模板</NButton
    >
  </div>
</template>
