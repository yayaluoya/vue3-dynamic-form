<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import DynamicForm from "@/components/dynamic-form/index.vue";
import { getFormConfig } from "@/components/dynamic-form/config/getFormConfig";
import { Test } from "@/components/dynamic-form/controls";
import {
  lightTheme,
  darkTheme,
  NButton,
  NSpace,
  NTag,
  NCard,
  NConfigProvider,
  NFlex,
  NText,
  NRadioGroup,
  NRadioButton,
} from "naive-ui";

export default defineComponent({
  components: {
    DynamicForm,
    NTag,
    NSpace,
    NButton,
    NCard,
    NConfigProvider,
    NFlex,
    NText,
    NRadioGroup,
    NRadioButton,
  },
  setup() {
    let cons = ref([]);
    let extendCons = ref([Test]);
    let formConfig = ref(getFormConfig());
    let theme = ref<"light" | "dark">("light");
    return {
      cons,
      formConfig,
      extendCons,
      theme,
      lightTheme,
      darkTheme,
    };
  },
});
</script>

<template>
  <NConfigProvider
    :theme="
      {
        light: lightTheme,
        dark: darkTheme,
      }[theme]
    "
  >
    <div class="home">
      <NCard size="small">
        <NFlex justify="space-between" align="center">
          <NFlex align="center"
            ><h3>vue3-dynamic-form</h3>
            <NRadioGroup v-model:value="theme" size="small">
              <NRadioButton label="深色" value="dark" />
              <NRadioButton label="浅色" value="light" />
            </NRadioGroup>
            <NTag type="warning">开发中...</NTag></NFlex
          >
          <NFlex align="center">
            <NTag type="success">vue3+ts+naive-ui</NTag>
            <a
              href="https://github.com/yayaluoya/vue3-dynamic-form"
              target="_blank"
            >
              <NFlex>
                <img
                  style="height: 20px; width: 20px; border-radius: 50%"
                  src="@/assets/apple-touch-icon-144x144-b882e354c005.png"
                  alt=""
                />
                <NText>Github</NText>
              </NFlex>
            </a>
          </NFlex>
        </NFlex>
      </NCard>
      <DynamicForm
        class="dynamic-form"
        :cons="cons"
        :extendCons="extendCons"
        :formConfig="formConfig"
        @update:cons="
          (v) => {
            cons = v;
          }
        "
      />
    </div>
  </NConfigProvider>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  > .dynamic-form {
    flex: 1 1 0;
    height: 0;
  }
}
</style>
