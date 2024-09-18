<script lang="ts">
import { defineComponent, ref, type PropType } from "vue";
import Item from "./com/item.vue";
import type { BaseCon } from "./controls";
import type { IFormConfig } from "./config/getFormConfig";

export default defineComponent({
  components: { Item },
  props: {
    cons: {
      type: Array as PropType<BaseCon[]>,
      required: true,
    },
    formConfig: {
      type: Object as PropType<IFormConfig>,
      required: true,
    },
    formData: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
  },
  emits: [],
  setup(props, ctx) {
    const formEl = ref();

    /** 验证表单 */
    function validate() {
      return formEl.value.validate(...arguments);
    }

    /** 清理某个字段的表单验证信息。 */
    function clearValidate() {
      return formEl.value.clearValidate(...arguments);
    }
    return { formEl, validate, clearValidate };
  },
});
</script>

<template>
  <div class="dynamic-form-render">
    <el-form
      ref="formEl"
      :model="formData"
      :inline="formConfig.inline"
      :label-position="formConfig.labelPosition"
      :label-width="formConfig.labelWidth"
      :label-suffix="formConfig.labelsuffix"
      :hide-required-asterisk="formConfig.hideRequiredAsterisk"
      :require-asterisk-position="formConfig.requireAsteriskPosition"
      :show-message="formConfig.showMessage"
      :inline-message="formConfig.inlineMessage"
      :status-icon="formConfig.statusIcon"
      :size="formConfig.size"
      :disabled="formConfig.disabled"
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
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-form-render {
  width: 100%;
}
</style>
