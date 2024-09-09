<script>
import { defineComponent, ref } from "vue";
import DynamicForm from "@/components/dynamic-form/index.vue";
import { getFormConfig } from "@/components/dynamic-form/config/getFormConfig";

export default defineComponent({
  components: { DynamicForm },
  setup() {
    let cons = ref([]);
    let formConfig = ref(getFormConfig());
    return {
      cons,
      formConfig,
    };
  },
});
</script>

<template>
  <div class="home">
    <DynamicForm
      :cons="cons"
      :formConfig="formConfig"
      @update:cons="
        (v) => {
          cons = v;
        }
      "
      class="dynamic-form"
    />
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  > .dynamic-form {
    height: 100vh;
  }
}
</style>
