import { customAlphabet } from "nanoid";
import { ObjectUtils } from "../tool/obj/ObjectUtils";
import { getFormConfig } from "../config/getFormConfig";
import { FontStyle } from "../com/FontStyle";
import { FormItemRules } from "../com/FormItemRules";
import "../style/controls.scss";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 21);

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

  /** 表单属性 */
  formItemProps = {
    /** 最终绑定到formData上的属性名，如果设置为undefined的话表示这个控件不绑定值到formData上 */
    prop: undefined,
    /** 隐藏label */
    hideLabel: false,
    label: "控件",
    /** 表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性 默认会继承 Form的label-position */
    labelPosition: undefined,
    /** 标签对齐方式 */
    labelAlign: undefined,
    /** 标签宽度，例如 '50px'。 可以使用 auto。 */
    labelWidth: 0,
    /** 是否显示校验错误信息 */
    showMessage: true,
    /** 用于控制该表单域下组件的默认尺寸 */
    size: undefined,
  };
  /** 表单项标签字体样式 */
  formItemLabelFontStyle = new FontStyle({
    fontSize: 14,
  });
  /** 表单项数据验证规则 */
  formItemRules = new FormItemRules();

  /** 表单默认值 */
  formDefaultValue = undefined;

  /** 是否可拖拽 */
  towable = true;

  /** 是否隐藏 */
  hide = false;

  constructor() {
    this.conType = this.constructor.ConType;
    this.conName = this.constructor.ConName;
    this.key = BaseCon.getKey();
    this.renderKey = BaseCon.getKey();
    // 属性名默认和key同名
    this.formItemProps.prop = this.key;
    this.formItemProps.label = this.conName;
    //
    this.init();
  }

  /** 转JSON字符串 */
  toJSON() {
    let d = { ...this };
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
    this.formItemLabelFontStyle = new FontStyle(this.formItemLabelFontStyle);
    this.formItemRules = new FormItemRules(this.formItemRules);
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

  /** 更新渲染key */
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
              ? formData[this.formItemProps.prop]
              : this.formDefaultValue;
          },
          set: (v) => {
            formData
              ? (formData[this.formItemProps.prop] = v)
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
        prop={this.formItemProps.prop}
        label-position={this.formItemProps.labelPosition}
        label-width={
          !this.formItemProps.hideLabel && this.formItemProps.label
            ? this.formItemProps.labelWidth &&
              this.formItemProps.labelWidth + "px"
            : "0px"
        }
        rules={this.formItemRules.list}
        show-message={this.formItemProps.showMessage}
        size={this.formItemProps.size}
      >
        {{
          label: (...arg) => {
            if (this.formItemProps.hideLabel) {
              return [];
            }
            return (
              <div
                style={`
                display: inline-flex;
                flex-direction: row;
                ${
                  (this.formItemProps.labelPosition ||
                    formConfig.labelPosition) == "top"
                    ? ""
                    : "width: 100%;"
                }
                justify-content: ${
                  this.formItemProps.labelAlign || formConfig.labelAlign
                };
              `}
              >
                <span
                  style={{
                    "font-size": this.formItemLabelFontStyle.fontSize + "px",
                    color: this.formItemLabelFontStyle.color,
                    // 'text-align': this.formItemLabelFontStyle.textAlign,
                    "font-weight": this.formItemLabelFontStyle.fontWeight,
                    "text-decoration":
                      this.formItemLabelFontStyle.textDecoration,
                    "font-style": this.formItemLabelFontStyle.fontStyle,
                  }}
                >
                  {this.formItemProps.label}
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
              <el-form-item key={j} label={props.label}>
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
        title: "表单属性",
        childs: hasEditor && [
          {
            label: "表单字段名",
            editor: (
              <el-input
                size="small"
                model-value={this.formItemProps.prop}
                onInput={(v) => {
                  this.formItemProps.prop = v;
                }}
              />
            ),
          },
          {
            label: "隐藏标签",
            editor: (
              <el-switch
                size="small"
                model-value={this.formItemProps.hideLabel}
                onChange={(v) => {
                  this.formItemProps.hideLabel = v;
                }}
              ></el-switch>
            ),
          },
          {
            label: "标签名",
            editor: (
              <el-input
                size="small"
                model-value={this.formItemProps.label}
                onInput={(v) => {
                  this.formItemProps.label = v;
                }}
              />
            ),
          },
          {
            label: "标签位置",
            editor: (
              <div style="display: flex;align-items: center;">
                <el-radio-group
                  size="small"
                  model-value={this.formItemProps.labelPosition}
                  onChange={(v) => {
                    this.formItemProps.labelPosition = v;
                  }}
                >
                  <el-radio-button label="left" value="left" />
                  <el-radio-button label="top" value="top" />
                </el-radio-group>
                {this.formItemProps.labelPosition ? (
                  <el-icon
                    style="margin-left: 2px;cursor: pointer;"
                    onClick={() => {
                      this.formItemProps.labelPosition = undefined;
                    }}
                  >
                    <Close />
                  </el-icon>
                ) : null}
              </div>
            ),
          },
          {
            label: "字段标签对齐",
            editor: (
              <div style="display: flex;align-items: center;">
                <el-radio-group
                  size="small"
                  model-value={this.formItemProps.labelAlign}
                  onChange={(v) => {
                    this.formItemProps.labelAlign = v;
                  }}
                >
                  <el-radio-button label="left" value="left" />
                  <el-radio-button label="center" value="center" />
                  <el-radio-button label="right" value="right" />
                </el-radio-group>
                {this.formItemProps.labelAlign ? (
                  <el-icon
                    style="margin-left: 2px;cursor: pointer;"
                    onClick={() => {
                      this.formItemProps.labelAlign = undefined;
                    }}
                  >
                    <Close />
                  </el-icon>
                ) : null}
              </div>
            ),
          },
          {
            label: "标签宽度",
            editor: (
              <div style="display: flex;align-items: center;">
                <el-input-number
                  size="small"
                  model-value={this.formItemProps.labelWidth}
                  onChange={(v) => {
                    this.formItemProps.labelWidth = v;
                  }}
                />
                {this.formItemProps.labelWidth ? (
                  <el-icon
                    style="margin-left: 2px;cursor: pointer;"
                    onClick={() => {
                      this.formItemProps.labelWidth = 0;
                    }}
                  >
                    <Close />
                  </el-icon>
                ) : null}
              </div>
            ),
          },
          ...this.formItemLabelFontStyle.render(),
          {
            label: "组件大小",
            editor: (
              <el-select
                model-value={this.formItemProps.size}
                size="small"
                onChange={(v) => {
                  this.formItemProps.size = v;
                }}
                placeholder="请选择"
                clearable
              >
                <el-option label="large" value="large" />
                <el-option label="default" value="default" />
                <el-option label="small" value="small" />
              </el-select>
            ),
          },
          {
            label: "显示校验错误信息",
            editor: (
              <el-switch
                size="small"
                model-value={this.formItemProps.showMessage}
                onChange={(v) => {
                  this.formItemProps.showMessage = v;
                }}
              ></el-switch>
            ),
          },
          ...this.formItemRules.reder(),
        ],
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
