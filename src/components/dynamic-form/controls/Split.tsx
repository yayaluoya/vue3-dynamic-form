import {
  BaseCon,
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightRenderItemOp,
} from "./BaseCon";
import DraggableCon from "../com/draggable.vue";
import { NSelect, NSlider, NSplit, NSwitch, type SplitProps } from "naive-ui";

/**
 * 面板分割
 */
export class Split extends BaseCon {
  /** 控件类型 */
  static ConType = "Split";
  /** 控件名字 */
  static ConName = "面板分割";
  /** 单例对象 */
  static I = new Split();

  props = {
    max: 1,
    min: 0,
    resizeTriggerSize: 3,
    size: 0.5,
    disabled: false,
  };

  panes: {
    1: BaseCon[];
    2: BaseCon[];
  } = {
    1: [],
    2: [],
  };

  getChild() {
    return [...this.panes[1], ...this.panes[2]];
  }

  initConfig(configs: any, toCons: any) {
    super.initConfig(configs, toCons);
    this.panes[1] = toCons(this.panes[1]);
    this.panes[2] = toCons(this.panes[2]);
    return this;
  }

  renderRaw({ ctx, formConfig, activateCon }: IConRenderOp) {
    let getPane = (k: 1 | 2) => {
      return (
        <DraggableCon
          parent={this}
          cons={this.panes[k]}
          formConfig={formConfig}
          activateCon={activateCon}
          onUpdate:cons={(__) => {
            this.panes[k] = __;
          }}
          onUpdate:activateCon={(_) => {
            ctx.emit("activateConF", _);
          }}
          style={
            this.panes[k].length <= 0
              ? "min-height: 80px;"
              : "min-height: 20px;"
          }
        />
      );
    };
    return (
      <NSplit
        max={this.props.max}
        min={this.props.min}
        resizeTriggerSize={this.props.resizeTriggerSize}
        v-model:size={this.props.size}
        disabled={this.props.disabled}
      >
        {{
          1: () => {
            return getPane(1);
          },
          2: () => {
            return getPane(2);
          },
        }}
      </NSplit>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "分割大小",
        editor: (
          <NSlider
            v-model:value={this.props.size}
            max={this.props.max}
            min={this.props.min}
            step={0.01}
          />
        ),
      },
      {
        label: "分割最大阈值",
        editor: (
          <NSlider
            v-model:value={this.props.max}
            max={1}
            min={this.props.min}
            step={0.01}
          />
        ),
      },
      {
        label: "分割最小阈值",
        editor: (
          <NSlider
            v-model:value={this.props.min}
            max={this.props.max}
            min={0}
            step={0.01}
          />
        ),
      },
      {
        label: "分隔条大小",
        editor: (
          <NSlider v-model:value={this.props.resizeTriggerSize} min={0} />
        ),
      },
      {
        label: "禁用",
        editor: <NSwitch v-model:value={this.props.disabled} />,
      },
    ];
    _.find((_) => _.title == "常用属性")?.childs!.unshift(...add);
    return _;
  }
}
