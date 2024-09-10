<script>
import { defineComponent, ref } from "vue";
import DynamicForm from "@/components/dynamic-form/index.vue";
import { getFormConfig } from "@/components/dynamic-form/config/getFormConfig";
import { ConT } from "@/components/dynamic-form/ConT";
import { Button, Test } from "@/components/dynamic-form/controls";

export default defineComponent({
  components: { DynamicForm },
  setup() {
    let cons = ref([]);
    let extendCons = ref([Test]);
    let formConfig = ref(getFormConfig());
    console.log(
      ConT.toCons(JSON.parse(ConT.toConfigs([new Button(), new Test()])))
    );
    return {
      cons,
      formConfig,
      extendCons,
    };
  },
});
</script>

<template>
  <div class="home">
    <DynamicForm
      :cons="cons"
      :extendCons="extendCons"
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
