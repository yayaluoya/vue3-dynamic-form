<script>
import { defineComponent, ref } from "vue";
import {
  vue3EditableForm,
  vue3EditableFormRender,
  getFormConfig,
  ConT,
  Button,
  Test,
} from "vue3-editable-form-builds/index.umd";

export default defineComponent({
  components: { vue3EditableForm },
  setup() {
    let cons = ref([]);
    let extendCons = ref([Test]);
    let formConfig = ref(getFormConfig());
    console.log(
      "转换",
      ConT.toCons(ConT.toConfigs([new Button(), new Test()]))
    );
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
      <h1>vue3-dynamic-form <el-tag type="warning">开发中...</el-tag></h1>
      <div>
        <a
          href="https://github.com/yayaluoya/vue3-dynamic-form"
          target="_blank"
        >
          <img
            src="@/assets/apple-touch-icon-144x144-b882e354c005.png"
            alt=""
          />
          Github
        </a>
      </div>
    </div>
    <vue3EditableForm
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
    padding: 0 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--el-border-color-light);
    > h1 {
      font-weight: bold;
    }
    > div {
      > a {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 13px;
        text-decoration: none;
        margin-right: 10px;
        color: #606266;
        > img {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          margin-right: 3px;
        }
      }
    }
  }
  > .dynamic-form {
    flex: 1 1 0;
    height: 0;
  }
}
</style>
