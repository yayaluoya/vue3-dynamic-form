import {
  NDatePicker,
  NInput,
  NSelect,
  NSwitch,
  type DatePickerProps,
} from "naive-ui";
import type {
  IConRenderOp,
  IConRightRenderItemOp,
  IConRightRenderOp,
} from "./BaseCon";
import { BaseForm } from "./BaseForm";

/**
 * 日期选择器
 */
export class DatePicker extends BaseForm {
  /** 控件类型 */
  static ConType = "DatePicker";
  /** 控件名字 */
  static ConName = "日期选择器";
  /** 单例对象 */
  static I = new DatePicker();

  props: {
    type: DatePickerProps["type"];
    clearable: boolean;
    panel: boolean;
    monthFormat: string;
    quarterFormat: string;
    yearFormat: string;
    timerPickerFormat: string;
    format: string;
    placeholder: string;
  } = {
    type: "date",
    clearable: false,
    panel: false,
    monthFormat: "M",
    quarterFormat: "Q",
    yearFormat: "y",
    timerPickerFormat: "",
    format: "yyyy-MM-dd",
    placeholder: "",
  };

  formDefaultValue: number | [number, number] = Date.now();

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NDatePicker
        v-model:value={ref.value}
        type={this.props.type}
        clearable={this.props.clearable}
        panel={this.props.panel}
        monthFormat={this.props.monthFormat}
        quarterFormat={this.props.quarterFormat}
        yearFormat={this.props.yearFormat}
        timerPickerFormat={this.props.timerPickerFormat || undefined}
        format={this.props.format || undefined}
        placeholder={this.props.placeholder || undefined}
      ></NDatePicker>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "类型",
        editor: (
          <NSelect
            value={this.props.type}
            onUpdate:value={(v: DatePickerProps["type"]) => {
              this.props.type = v;
              switch (v) {
                case "date":
                  this.props.format = "yyyy-MM-dd";
                  this.formDefaultValue = Date.now();
                  break;
                case "datetime":
                  this.props.format = "yyyy-MM-dd HH:mm:ss";
                  this.formDefaultValue = Date.now();
                  break;
                case "daterange":
                  this.props.format = "yyyy-MM-dd";
                  this.formDefaultValue = [Date.now(), Date.now()];
                  break;
                case "datetimerange":
                  this.props.format = "yyyy-MM-dd HH:mm:ss";
                  this.formDefaultValue = [Date.now(), Date.now()];
                  break;
                case "month":
                  this.props.format = "yyyy-MM";
                  this.formDefaultValue = Date.now();
                  break;
                case "year":
                  this.props.format = "yyyy";
                  this.formDefaultValue = Date.now();
                  break;
                case "quarter":
                  this.props.format = "yyyy-MM-dd";
                  this.formDefaultValue = [Date.now(), Date.now()];
                  break;
                case "monthrange":
                  this.props.format = "yyyy-MM-dd";
                  this.formDefaultValue = [Date.now(), Date.now()];
                  break;
                case "quarterrange":
                  this.props.format = "yyyy-MM-dd";
                  this.formDefaultValue = [Date.now(), Date.now()];
                  break;
                case "yearrange":
                  this.props.format = "yyyy-MM-dd";
                  this.formDefaultValue = [Date.now(), Date.now()];
                  break;
                case "week":
                  this.props.format = "yyyy-w";
                  this.formDefaultValue = Date.now();
                  break;
              }
            }}
            placeholder="请选择"
            options={[
              { label: "date", value: "date" },
              { label: "datetime", value: "datetime" },
              { label: "daterange", value: "daterange" },
              { label: "datetimerange", value: "datetimerange" },
              { label: "month", value: "month" },
              { label: "year", value: "year" },
              { label: "quarter", value: "quarter" },
              { label: "monthrange", value: "monthrange" },
              { label: "quarterrange", value: "quarterrange" },
              { label: "yearrange", value: "yearrange" },
              { label: "week", value: "week" },
            ]}
          />
        ),
      },
      {
        label: "可清除",
        editor: <NSwitch v-model:value={this.props.clearable} />,
      },
      {
        label: "只使用面板",
        editor: <NSwitch v-model:value={this.props.panel} />,
      },
      {
        label: "格式",
        editor: <NInput v-model:value={this.props.format} />,
      },
      {
        label: "年份格式",
        editor: <NInput v-model:value={this.props.yearFormat} />,
      },
      {
        label: "季度格式",
        editor: <NInput v-model:value={this.props.quarterFormat} />,
      },
      {
        label: "月份格式",
        editor: <NInput v-model:value={this.props.monthFormat} />,
      },
      {
        label: "时间格式",
        editor: <NInput v-model:value={this.props.timerPickerFormat} />,
      },
      {
        label: "占位字符串",
        editor: <NInput v-model:value={this.props.placeholder} />,
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
