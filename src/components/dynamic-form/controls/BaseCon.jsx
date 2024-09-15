import { customAlphabet } from "nanoid";
import { ObjectUtils } from "../tool/obj/ObjectUtils";
import { getFormConfig } from "../config/getFormConfig";
import "../style/controls.scss";
import { FormItemCon } from "../com/FormItemCon";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 15);

/**
 * @typedef RenderOp
 * @property {import("vue").SetupContext} ctx
 * @property {ReturnType<getFormConfig>} formConfig
 * @property {BaseCon} parent
 * @property {BaseCon[]} cons
 * @property {BaseCon} activateCon
 * @property {Record<string,any>} formData 表单数据，如果有的话则是预览
 */

/**
 * 基类控件
 */
export class BaseCon {
  /** 单例对象 */
  static I;
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
  /** @type {BaseCon[]} 子控件 */
  childs = [];

  /** 表单项组件 */
  formItem = new FormItemCon();

  /** 表单默认值 */
  formDefaultValue = undefined;

  /** 是否可拖拽 */
  towable = true;

  /** 是否隐藏 */
  hide = false;

  constructor() {
    this.conType = this.constructor.ConType;
    this.conName = this.constructor.ConName;
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
    let d = { ...this };
    delete d.conName;
    delete d.renderKey;
    delete d.towable;
    return d;
  }

  /**
   * 初始化配置
   * TODO 主要是把一些配置转成class实例
   * @param {*} config 配置信息
   * @param {(config: any[],econs: BaseCon[] = [])=>BaseCon[]} toCons 转换成cons的方法
   * @returns
   */
  initConfig(config, toCons) {
    for (let i in config) {
      this[i] = ObjectUtils.clone2(config[i]);
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
   * @param {BaseCon} config initConfig 调用时回传的参数
   */
  init(config) {}

  /**
   * 更新渲染key
   * TODO 强制更新组件时调用此方法
   */
  upadteRenderKey() {
    this.renderKey = BaseCon.getKey();
    //
    return this;
  }

  /** 获取子控件列表 */
  getChild() {
    return this.childs;
  }

  /** 克隆自身 */
  clone() {
    let _ = this;
    _ = new this.constructor().initConfig(this);
    return _;
  }

  /**
   * 设置组件隐藏
   * @param {boolean} b
   */
  setHide(b = true) {
    this.hide = b;
  }

  /**
   * 获取表单值ref，如果存在formdata的话就改formdata里面的值，反之则改formDefaultValue
   * @template V
   * @param {RenderOp['formData']} formData
   * @param {V} value 这个参数只是为了类型推断
   * @returns {{value: V}}
   */
  getFormValueRef(formData = undefined, value = undefined) {
    return Object.defineProperties(
      {},
      {
        value: {
          get: () => {
            return formData
              ? formData[this.formItem.prop]
              : this.formDefaultValue;
          },
          set: (v) => {
            formData
              ? (formData[this.formItem.prop] = v)
              : (this.formDefaultValue = v);
          },
        },
      }
    );
  }

  /**
   * 拖动事件
   */
  draggableE(e, ...arg) {}

  /**
   * formData改变事件
   * @param {*} formData
   * @param {BaseCon[]} cons
   */
  formDataChangeE(formData, cons) {}

  /**
   * 渲染拖拽时显示的元素
   * @param {RenderOp} op
   * @returns
   */
  renderDrag(op) {
    return this.render(...arguments);
  }

  /**
   * 渲染行元素
   * @param {RenderOp} op
   * @returns
   */
  render({ ctx, activateCon, formData, parent }) {
    return formData ? (
      this.hide ? null : (
        this.renderFormItem(...arguments)
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
                  onClick={(e) => {
                    e.stopPropagation();
                    ctx.emit("activateConF", parent);
                  }}
                >
                  <Back />
                </el-icon>
                {this.getHandler(...arguments)}
              </div>,
            ]
          : null}
        <div class="content">{this.renderFormItem(...arguments)}</div>
      </div>
    );
  }

  /**
   * 获取handler元素
   * @param {RenderOp} op
   * @returns
   */
  getHandler({ ctx }) {
    return [
      <el-icon
        title="上移组件"
        onClick={(e) => {
          e.stopPropagation();
          ctx.emit("moveF", this, "up");
        }}
      >
        <Top />
      </el-icon>,
      <el-icon
        title="下移组件"
        onClick={(e) => {
          e.stopPropagation();
          ctx.emit("moveF", this, "down");
        }}
      >
        <Bottom />
      </el-icon>,
      <el-icon
        title="删除组件"
        onClick={(e) => {
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
   * @param {RenderOp} op
   * @returns
   */
  renderFormItem({ formConfig }) {
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
          label: (...arg) => {
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
            return this.renderRaw(...arguments);
          },
        }}
      </el-form-item>
    );
  }

  /**
   * 渲染
   * @param {RenderOp} op
   * @returns
   */
  renderRaw(op) {
    return <div></div>;
  }

  /**
   * 渲染右边编辑栏目
   * @param {RenderOp} op
   * @returns
   */
  renderRight(op) {
    return this.getRight(...arguments)?.map((_, i) => {
      return (
        <el-collapse-item key={i} title={_.title} name={_.title}>
          {_.childs.filter(Boolean).map((__, j) => {
            let { editor, ...props } = __;
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
   * @param {RenderOp} op
   * @returns
   */
  getRight(op, hasEditor = true) {
    return [
      {
        key: "com",
        title: "常用属性",
        childs: hasEditor && [
          {
            label: "是否隐藏",
            editor: (
              <el-switch
                size="small"
                model-value={this.hide}
                onChange={(v) => {
                  this.hide = v;
                }}
              ></el-switch>
            ),
          },
        ],
      },
      {
        key: "form",
        title: "表单属性",
        childs: hasEditor && [...this.formItem.reder()],
      },
    ];
  }

  /**
   * 通过key查找某个控件实例
   * @param {BaseCon[]} list
   * @param {string|(a: BaseCon)=>boolean} key
   * @returns {BaseCon}
   */
  static findCon(list, key) {
    let equi = (o, key) => {
      switch (true) {
        case typeof key == "function":
          return key(o);
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
   * @param {BaseCon[]} list
   * @param {(item: BaseCon, i: index)=>void} f
   * @returns {BaseCon[]}
   */
  static consForeach(list, f = undefined) {
    let cons = [];
    list.forEach((item, i) => {
      f?.(item, i);
      cons.push(item, ...BaseCon.consForeach(item.getChild(), f));
    });
    return cons;
  }

  /**
   * 插入控件
   * @param {BaseCon[]} list
   * @param {string} key
   * @param {BaseCon} con
   * @param {'up'|'down'} type
   */
  static insertCon(list, key, con, type = "down") {
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
   * @param {BaseCon[]} list
   * @param {BaseCon} con
   * @param {'up'|'down'} type
   */
  static moveCon(list, con, type) {
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
