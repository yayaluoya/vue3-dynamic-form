<script lang="jsx">
import { ref, reactive, defineComponent } from "vue";

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
    return () => {
      return (
        <div class="right">
          <el-tabs
            model-value={activeName.value}
            onTabChange={(v) => {
              activeName.value = v;
            }}
          >
            <el-tab-pane label="组件设置" name="con"></el-tab-pane>
            <el-tab-pane label="表单设置" name="form"></el-tab-pane>
          </el-tabs>
          <el-scrollbar wrap-class="scrollbar-wrapper"></el-scrollbar>
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
  }
  > .el-scrollbar {
    height: calc(var(--height) - 40px);
  }
}
</style>
