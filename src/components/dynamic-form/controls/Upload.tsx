import {
  NButton,
  NIcon,
  NInput,
  NInputNumber,
  NP,
  NSelect,
  NSwitch,
  NText,
  NUpload,
  NUploadDragger,
  type UploadFileInfo,
  type UploadProps,
} from "naive-ui";
import type {
  IConRenderOp,
  IConRightRenderItemOp,
  IConRightRenderOp,
} from "./BaseCon";
import { BaseForm } from "./BaseForm";
import { JSONPar } from "../tool/JSONPar";
import { Archive } from "@vicons/ionicons5";

/**
 * 文件上传
 */
export class Upload extends BaseForm {
  /** 控件类型 */
  static ConType = "Upload";
  /** 控件名字 */
  static ConName = "文件上传";
  /** 单例对象 */
  static I = new Upload();

  props: {
    action: string;
    headers: string;
    data: string;
    max: number;
    method: string;
    multiple: boolean;
    name: string;
    withCredentials: boolean;
    listType: UploadProps["listType"];
    dragger: boolean;
    showDownloadButton: boolean;
  } = {
    action: "",
    headers: "",
    data: "",
    max: 0,
    method: "POST",
    multiple: false,
    name: "file",
    withCredentials: false,
    listType: "text",
    dragger: false,
    showDownloadButton: false,
  };

  formDefaultValue: UploadFileInfo[] = [];

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NUpload
        v-model:file-list={ref.value}
        action={this.props.action}
        headers={JSONPar(this.props.headers, {})}
        data={JSONPar(this.props.data, {})}
        max={this.props.max || undefined}
        method={this.props.method}
        multiple={this.props.multiple}
        name={this.props.name}
        withCredentials={this.props.withCredentials}
      >
        {this.props.dragger ? (
          <NUploadDragger>
            <div style="margin-bottom: 12px">
              <NIcon size="48" depth="3">
                <Archive />
              </NIcon>
            </div>
            <NText style="font-size: 16px">
              点击或者拖动文件到该区域来上传
            </NText>
          </NUploadDragger>
        ) : (
          <NButton>上传文件</NButton>
        )}
      </NUpload>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "请求提交地址",
        editor: <NInput v-model:value={this.props.action} />,
      },
      {
        label: "附加HeadersJSON",
        editor: <NInput v-model:value={this.props.headers} />,
      },
      {
        label: "附加数据JSON",
        editor: <NInput v-model:value={this.props.data} />,
      },
      {
        label: "限制上传文件数量",
        editor: <NInputNumber v-model:value={this.props.max} />,
      },
      {
        label: "HTTP请求方法",
        editor: (
          <NSelect
            v-model:value={this.props.method}
            placeholder="请选择"
            options={[
              { label: "POST", value: "POST" },
              { label: "PUT", value: "PUT" },
              { label: "PATCH", value: "PATCH" },
            ]}
          />
        ),
      },
      {
        label: "支持多个文件",
        editor: <NSwitch v-model:value={this.props.multiple} />,
      },
      {
        label: "文件在提交表单中的字段名",
        editor: <NInput v-model:value={this.props.name} />,
      },
      {
        label: "携带 Cookie",
        editor: <NSwitch v-model:value={this.props.withCredentials} />,
      },
      {
        label: "列表的内建样式",
        editor: (
          <NSelect
            v-model:value={this.props.listType}
            placeholder="请选择"
            options={[
              { label: "text", value: "text" },
              { label: "image", value: "image" },
              { label: "image-card", value: "image-card" },
            ]}
          />
        ),
      },
      {
        label: "可拖拽",
        editor: <NSwitch v-model:value={this.props.dragger} />,
      },
      {
        label: "显示下载按钮",
        editor: <NSwitch v-model:value={this.props.showDownloadButton} />,
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
