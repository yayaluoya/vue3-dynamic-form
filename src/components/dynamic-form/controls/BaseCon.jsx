import { customAlphabet } from "nanoid";
import { ObjectUtils } from "../tool/obj/ObjectUtils";
import { getFormConfig } from "../config/getFormConfig";
import { FontStyle } from "../com/FontStyle";

const alphabet = "0123456789_abcdefghijklmnopqrstuvwxyz_";
const nanoid = customAlphabet(alphabet, 21);

/**
 * 基类控件
 */
export class BaseCon {
  /** 单例对象 */
  static I;
  /** 控件类型 */
  static type = "";
  /** 控件名字 */
  static name = "";

  /** 控件类型 */
  type = "";
  /** 控件名字 */
  name = "";
  /** 控件实例唯一的key，不可变的 */
  key = "";
  /** 渲染key */
  renderKey = "";
  /** @type {BaseCon[]} 子控件 */
  childs = [];
  /** 布局配置 */
  layout = {
    col: {
      /** 栅格占据的列数 */
      span: 24,
      /** 栅格左侧的间隔格数 */
      offset: 0,
      /** 栅格向右移动格数 */
      push: 0,
      /** 栅格向左移动格数 */
      pull: 0,
    },
  };

  /** 表单属性 */
  formItemProps = {
    /** 最终绑定到formData上的属性名，如果设置为undefined的话表示这个控件不绑定值到formData上 */
    prop: undefined,
    label: "控件",
    labelFontStyle: new FontStyle({
      fontSize: 14,
    }),
    /** 表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性 默认会继承 Form的label-position */
    labelPosition: undefined,
    /** 标签宽度，例如 '50px'。 可以使用 auto。 */
    labelWidth: undefined,
    required: false,
    rules: undefined,
    /** 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。 */
    error: "",
    /** 是否显示校验错误信息 */
    showMessage: true,
    /** 是否在行内显示校验信息 */
    inlineMessage: "",
    /** 用于控制该表单域下组件的默认尺寸 */
    size: undefined,
  };

  /** 默认值 */
  defaultValue = undefined;

  constructor() {
    this.type = this.constructor.type;
    this.name = this.constructor.name;
    this.key = BaseCon.getKey();
    this.renderKey = BaseCon.getKey();
    // 属性名默认和key同名
    this.formItemProps.prop = this.key;
  }

  /** 转JSON字符串 */
  toJSON() {
    let d = { ...this };
    delete d.renderKey;
    return d;
  }

  /**
   * 初始化配置
   * @param {*} config 配置信息
   * @returns
   */
  initConfig(config) {
    for (let i in config) {
      this[i] = ObjectUtils.clone2(config[i]);
    }
    this.formItemProps.labelFontStyle = new FontStyle(
      this.formItemProps.labelFontStyle
    );
    return this;
  }

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

  /** 是否必填字段 */
  getRequired() {
    return this.formItemProps.required;
  }

  /**
   * 获取值ref，如果存在formdata的话就改formdata里面的值，反之则改defaultValue
   * @template {{get:()=>any,set:(v)=>void}} V
   * @param {V} value
   * @param {*} formData
   * @returns {{value: ReturnType<V['get']>}}
   */
  getVRef(value, formData) {
    return Object.defineProperties(
      {},
      {
        value: {
          get: () => {
            return formData ? formData[this.formItemProps.prop] : value.get();
          },
          set: (v) => {
            formData ? (formData[this.formItemProps.prop] = v) : value.set(v);
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
   * @param {BaseCon[]} list
   */
  formDataChangeE(formData, list) {}

  /**
   * 渲染拖拽时显示的元素
   * @param {any} h 渲染函数
   * @param {{ctx: import("vue").SetupContext,formConfig: ReturnType<getFormConfig>}}
   * @returns
   */
  renderDrag(h, { ctx = undefined } = {}) {
    return this.renderCol(...arguments);
  }

  /**
   * 渲染行元素
   * @param {any} h 渲染函数
   * @param {{ctx: import("vue").SetupContext,formConfig: ReturnType<getFormConfig>}}
   * @returns
   */
  renderCol(h, { ctx = undefined } = {}) {
    return (
      <el-col
        data-key={this.renderKey}
        span={this.layout.col.span}
        offset={this.layout.col.offset}
        push={this.layout.col.push}
        pull={this.layout.col.pull}
      >
        {this.renderFormItem(...arguments)}
      </el-col>
    );
  }

  /**
   * 渲染行元素
   * @param {any} h 渲染函数
   * @param {{ctx: import("vue").SetupContext,formConfig: ReturnType<getFormConfig>}}
   * @returns
   */
  renderFormItem(h, { ctx = undefined, formConfig = undefined } = {}) {
    return (
      <el-form-item
        prop={this.formItemProps.prop}
        label={this.formItemProps.label + this.key}
        label-position={this.formItemProps.labelPosition}
        label-width={
          //没有label时不显示label
          this.formItemProps.label ? this.formItemProps.labelWidth : "0px"
        }
        required={this.formItemProps.required}
        rules={this.formItemProps.rules}
        error={this.formItemProps.error}
        show-message={this.formItemProps.showMessage}
        inline-message={this.formItemProps.inlineMessage}
        size={this.formItemProps.size}
        scopedSlots={{
          label: (...arg) => {
            return (
              <div style={`display: inline-flex`}>
                <span
                  style={{
                    "font-size": this.formItemLabelFontSize.fontSize + "px",
                    color: this.formItemLabelFontSize.color,
                    // 'text-align': this.formItemLabelFontSize.textAlign,
                    "font-weight": this.formItemLabelFontSize.fontWeight,
                    "text-decoration":
                      this.formItemLabelFontSize.textDecoration,
                    "font-style": this.formItemLabelFontSize.fontStyle,
                  }}
                >
                  {this.formItemProps.label}
                  {formConfig.labelsuffix}
                </span>
              </div>
            );
          },
        }}
      >
        {this.renderRaw(...arguments)}
      </el-form-item>
    );
  }

  /**
   * 渲染行元素
   * @param {any} h 渲染函数
   * @param {{ctx: import("vue").SetupContext,formConfig: ReturnType<getFormConfig>}}
   * @returns
   */
  renderRaw(h, { ctx = undefined } = {}) {
    return <div></div>;
  }

  /**
   * 渲染右边编辑栏目
   * @param {any} h 渲染函数
   * @param {{ctx: import("vue").SetupContext}}
   * @returns
   */
  renderRight(h, { ctx = undefined } = {}) {
    return [
      {
        name: "lable",
        vd: <div>编辑栏目{this.key}</div>,
      },
    ];
  }

  /** 获取唯一的key */
  static getKey() {
    return `key_${BaseCon.getHash()}`;
  }
  /** 获取唯一哈希值 */
  static getHash() {
    return nanoid();
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
   * 插入控件
   * @param {BaseCon[]} list
   * @param {*} key
   * @param {*} con
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
}
