<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import DynamicForm from "@/components/dynamic-form/index.vue";
import { getFormConfig } from "@/components/dynamic-form/config/getFormConfig";
import { Test } from "@/components/dynamic-form/controls";
import {
  lightTheme,
  darkTheme,
  NButton,
  NTag,
  NCard,
  NConfigProvider,
  NFlex,
  NText,
  NRadioGroup,
  NRadioButton,
  NIcon,
  NThemeEditor,
} from "naive-ui";
import { LogoGithub } from "@vicons/ionicons5";

export default defineComponent({
  components: {
    DynamicForm,
    NTag,
    NButton,
    NCard,
    NConfigProvider,
    NFlex,
    NText,
    NRadioGroup,
    NRadioButton,
    NIcon,
    LogoGithub,
    NThemeEditor,
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
      <NCard
        size="small"
        style="border-radius: 0px; border-left: none; border-right: none"
      >
        <NFlex justify="space-between" align="center">
          <NFlex align="center"
            ><h3>vue3-dynamic-form</h3>
            <NRadioGroup v-model:value="theme" size="small">
              <NRadioButton label="深色主题" value="dark" />
              <NRadioButton label="浅色主题" value="light" />
            </NRadioGroup>
          </NFlex>
          <NFlex align="center">
            <NTag type="success">vue3+ts+naive-ui</NTag>
            <a href="https://vue3-dynamic-form-docs.dumogu.top/" target="_blank"
              ><NText>文档</NText></a
            >
            <a
              href="https://github.com/yayaluoya/vue3-dynamic-form"
              target="_blank"
            >
              <NFlex align="center" :size="[3, 0]">
                <NIcon :size="20">
                  <LogoGithub />
                </NIcon>
                <NText>Github</NText>
              </NFlex>
            </a>
          </NFlex>
        </NFlex>
      </NCard>
      <DynamicForm
        class="dynamic-form"
        :cons="cons"
        :extendCons="extendCons as any"
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
