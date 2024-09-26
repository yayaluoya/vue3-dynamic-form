<script lang="tsx">
import {
  ref,
  reactive,
  defineComponent,
  watchEffect,
  type PropType,
} from "vue";
import type { BaseCon } from "../controls";
import type { TFormConfig } from "../config/getFormConfig";
import {
  NTabs,
  NTabPane,
  NForm,
  NFormItem,
  NCollapse,
  NCollapseItem,
  NSwitch,
  NInput,
  NRadioGroup,
  NRadioButton,
  NSelect,
  NScrollbar,
} from "naive-ui";

export default defineComponent({
  components: { NTabs, NTabPane },
  props: {
    cons: {
      type: Array as PropType<BaseCon[]>,
      required: true,
    },
    activateCon: {
      type: Object as PropType<BaseCon>,
      default: null,
    },
    formConfig: {
      type: Object as PropType<TFormConfig>,
      required: true,
    },
  },
  setup(props, ctx) {
    const tabsActiveName = ref<"con" | "form">("con");
    const formCollapseActiveNames = ref<string[]>(["1"]);
    const conCollapseActiveNames = ref<string[]>([]);
    watchEffect(() => {
      if (props.activateCon) {
        tabsActiveName.value = "con";
        conCollapseActiveNames.value =
          props.activateCon.getRightDefaultExpanded();
      } else {
        tabsActiveName.value = "form";
      }
    });
    return () => {
      const activateCon = props.activateCon;
      const formConfig = props.formConfig;
      return (
        <div class="right" style="width: 100%">
          <NTabs
            v-model:value={tabsActiveName.value}
            type="line"
            tabs-padding={10}
            pane-wrapper-style="padding: 0 10px"
            animated
          >
            <NTabPane tab="组件设置" name="con" disabled={!activateCon}>
              <NScrollbar style="max-height: calc(var(--height) - 60px);">
                <NForm
                  label-width="100px"
                  label-placement="left"
                  labelAlign="left"
                  size="small"
                >
                  <NCollapse
                    v-model:expanded-names={conCollapseActiveNames.value}
                  >
                    {activateCon?.renderRight({
                      ctx,
                      formConfig,
                      cons: props.cons,
                    })}
                  </NCollapse>
                </NForm>
              </NScrollbar>
            </NTabPane>
            <NTabPane tab="表单设置" name="form">
              <NScrollbar style="max-height: calc(var(--height) - 60px);">
                <NForm
                  label-width="100px"
                  label-placement="left"
                  labelAlign="left"
                  size="small"
                >
                  <NCollapse
                    v-model:expanded-names={formCollapseActiveNames.value}
                  >
                    <NCollapseItem title="基本属性" name="1">
                      <NFormItem label="标签宽度">
                        <NInput v-model:value={formConfig.labelWidth} />
                      </NFormItem>
                      <NFormItem label="标签文本对齐方式">
                        <NSelect
                          v-model:value={formConfig.labelAlign}
                          placeholder="请选择"
                          options={[
                            { label: "left", value: "left" },
                            { label: "center", value: "center" },
                            { label: "right", value: "right" },
                          ]}
                        />
                      </NFormItem>
                      <NFormItem label="标签位置">
                        <NSelect
                          v-model:value={formConfig.labelPlacement}
                          placeholder="请选择"
                          options={[
                            { label: "left", value: "left" },
                            { label: "top", value: "top" },
                          ]}
                        />
                      </NFormItem>
                      <NFormItem label="展示标签">
                        <NSwitch v-model:value={formConfig.showLabel} />
                      </NFormItem>
                      <NFormItem label="展示必填星号">
                        <NSwitch v-model:value={formConfig.showRequireMark} />
                      </NFormItem>
                      <NFormItem label="必填星号位置">
                        <NSelect
                          v-model:value={formConfig.requireMarkPlacement}
                          placeholder="请选择"
                          options={[
                            { label: "left", value: "left" },
                            { label: "right", value: "right" },
                            { label: "right-hanging", value: "right-hanging" },
                          ]}
                        />
                      </NFormItem>
                      <NFormItem label="展示校验反馈">
                        <NSwitch v-model:value={formConfig.showFeedback} />
                      </NFormItem>
                      <NFormItem label="尺寸">
                        <NSelect
                          v-model:value={formConfig.size}
                          placeholder="请选择"
                          options={[
                            { label: "large", value: "large" },
                            { label: "medium", value: "medium" },
                            { label: "small", value: "small" },
                          ]}
                        />
                      </NFormItem>
                    </NCollapseItem>
                  </NCollapse>
                </NForm>
              </NScrollbar>
            </NTabPane>
          </NTabs>
        </div>
      );
    };
  },
});
</script>
