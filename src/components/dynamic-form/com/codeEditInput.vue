<script lang="ts">
/**
 * 代码编辑器
 *  */
import { VAceEditor } from "vue3-ace-editor";
// import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-github_light_default";
// import 'ace-builds/src-noconflict/ext-language_tools';
import { defineComponent, ref, reactive, toRef, computed } from "vue";
import { className } from "./style/__code-edit-input.cssr";
import { useThemeVars } from "naive-ui";
import Color from "color";

export default defineComponent({
  name: "CodeEditInput",
  components: {
    VAceEditor,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const themeVars = useThemeVars();
    const editorRef = ref(null); // 用于保存 Ace 编辑器实例
    const dataContainer = reactive({
      options: {
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2,
        showPrintMargin: false,
        fontSize: 12,
        maxLines: 40,
        wrap: false,
        autoScrollEditorIntoView: true,
      },
      readonly: toRef(props, "readonly"),
      options_1: toRef(props, "options"),
    });
    const theme = computed(() => {
      let c = Color(themeVars.value.baseColor);
      if (c.isDark()) {
        return "github_dark";
      } else if (c.isLight()) {
        return "github_light_default";
      } else {
        return "github";
      }
    });
    const value = computed({
      get() {
        return props.value;
      },
      set(value_) {
        emit("update:value", value_);
      },
    });
    return {
      className,
      dataContainer,
      value,
      editorRef,
      theme,
    };
  },
});
</script>

<template>
  <VAceEditor
    ref="editorRef"
    :class="className"
    v-model:value="value"
    :lang="dataContainer.options_1.lang"
    :theme="theme"
    :options="{
      ...dataContainer.options,
      ...dataContainer.options_1,
    }"
    :readonly="dataContainer.readonly"
  />
</template>
