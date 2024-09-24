<script lang="ts">
import { defineComponent, ref, type PropType } from "vue";
import Item from "./com/item.vue";
import type { BaseCon } from "./controls";
import type { TFormConfig } from "./config/getFormConfig";
import { NForm, NFormItem, useThemeVars } from "naive-ui";

interface ValidateError {
  message?: string;
  fieldValue?: any;
  field?: string;
}

export default defineComponent({
  components: { Item, NForm, NFormItem },
  props: {
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
  },
  emits: [],
  setup(props, ctx) {
    const formEl = ref<InstanceType<typeof NForm>>();
    const themeVars = useThemeVars();

    /** 验证表单 */
    function validate() {
      return formEl.value?.validate().catch((e: ValidateError[][]) => {
        throw e;
      })!;
    }

    function restoreValidation() {
      return formEl.value?.restoreValidation();
    }
    return { formEl, themeVars, validate, restoreValidation };
  },
});
</script>

<template>
  <div
    class="dynamic-form-render"
    :style="`
    --primaryColor: ${themeVars.primaryColor};
    --primaryColorHover: ${themeVars.primaryColorHover};
    --borderColor: ${themeVars.borderColor};
    --baseColor: ${themeVars.baseColor};
    --dividerColor: ${themeVars.dividerColor};
    --textColor1: ${themeVars.textColor1};
    --textColor2: ${themeVars.textColor2};
    --textColor3: ${themeVars.textColor3};
    `"
  >
    <NForm
      ref="formEl"
      style="padding: 5px"
      :model="formData"
      :inline="formConfig.inline"
      :label-width="formConfig.labelWidth"
      :label-align="formConfig.labelAlign"
      :label-placement="formConfig.labelPlacement"
      :show-feedback="formConfig.showFeedback"
      :show-label="formConfig.showLabel"
      :show-require-mark="formConfig.showRequireMark"
      :require-mark-placement="formConfig.requireMarkPlacement"
      :size="formConfig.size"
    >
      <Item
        v-for="con in cons"
        :key="con.key"
        :formConfig="formConfig"
        :formData="formData"
        :cons="cons"
        :con="con"
        formRender
      />
    </NForm>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-form-render {
  width: 100%;
}
</style>
