## input

```jsx
<el-input
  size="small"
  placeholder=""
  model-value={$0}
  onInput={(v) => {
    $0 = v;
  }}
/>
```

## input-textarea

```jsx
<el-input
  type="textarea"
  size="small"
  rows={2}
  placeholder=""
  model-value={$0}
  onInput={(v) => {
    $0 = v;
  }}
/>
```

## input-number

```jsx
<el-input-number
  size="small"
  model-value={$0}
  onChange={(v) => {
    $0 = v;
  }}
/>
```

## select

```jsx
<el-select
  model-value={$0}
  size="small"
  onChange={(v) => {
    $0 = v;
  }}
  placeholder="请选择"
  clearable
>
  <el-option label={""} value={""} />
</el-select>
```

## switch

```jsx
<el-switch
  size="small"
  model-value={$0}
  onChange={(v) => {
    $0 = v;
  }}
></el-switch>
```

## radio-group

```jsx
<el-radio-group
  size="small"
  model-value={$0}
  onChange={(v) => {
    $0 = v;
  }}
>
  <el-radio label={""} value={""} />
</el-radio-group>
```

## radio-group-button

```jsx
<el-radio-group
  size="small"
  model-value={$0}
  onChange={(v) => {
    $0 = v;
  }}
>
  <el-radio-button label={""} value={""} />
</el-radio-group>
```

## checkbox-group

```jsx
<el-checkbox-group
  size="small"
  model-value={$0}
  onChange={(v) => {
    $0 = v;
  }}
>
  <el-checkbox label={""} value={""} />
</el-checkbox-group>
```

## checkbox-group-button

```jsx
<el-checkbox-group
  size="small"
  model-value={$0}
  onChange={(v) => {
    $0 = v;
  }}
>
  <el-checkbox-button label={""} value={""} />
</el-checkbox-group>
```

## color-picker

注意 predefineColors 要导入一下，不然找不到

```jsx
<el-color-picker
  size="small"
  model-value={$0}
  onChange={(v) => {
    $0 = v;
  }}
  predefine={predefineColors}
/>
```
