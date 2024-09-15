<script>
import { defineComponent, ref } from "vue";
import Item from "./com/item.vue";

export default defineComponent({
  components: { Item },
  props: {
    cons: {
      type: Array,
      required: true,
    },
    formConfig: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
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
  <div class="dynamic-form-preview">
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
        preview
      />
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-form-preview {
  width: 100%;
}
</style>
