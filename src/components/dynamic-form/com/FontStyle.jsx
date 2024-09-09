import { predefineColors } from '../config/predefineColors';

/**
 * 字体样式
 */
export class FontStyle {
  fontSize = 16;
  color = '#000000';
  textAlign = 'left';
  fontWeight = 'normal';
  textDecoration = '';
  fontStyle = '';

  /**
   * @param {Partial<FontStyle>} op
   */
  constructor(op = {}) {
    for (let i in op) {
      this[i] = op[i];
    }
  }

  render(h, title = '', filter = []) {
    return [
      <div class="item">
        <span>{title}字号</span>
        <div style="display: flex;flex-direction: row;">
          <el-select
            style="margin-right: 5px"
            value={this.fontSize}
            on={{
              change: (v) => {
                this.fontSize = v;
              },
            }}
            placeholder="请选择"
            filterable
          >
            {new Array(13).fill(0).map((_, i) => {
              return <el-option label={12 + i} value={12 + i}></el-option>;
            })}
          </el-select>
          <el-color-picker
            value={this.color}
            on={{
              change: (v) => {
                this.color = v;
              },
            }}
            predefine={predefineColors}
          ></el-color-picker>
        </div>
        {filter.includes('zt') ? [] : <span style="margin-top: 5px;">字体</span>}
        {filter.includes('zt') ? (
          []
        ) : (
          <div
            style={`
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 5px;
        `}
          >
            <svg-icon
              icon-class="form-g-f-b"
              style={{
                cursor: 'pointer',
                stroke: this.fontWeight == 'bold' ? '#1890ff' : '#666666',
                fontSize: '20px',
                marginRight: '8px',
              }}
              onClick={() => {
                this.fontWeight == 'bold'
                  ? (this.fontWeight = 'normal')
                  : (this.fontWeight = 'bold');
              }}
            ></svg-icon>
            <svg-icon
              icon-class="form-g-f-xt"
              style={{
                cursor: 'pointer',
                stroke: this.fontStyle == 'italic' ? '#1890ff' : '#666666',
                fontSize: '20px',
                marginRight: '8px',
              }}
              onClick={() => {
                this.fontStyle == 'italic'
                  ? (this.fontStyle = '')
                  : (this.fontStyle = 'italic');
              }}
            ></svg-icon>
            <svg-icon
              icon-class="form-g-f-xhx"
              style={{
                cursor: 'pointer',
                stroke: this.textDecoration == 'underline' ? '#1890ff' : '#666666',
                fontSize: '20px',
                marginRight: '8px',
              }}
              onClick={() => {
                this.textDecoration == 'underline'
                  ? (this.textDecoration = '')
                  : (this.textDecoration = 'underline');
              }}
            ></svg-icon>
            <svg-icon
              icon-class="form-g-f-zhx"
              style={{
                cursor: 'pointer',
                stroke: this.textDecoration == 'line-through' ? '#1890ff' : '#666666',
                fontSize: '20px',
                marginRight: '8px',
              }}
              onClick={() => {
                this.textDecoration == 'line-through'
                  ? (this.textDecoration = '')
                  : (this.textDecoration = 'line-through');
              }}
            ></svg-icon>
          </div>
        )}
        {filter.includes('bs') ? [] : <span style="margin-top: 5px;">板式</span>}
        {filter.includes('bs') ? (
          []
        ) : (
          <div
            style={`
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 5px;
        `}
          >
            <svg-icon
              icon-class="form-g-f-kz"
              style={{
                cursor: 'pointer',
                stroke: this.textAlign == 'left' ? '#1890ff' : '#666666',
                fontSize: '20px',
                marginRight: '8px',
              }}
              onClick={() => {
                this.textAlign = 'left';
              }}
            ></svg-icon>
            <svg-icon
              icon-class="form-g-f-jz"
              style={{
                cursor: 'pointer',
                stroke: this.textAlign == 'center' ? '#1890ff' : '#666666',
                fontSize: '20px',
                marginRight: '8px',
              }}
              onClick={() => {
                this.textAlign = 'center';
              }}
            ></svg-icon>
            <svg-icon
              icon-class="form-g-f-ky"
              style={{
                cursor: 'pointer',
                stroke: this.textAlign == 'right' ? '#1890ff' : '#666666',
                fontSize: '20px',
                marginRight: '8px',
              }}
              onClick={() => {
                this.textAlign = 'right';
              }}
            ></svg-icon>
          </div>
        )}
      </div>,
    ];
  }
}
