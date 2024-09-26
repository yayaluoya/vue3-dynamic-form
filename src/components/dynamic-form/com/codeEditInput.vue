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
import "ace-builds/src-noconflict/theme-github_light_default";
// import 'ace-builds/src-noconflict/ext-language_tools';
import { defineComponent, ref, reactive, toRef, computed } from "vue";
import { className } from "./style/__code-edit-input.cssr";

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
    const value = computed({
      get() {
        return props.value;
      },
      set(value_) {
        emit("update:value", value_);
      },
    });
    // watch(value, (newCode) => {
    //     if (!editorRef.value) return;
    //     let instance = editorRef.value.getAceInstance();
    //     if(!instance || !instance.resize) return;
    //     instance.resize();
    // });
    return {
      className,
      dataContainer,
      value,
      editorRef,
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
    :theme="dataContainer.options_1.theme || 'github_light_default'"
    :options="{
      ...dataContainer.options,
      ...dataContainer.options_1,
    }"
    :readonly="dataContainer.readonly"
  />
</template>
