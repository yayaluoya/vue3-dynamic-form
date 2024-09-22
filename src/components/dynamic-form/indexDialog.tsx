import { NButton, NScrollbar, useDialog, useMessage } from "naive-ui";
import { defineComponent, reactive, ref } from "vue";
import Render from "./render.vue";
import CodeEditInput from "./com/codeEditInput.vue";
import { Clipboard } from "./tool/web/Clipboard";
import { FileT } from "./tool/web/FileT";
import type { TFormConfig } from "./config/getFormConfig";
import type { BaseCon } from "./controls";

export interface IRenderOp {
  cons?: BaseCon[];
  formData?: Record<string, any>;
  formConfig?: TFormConfig;
}

export interface IJSONH {
  type: "" | "import" | "export" | "getFromData";
  title: string;
  jsonText: string;
}

export default defineComponent({
  emits: ["close"],
  setup(ctx, props) {
    const dialog = useDialog();
    const message = useMessage();
    const renderEl = ref<InstanceType<typeof Render>>();

    function copy(str: string) {
      Clipboard.set(str)
        .then(() => {
          message.success("已复到剪切板");
        })
        .catch((e: Error) => {
          message.error(e.toString());
        });
    }

    function saveToFile(str: string, type: string) {
      FileT.download(
        URL.createObjectURL(new Blob([str])),
        `vue3-dynamic-form-${type}.json`
      );
    }

    function preview(op: IRenderOp) {
      let d = dialog.success({
        showIcon: false,
        style: `width: 1000px;`,
        title: "表单预览",
        content: () => {
          return (
            <NScrollbar
              style="max-height: 700px"
              wrap-class="scrollbar-wrapper"
            >
              <Render
                ref={(v: any) => {
                  renderEl.value = v;
                }}
                cons={op.cons as any}
                formConfig={op.formConfig!}
                formData={op.formData!}
              />
            </NScrollbar>
          );
        },
        action: () => {
          return (
            <NButton
              type="primary"
              onClick={() => {
                renderEl.value!.validate().then(() => {
                  let op_: IJSONH = reactive({
                    type: "getFromData",
                    title: "表单数据",
                    jsonText: JSON.stringify(op.formData, undefined, 2),
                  });
                  importExport(op_);
                });
              }}
            >
              获取表单数据
            </NButton>
          );
        },
      });
    }

    function importExport(
      op: IJSONH,
      importJSONH?: (jsonText: string) => void
    ) {
      let d = dialog.success({
        showIcon: false,
        style: `width: 800px;`,
        title: op.title,
        content: () => {
          return (
            <CodeEditInput
              value={op.jsonText}
              onUpdate:value={(v) => {
                op.jsonText = v;
              }}
              options={{
                lang: "json",
              }}
            />
          );
        },
        action: () => {
          return op.type == "import" ? (
            <NButton
              type="primary"
              onClick={() => {
                try {
                  importJSONH?.(op.jsonText);
                  message.success("导入成功");
                  d.destroy();
                } catch (e: any) {
                  message.error(e.toString());
                }
              }}
            >
              导入
            </NButton>
          ) : op.type == "export" || op.type == "getFromData" ? (
            <>
              <NButton
                type="primary"
                onClick={() => {
                  copy(op.jsonText);
                }}
              >
                复制
              </NButton>
              <NButton
                type="primary"
                onClick={() => {
                  saveToFile(op.jsonText, op.type);
                }}
              >
                保存为文件 ({(op.jsonText.length / 1024).toFixed(2)}kb)
              </NButton>
            </>
          ) : undefined;
        },
      });
    }

    return { preview, importExport };
  },
  render() {
    return <div></div>;
  },
});
