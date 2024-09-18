<script lang="tsx">
import {
  ref,
  reactive,
  defineComponent,
  watchEffect,
  type PropType,
} from "vue";
import type { BaseCon } from "../controls";
import type { IFormConfig } from "../config/getFormConfig";

export default defineComponent({
  components: {},
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
      type: Object as PropType<IFormConfig>,
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
        conCollapseActiveNames.value = props.activateCon
          .getRight(
            {
              ctx,
              formConfig: props.formConfig,
              cons: props.cons,
            },
            false
          )
          .map((_) => _.title);
      } else {
        tabsActiveName.value = "form";
      }
    });
    return () => {
      const activateCon = props.activateCon;
      const formConfig = props.formConfig;
      return (
        <div class="right">
          <el-tabs
            model-value={tabsActiveName.value}
            onTabChange={(v: any) => {
              tabsActiveName.value = v;
            }}
          >
            {activateCon ? (
              <el-tab-pane label="组件设置" name="con"></el-tab-pane>
            ) : null}
            <el-tab-pane label="表单设置" name="form"></el-tab-pane>
          </el-tabs>
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <div class="content__">
              <el-form label-width="120px" label-position="left">
                {tabsActiveName.value == "con" ? (
                  <el-collapse
                    model-value={conCollapseActiveNames.value}
                    onChange={(v: any) => {
                      conCollapseActiveNames.value = v;
                    }}
                  >
                    {activateCon.renderRight({
                      ctx,
                      formConfig,
                      cons: props.cons,
                    })}
                  </el-collapse>
                ) : tabsActiveName.value == "form" ? (
                  <el-collapse
                    model-value={formCollapseActiveNames.value}
                    onChange={(v: any) => {
                      formCollapseActiveNames.value = v;
                    }}
                  >
                    <el-collapse-item title="基本属性" name="1">
                      <el-form-item label="全局组件大小">
                        <el-select
                          model-value={formConfig.size}
                          size="small"
                          onChange={(v: any) => {
                            formConfig.size = v;
                          }}
                          placeholder="请选择"
                          clearable
                        >
                          <el-option label="large" value="large" />
                          <el-option label="default" value="default" />
                          <el-option label="small" value="small" />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="标签位置">
                        <el-radio-group
                          size="small"
                          model-value={formConfig.labelPosition}
                          onChange={(v: any) => {
                            formConfig.labelPosition = v;
                          }}
                        >
                          <el-radio-button label="left" value="left" />
                          <el-radio-button label="top" value="top" />
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="字段标签对齐" label-position="top">
                        <el-radio-group
                          size="small"
                          model-value={formConfig.labelAlign}
                          onChange={(v: any) => {
                            formConfig.labelAlign = v;
                          }}
                        >
                          <el-radio-button label="left" value="left" />
                          <el-radio-button label="center" value="center" />
                          <el-radio-button label="right" value="right" />
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="标签宽度">
                        <el-input-number
                          size="small"
                          model-value={formConfig.labelWidth}
                          onChange={(v: any) => {
                            formConfig.labelWidth = v;
                          }}
                        />
                      </el-form-item>
                      <el-form-item label="标签后缀">
                        <el-input
                          size="small"
                          model-value={formConfig.labelsuffix}
                          onInput={(v: any) => {
                            formConfig.labelsuffix = v;
                          }}
                          clearable
                        />
                      </el-form-item>
                      <el-form-item label="必填星号位置">
                        <el-radio-group
                          size="small"
                          model-value={formConfig.requireAsteriskPosition}
                          onChange={(v: any) => {
                            formConfig.requireAsteriskPosition = v;
                          }}
                        >
                          <el-radio-button label="left" value="left" />
                          <el-radio-button label="right" value="right" />
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="隐藏必填星号">
                        <el-switch
                          size="small"
                          model-value={formConfig.hideRequiredAsterisk}
                          onChange={(v: any) => {
                            formConfig.hideRequiredAsterisk = v;
                          }}
                        ></el-switch>
                      </el-form-item>
                      <el-form-item label="显示校验错误信息">
                        <el-switch
                          size="small"
                          model-value={formConfig.showMessage}
                          onChange={(v: any) => {
                            formConfig.showMessage = v;
                          }}
                        ></el-switch>
                      </el-form-item>
                      <el-form-item label="行内显示校验信息">
                        <el-switch
                          size="small"
                          model-value={formConfig.inlineMessage}
                          onChange={(v: any) => {
                            formConfig.inlineMessage = v;
                          }}
                        ></el-switch>
                      </el-form-item>
                    </el-collapse-item>
                  </el-collapse>
                ) : null}
              </el-form>
            </div>
          </el-scrollbar>
        </div>
      );
    };
  },
});
</script>

<style scoped lang="scss">
.right {
  width: 100%;
  display: flex;
  flex-direction: column;
  > .el-tabs {
    width: 100%;
    ::v-deep .el-tabs__header {
      margin-bottom: 0;
    }
    ::v-deep .el-tabs__nav-scroll {
      padding: 0 10px;
    }
  }
  > .el-scrollbar {
    height: calc(var(--height) - 40px);
    .content__ {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;

      ::v-deep .el-form-item__label {
        font-size: 13px;
      }
      ::v-deep .el-collapse-item__content {
        padding-bottom: 5px;
      }
      ::v-deep .el-form-item {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
