<script lang="jsx">
import { ref, reactive, defineComponent, watchEffect } from "vue";

export default defineComponent({
  components: {},
  props: {
    cons: {
      type: Array,
      required: true,
    },
    activateCon: {
      type: Object,
      default: null,
    },
    formConfig: {
      type: Object,
      required: true,
    },
  },
  setup(props, ctx) {
    const activeName = ref("con");
    watchEffect(() => {
      if (props.activateCon) {
        activeName.value = "con";
      } else {
        activeName.value = "form";
      }
    });
    return () => {
      const activateCon = props.activateCon;
      const formConfig = props.formConfig;
      return (
        <div class="right">
          <el-tabs
            model-value={activeName.value}
            onTabChange={(v) => {
              activeName.value = v;
            }}
          >
            {activateCon ? (
              <el-tab-pane label="组件设置" name="con"></el-tab-pane>
            ) : null}
            <el-tab-pane label="表单设置" name="form"></el-tab-pane>
          </el-tabs>
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <div class="content__">
              {activeName.value == "con"
                ? activateCon.renderRight({
                    ctx,
                  })
                : activeName.value == "form"
                ? null
                : null}
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
    }
  }
}
</style>
