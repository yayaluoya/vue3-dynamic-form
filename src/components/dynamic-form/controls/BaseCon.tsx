import { customAlphabet } from "nanoid";
import { ObjectUtils } from "../tool/obj/ObjectUtils";
import { type IFormConfig } from "../config/getFormConfig";
import "../style/controls.scss";
import { FormItemCon } from "../com/FormItemCon";
import type { JSX } from "vue/jsx-runtime";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 15);

/**
 * 控件渲染函数op
 */
export interface IConRenderOp {
  ctx: import("vue").SetupContext<["activateConF", "removeF", "moveF"]>;
  /** 表单配置 */
  formConfig: IFormConfig;
  /** 父控件 */
  parent?: BaseCon;
  cons?: BaseCon[];
  /** 当前激活的对象 */
  activateCon?: BaseCon;
  /** 表单数据，只有render表单的时候才会传这个值 */
  formData?: Record<string, any>;
}

/**
 * 控件又操作栏渲染函数op
 */
export interface IConRightRenderOp {
  ctx: import("vue").SetupContext;
  /** 表单配置 */
  formConfig: IFormConfig;
  cons?: BaseCon[];
}

/**
 * 基类控件
 */
export class BaseCon {
  /** 单例对象 */
  static I?: BaseCon;
  /** 控件类型 */
  static ConType = "";
  /** 控件名字 */
  static ConName = "";

  /** 控件类型 */
  conType = "";
  /** 控件名字 */
  conName = "";
  /** 控件实例唯一的key，不可变的 */
  key = "";
  /** 渲染key */
  renderKey = "";
  /** 子控件 */
  childs: BaseCon[] = [];

  /** 表单项组件 */
  formItem = new FormItemCon();

  /** 表单默认值 */
  formDefaultValue: any = undefined;

  /** 是否可拖拽 */
  towable = true;

  /** 是否隐藏 */
  hide = false;

  constructor() {
    this.conType = (this.constructor as any).ConType;
    this.conName = (this.constructor as any).ConName;
    let key = BaseCon.getKey();
    this.key = "key-" + key;
    this.renderKey = this.key;
    // 属性名默认和key同名
    this.formItem.prop =
      this.conType.toLocaleLowerCase() + "-" + key.slice(0, 7);
    this.formItem.label = this.conName;
    //
    this.init();
  }

  /** 获取表单属性名 */
  getFormProp() {
    return this.formItem?.prop;
  }

  /** 转JSON字符串 */
  toJSON() {
    let d = { ...this } as any;
    delete d.conName;
    delete d.renderKey;
    delete d.towable;
    return d;
  }

  /**
   * 初始化配置
   * TODO 主要是把一些配置转成class实例
   * @param config 配置信息
   * @param toCons 转换成cons的方法
   * @returns
   */
  initConfig(
    config: any,
    toCons: (config: any[], econs?: (typeof BaseCon)[]) => BaseCon[]
  ) {
    for (let i in config) {
      (this as any)[i] = ObjectUtils.clone2(config[i]);
    }
    this.formItem = new FormItemCon(this.formItem);
    this.childs = toCons(this.childs);
    //
    this.init(config);
    return this;
  }

  /**
   * 初始化
   * 因为有两种方式初始化，一种是new，一种是initConfig 所以这里统一一下
   * @param config initConfig 调用时回传的参数
   */
  init(config?: any) {}

  /**
   * 更新渲染key
   * TODO 强制更新组件时调用此方法
   */
  upadteRenderKey() {
    this.renderKey = BaseCon.getKey();
    return this;
  }

  /** 获取子控件列表 */
  getChild() {
    return this.childs;
  }

  /**
   * 设置组件隐藏
   * @param b
   */
  setHide(b = true) {
    this.hide = b;
    return this;
  }

  /**
   * 获取表单值ref，如果存在formdata的话就改formdata里面的值，反之则改formDefaultValue
   * @param formData
   */
  getFormValueRef<V>(formData: any = undefined, v: V): { value: V } {
    return Object.defineProperties(
      {},
      {
        value: {
          get: () => {
            return formData
              ? formData[this.formItem.prop || ""]
              : this.formDefaultValue;
          },
          set: (v) => {
            formData
              ? (formData[this.formItem.prop || ""] = v)
              : (this.formDefaultValue = v);
          },
        },
      }
    ) as any;
  }

  /**
   * 渲染拖拽时显示的元素
   * @param  op
   */
  renderDrag(op: IConRenderOp) {
    return this.render(op);
  }

  /**
   * 渲染行元素
   * @param {RenderOp} op
   * @returns
   */
  render({
    ctx,
    activateCon,
    formData,
    parent,
  }: IConRenderOp): JSX.Element | undefined {
    return formData ? (
      this.hide ? undefined : (
        this.renderFormItem(arguments[0])
      )
    ) : (
      <div
        key={this.renderKey}
        class={["controller", activateCon?.key == this.key ? "on" : ""].join(
          " "
        )}
        onClick={(e) => {
          e.stopPropagation();
          ctx.emit("activateConF", this);
        }}
      >
        {activateCon?.key == this.key
          ? [
              this.towable ? (
                <div class="drag-handler">
                  <el-icon>
                    <Rank />
                  </el-icon>
                  <span>{this.conName}</span>
                  {this.hide ? (
                    <el-icon style="margin-left: 2px">
                      <Hide />
                    </el-icon>
                  ) : null}
                </div>
              ) : (
                <div class="con-name">
                  <span>{this.conName}</span>
                  {this.hide ? (
                    <el-icon style="margin-left: 2px">
                      <Hide />
                    </el-icon>
                  ) : null}
                </div>
              ),
              <div class="handler-button">
                <el-icon
                  title="选择父组件"
                  onClick={(e: Event) => {
                    e.stopPropagation();
                    ctx.emit("activateConF", parent);
                  }}
                >
                  <Back />
                </el-icon>
                {this.getHandler(arguments[0])}
              </div>,
            ]
          : null}
        <div class="content">{this.renderFormItem(arguments[0])}</div>
      </div>
    );
  }

  /**
   * 获取handler元素
   * @param op
   */
  getHandler({ ctx }: IConRenderOp): JSX.Element[] {
    return [
      <el-icon
        title="上移组件"
        onClick={(e: Event) => {
          e.stopPropagation();
          ctx.emit("moveF", this, "up");
        }}
      >
        <Top />
      </el-icon>,
      <el-icon
        title="下移组件"
        onClick={(e: Event) => {
          e.stopPropagation();
          ctx.emit("moveF", this, "down");
        }}
      >
        <Bottom />
      </el-icon>,
      <el-icon
        title="删除组件"
        onClick={(e: Event) => {
          e.stopPropagation();
          ctx.emit("removeF", this);
        }}
      >
        <DeleteFilled />
      </el-icon>,
    ];
  }

  /**
   * 渲染表单元素
   * @param op
   * @returns
   */
  renderFormItem({ formConfig }: IConRenderOp): JSX.Element {
    return (
      <el-form-item
        class={[""].join(" ")}
        prop={this.formItem.prop}
        label-position={this.formItem.labelPosition[0]}
        label-width={
          !this.formItem.hideLabel && this.formItem.label
            ? this.formItem.labelWidth && this.formItem.labelWidth + "px"
            : "0px"
        }
        rules={this.formItem.rules}
        show-message={this.formItem.showMessage}
        size={this.formItem.size}
      >
        {{
          label: () => {
            if (this.formItem.hideLabel) {
              return [];
            }
            return (
              <div
                style={`
                display: inline-flex;
                flex-direction: row;
                ${
                  (this.formItem.labelPosition[0] ||
                    formConfig.labelPosition) == "top"
                    ? ""
                    : "width: 100%;"
                }
                justify-content: ${
                  this.formItem.labelAlign[0] || formConfig.labelAlign
                };
              `}
              >
                <span
                  style={{
                    "font-size": this.formItem.LabelFontStyle.fontSize + "px",
                    color: this.formItem.LabelFontStyle.color,
                    // 'text-align': this.formItem.LabelFontStyle.textAlign,
                    "font-weight": this.formItem.LabelFontStyle.fontWeight,
                    "text-decoration":
                      this.formItem.LabelFontStyle.textDecoration,
                    "font-style": this.formItem.LabelFontStyle.fontStyle,
                  }}
                >
                  {this.formItem.label}
                  {formConfig.labelsuffix}
                </span>
              </div>
            );
          },
          default: () => {
            return this.renderRaw(arguments[0]);
          },
        }}
      </el-form-item>
    );
  }

  /**
   * 渲染
   * @param op
   */
  renderRaw(op: IConRenderOp): JSX.Element {
    return <div></div>;
  }

  /**
   * 渲染右边编辑栏目
   * @param op
   * @returns
   */
  renderRight(op: IConRightRenderOp): JSX.Element[] {
    return this.getRight(arguments[0])?.map((_, i) => {
      return (
        <el-collapse-item key={i} title={_.title} name={_.title}>
          {_.childs &&
            _.childs.filter(Boolean).map((__, j) => {
              let { editor, ...props } = __!;
              return props.label ? (
                <el-form-item
                  key={j}
                  label={props.label}
                  label-position={props.labelPosition}
                >
                  {editor}
                </el-form-item>
              ) : (
                editor
              );
            })}
        </el-collapse-item>
      );
    });
  }

  /**
   * 获取右边编辑栏目
   * @param op
   * @param hasEditor 是否获取编辑器
   * @returns
   */
  getRight(
    op: IConRightRenderOp,
    hasEditor = true
  ): {
    key: "com" | "form";
    title: string;
    childs?: (
      | {
          label?: string;
          editor?: JSX.Element;
          labelPosition?: string;
        }
      | undefined
    )[];
  }[] {
    return [
      {
        key: "com",
        title: "常用属性",
        childs: hasEditor
          ? [
              {
                label: "是否隐藏",
                editor: (
                  <el-switch
                    size="small"
                    model-value={this.hide}
                    onChange={(v: any) => {
                      this.hide = v;
                    }}
                  ></el-switch>
                ),
              },
            ]
          : undefined,
      },
      {
        key: "form",
        title: "表单属性",
        childs: hasEditor ? [...this.formItem.reder()] : undefined,
      },
    ];
  }

  /**
   * 通过key查找某个控件实例
   * @param list
   * @param key
   */
  static findCon(
    list: BaseCon[],
    key: string | ((o: BaseCon) => boolean)
  ): BaseCon | undefined {
    let equi = (o: BaseCon, key: string | ((o: BaseCon) => boolean)) => {
      switch (true) {
        case typeof key == "function":
          return (key as (o: BaseCon) => boolean)(o);
        default:
          return o.key == key;
      }
    };
    for (let o of list) {
      if (equi(o, key)) {
        return o;
      } else {
        let oo = BaseCon.findCon(o.getChild(), key);
        if (oo) {
          return oo;
        }
      }
    }
  }

  /**
   * 组件遍历，并返回所有的组件
   * @param list
   * @param f
   */
  static consForeach(list: BaseCon[], f?: (item: BaseCon, i: number) => void) {
    let cons: BaseCon[] = [];
    list.forEach((item, i) => {
      f?.(item, i);
      cons.push(item, ...BaseCon.consForeach(item.getChild(), f));
    });
    return cons;
  }

  /**
   * 插入控件
   * @param list
   * @param key
   * @param con
   * @param type
   */
  static insertCon(
    list: BaseCon[],
    key: string,
    con: BaseCon,
    type: "up" | "down" = "down"
  ) {
    if (list.length == 0 || !key) {
      list.push(con);
      return;
    }
    let i = list.findIndex((_) => _.key == key);
    if (i >= 0) {
      list.splice(
        i +
          {
            up: 0,
            down: 1,
          }[type],
        0,
        con
      );
    } else {
      list.forEach((_) => {
        _.getChild().length > 0 &&
          BaseCon.insertCon(_.getChild(), key, con, type);
      });
    }
  }

  /**
   * 移动控件
   * @param list
   * @param con
   * @param type
   */
  static moveCon(list: BaseCon[], con: BaseCon, type: "up" | "down") {
    let i = list.findIndex((_) => _.key == con.key);
    if (i >= 0) {
      switch (type) {
        case "up":
          if (i != 0) {
            list[i] = list[i - 1];
            list[i - 1] = con;
          }
          break;
        case "down":
          if (i != list.length - 1) {
            list[i] = list[i + 1];
            list[i + 1] = con;
          }
          break;
      }
    } else {
      list.forEach((_) => {
        BaseCon.moveCon(_.getChild(), con, type);
      });
    }
  }

  /** 获取唯一的key */
  static getKey() {
    return BaseCon.getHash();
  }
  /** 获取唯一哈希值 */
  static getHash() {
    return nanoid();
  }
}
