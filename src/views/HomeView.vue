<script lang="ts">
import { defineComponent, ref } from "vue";
import DynamicForm from "@/components/dynamic-form/index.vue";
import { getFormConfig } from "@/components/dynamic-form/config/getFormConfig";
import { Test } from "@/components/dynamic-form/controls";
import { NSpace, NTag } from "naive-ui";

export default defineComponent({
  components: { DynamicForm, NTag, NSpace },
  setup() {
    let cons = ref([]);
    let extendCons = ref([Test]);
    let formConfig = ref(getFormConfig());
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
    <div class="top">
      <NSpace
        ><h3>vue3-dynamic-form</h3>
        <NTag type="warning">开发中...</NTag></NSpace
      >
      <NSpace>
        <NTag type="success">vue3+ts+naive-ui</NTag>
        <a
          href="https://github.com/yayaluoya/vue3-dynamic-form"
          target="_blank"
        >
          <img
            style="
              height: 20px;
              width: 20px;
              border-radius: 50%;
              margin-right: 3px;
            "
            src="@/assets/apple-touch-icon-144x144-b882e354c005.png"
            alt=""
          />
          Github
        </a>
      </NSpace>
    </div>
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
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  > .top {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #f3f3f3;
  }
  > .dynamic-form {
    flex: 1 1 0;
    height: 0;
  }
}
</style>
