import { customAlphabet } from "nanoid";
import { ObjectUtils } from "../tool/obj/ObjectUtils";
import { type TFormConfig } from "../config/getFormConfig";
import "../style/controls.scss";
import type { JSX } from "vue/jsx-runtime";
import {
  NCollapseItem,
  NFlex,
  NFormItem,
  NIcon,
  NSwitch,
  type FormItemProps,
} from "naive-ui";
import {
  ArrowBack,
  ArrowDown,
  ArrowUp,
  EyeOff,
  Move,
  RemoveCircle,
} from "@vicons/ionicons5";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 15);

export interface IConRenderOp {
  ctx: import("vue").SetupContext<["activateConF", "removeF", "moveF"]>;
  /** 表单配置 */
  formConfig: TFormConfig;
  /** 父控件 */
  parent?: BaseCon;
  cons?: BaseCon[];
  /** 当前激活的对象 */
  activateCon?: BaseCon;
  /** 表单数据，只有render表单的时候才会传这个值 */
  formData?: Record<string, any>;
}

export interface IConRightRenderOp {
  ctx: import("vue").SetupContext;
  /** 表单配置 */
  formConfig: TFormConfig;
  cons?: BaseCon[];
}

export interface IConRightRenderItemOp<K extends string = string> {
  key: K;
  title: string;
  childs: (
    | {
        label?: string | JSX.Element;
        editor?: JSX.Element;
      }
    | undefined
  )[];
}

export type BaseRightRenderK = "com";

/**
 * 基类控件
 */
export class BaseCon<RightRenderK extends string = string> {
  /** 单例对象 */
  static I?: BaseCon;
  /** 控件类型 */
  static ConType = "";
  /** 控件名字 */
  static ConName = "";

  /** 控件类型 */
  readonly conType: string = "";
  /** 控件名字 */
  readonly conName: string = "";
  /** 控件实例唯一的key，不可变的 */
  readonly key: string = "";
  /** 渲染key */
  renderKey = "";
  /** 子控件 */
  childs: BaseCon[] = [];

  /** 是否可拖拽 */
  protected towable = true;

  /** 是否隐藏 */
  hide = false;

  constructor() {
    this.conType = (this.constructor as any).ConType;
    this.conName = (this.constructor as any).ConName;
    let key = BaseCon.getKey();
    this.key = key;
    this.renderKey = this.key;
    //
    this.init();
  }

  /** 转JSON字符串 */
  toJSON() {
    let d = { ...this };
    Reflect.deleteProperty(d, "conName");
    Reflect.deleteProperty(d, "renderKey");
    Reflect.deleteProperty(d, "towable");
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
   * 渲染拖拽时显示的元素
   * @param  op
   */
  renderDrag(op: IConRenderOp) {
    return this.render(op);
  }

  /**
   * 顶层渲染方法
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
        this.renderMiddleware(arguments[0])
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
                <NFlex class="drag-handler" size={[3, 0]} align="center">
                  <NIcon size={15}>
                    <Move />
                  </NIcon>
                  <span>{this.conName}</span>
                  {this.hide ? (
                    <NIcon size={15}>
                      <EyeOff />
                    </NIcon>
                  ) : null}
                </NFlex>
              ) : (
                <NFlex class="con-name" size={[3, 0]} align="center">
                  <span>{this.conName}</span>
                  {this.hide ? (
                    <NIcon size={15}>
                      <EyeOff />
                    </NIcon>
                  ) : null}
                </NFlex>
              ),
              <NFlex class="handler-button" size={[3, 0]} align="center">
                <div
                  title="选择父组件"
                  onClick={(e: Event) => {
                    e.stopPropagation();
                    ctx.emit("activateConF", parent);
                  }}
                >
                  <NIcon size={15}>
                    <ArrowBack />
                  </NIcon>
                </div>
                {this.getHandler(arguments[0])}
              </NFlex>,
            ]
          : null}
        <div class="content">{this.renderMiddleware(arguments[0])}</div>
      </div>
    );
  }

  /**
   * 获取顶层渲染方法的handler元素
   * @param op
   */
  getHandler({ ctx }: IConRenderOp): JSX.Element[] {
    return [
      <div
        title="上移组件"
        onClick={(e: Event) => {
          e.stopPropagation();
          ctx.emit("moveF", this, "up");
        }}
      >
        <NIcon size={15}>
          <ArrowUp />
        </NIcon>
      </div>,
      <div
        title="下移组件"
        onClick={(e: Event) => {
          e.stopPropagation();
          ctx.emit("moveF", this, "down");
        }}
      >
        <NIcon size={15}>
          <ArrowDown />
        </NIcon>
      </div>,
      <div
        title="删除组件"
        onClick={(e: Event) => {
          e.stopPropagation();
          ctx.emit("removeF", this);
        }}
      >
        <NIcon size={15}>
          <RemoveCircle />
        </NIcon>
      </div>,
    ];
  }

  /**
   * 渲染中间件
   * TODO 负责分离顶层渲染和底层渲染方法
   * @param op
   * @returns
   */
  renderMiddleware(op: IConRenderOp): JSX.Element {
    return this.renderRaw(op);
  }

  /**
   * 最底层渲染方法
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
        <NCollapseItem key={i} title={_.title} name={_.key}>
          {_.childs &&
            _.childs.filter(Boolean).map((__, j) => {
              let { editor, ...props } = __!;
              return (
                <NFormItem
                  key={j}
                  show-feedback={!!editor}
                  label-placement={props.label ? "left" : "top"}
                  show-label={!!props.label}
                >
                  {{
                    label: () => props.label,
                    default: () => editor,
                  }}
                </NFormItem>
              );
            })}
        </NCollapseItem>
      );
    });
  }

  /**
   * 获取右侧编辑栏默认展开的栏目
   */
  getRightDefaultExpanded(): (RightRenderK | BaseRightRenderK)[] {
    return ["com"];
  }

  /**
   * 获取右边编辑栏目
   * @param op
   * @param hasEditor 是否获取编辑器
   * @returns
   */
  getRight(
    op: IConRightRenderOp
  ): IConRightRenderItemOp<RightRenderK | BaseRightRenderK>[] {
    return [
      {
        key: "com",
        title: "常用属性",
        childs: [
          {
            label: "是否隐藏",
            editor: <NSwitch v-model:value={this.hide} />,
          },
        ],
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
