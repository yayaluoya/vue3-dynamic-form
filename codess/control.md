## base

从基类继承的表单控件

```js jsx
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

  renderRaw({ formData }) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return <div></div>;
  }

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments);
    hasEditor && _.find((_) => _.title == "常用属性").childs.unshift(...[]);
    return _;
  }
}
```

## non-form

非表单控件

```js jsx
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

  formDefaultValue = "";

  renderRaw() {
    return <div></div>;
  }

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments);
    hasEditor && _.find((_) => _.title == "常用属性").childs.unshift(...[]);
    return _;
  }
}
```
