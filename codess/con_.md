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

  renderRaw() {
    return <div></div>;
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
```

## form

表单控件

```js jsx ts tsx
/**
 *
 */
export class $0 extends BaseForm {
  /** 控件类型 */
  static ConType = "$0";
  /** 控件名字 */
  static ConName = "";
  /** 单例对象 */
  static I = new $0();

  renderRaw({formData}: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return <div></div>;
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
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
