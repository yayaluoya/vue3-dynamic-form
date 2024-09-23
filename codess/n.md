## input

```jsx tsx
<NInput v-model:value={$0} />
```

## input-textarea

```jsx tsx
<NInput v-model:value={$0} type="textarea" />
```

## input-number

```jsx tsx
<NInputNumber v-model:value={$0} />
```

## switch

```jsx tsx
<NSwitch v-model:value={$0} />
```

## select

```jsx tsx
<NSelect
  v-model:value={$0}
  placeholder="请选择"
  options={[
    { label: "", value: "" },
    { label: "", value: "" },
  ]}
/>
```

## color

```jsx tsx
<NColorPicker v-model:value={$0} swatches={predefineColors} />
```

## icon

```jsx tsx
<NIcon size={20}>$0</NIcon>
```

## icon-button

```jsx tsx
<NButton size="small" quaternary circle onClick={() => {}}>
  <NIcon size={20}>$0</NIcon>
</NButton>
```
