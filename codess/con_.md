## base

从基类继承的表单控件

```js jsx ts tsx
/**
 *
 */
export class $0 extends BaseCon {
  /** 控件类型 */
  static ConType = "$0";
  /** 控件名字 */
  static ConName = "";
  /** 单例对象 */
  static I = new $0();

  formDefaultValue = "";

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return <div></div>;
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightReterItemOp["childs"] = [];
    _.find((_) => _.title == "常用属性")?.childs!.unshift(...add);
    return _;
  }
}
```

## non-form

非表单控件

```js jsx ts tsx
/**
 *
 */
export class $0 extends NonForm {
  /** 控件类型 */
  static ConType = "$0";
  /** 控件名字 */
  static ConName = "";
  /** 单例对象 */
  static I = new $0();

  renderRaw() {
    return <div></div>;
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightReterItemOp["childs"] = [];
    _.find((_) => _.title == "常用属性")?.childs!.unshift(...add);
    return _;
  }
}
```

## right-item

```js ts jsx tsx
{
  label: "$1",
  editor: $0,
},
```