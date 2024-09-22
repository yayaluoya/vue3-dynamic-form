## input

```tsx
<NInput v-model:value={$0} />
```

## input-textarea

```tsx
<NInput v-model:value={$0} type="textarea" />
```

## input-number

```tsx
<NInputNumber v-model:value={$0} />
```

## switch

```tsx
<NSwitch v-model:value={$0} />
```

## select

```tsx
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

```tsx
<NColorPicker v-model:value={$0} swatches={predefineColors} />
```

## icon

```tsx
<NIcon size={20}>$0</NIcon>
```

## icon-button

```tsx
<NButton size="small" quaternary circle onClick={() => {}}>
  <NIcon size={20}>$0</NIcon>
</NButton>
```
