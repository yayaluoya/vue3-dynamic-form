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
    return () => {
      return (
        <div class="right">
          {props.activateCon?.renderRight({
            ctx,
            formConfig: props.formConfig,
            cons: props.cons,
            activateCon: props.activateCon,
          })}
        </div>
      );
    };
  },
});
</script>

<style scoped lang="scss">
.right:deep {
  width: 100%;
  display: flex;
  flex-direction: column;
  > .item {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    box-sizing: border-box;
    > span {
      font-size: 15px;
      color: #818194;
      margin-bottom: 5px;
    }
  }
  > .item:nth-last-child(1) {
    margin-bottom: 0;
  }
}
</style>
