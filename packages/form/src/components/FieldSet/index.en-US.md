---
title: ProFormFields
order: 1
group:
  path: /
nav:
  title: Components
  path: /components
---

# ProFormFields

ProForm comes with a significant number of form items, which are essentially a combination of Form.Item and components. Each form item supports the `fieldProps` property to support setting the `props` of the input component. We support pass-through of `placeholder`, so you can set `placeholder` directly on the component.

Each form item also supports `readonly`, which has different read-only styles for different components, making `readonly` display more friendly compared to `disable`. The generated dom is also smaller, e.g. ProFormDigit automatically formats decimal digits.

ProFormText is the product of FormItem + Input and can be analogous to the following code.

```tsx | pure
const ProFormText = (props) => {
  return (
    <Form.Item {. .props}>
      <Input placeholder={props.placeholder} {. .props.fieldProps} />
    </Form.Item
  );
};
```

So the props we set for ProFormText are actually for Form.Item, and the fieldProps are for the included Input, remember.

In addition to display type form items, we also provide form items for combining data:

## ProFormFieldSet

ProFormFieldSet can combine the values of multiple children inside and store them in ProForm, and can be transformed at commit time via `transform`. Here is a simple usage to easily combine multiple input fields and format them to the desired data.

```tsx | pure
<ProFormFieldSet
  name="list"
  label="List of components"
  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
>
  <ProFormText width="md" />
  <ProFormText width="md" />
  <ProFormText width="md" />
</ProFormFieldSet
```

## ProFormDependency

ProFormDependency is a simplified version of Form.Item with noStyle and shouldUpdate built in by default, we just need to configure name to determine which data we depend on and ProFormDependency will automatically handle the diff and and extract the corresponding values from the form. ProFormDependency will automatically process the diff and extract the corresponding values from the form.

The name parameter must be an array, if it is a nested structure you can configure it like this `name={['name', ['name2', 'text']]}`. The value of the configured name will be passed in renderProps. `name={['name', ['name2', 'text']]}` The value of the values passed in is `{ name: string,name2: { text:string }`.

```tsx | pure
<ProFormDependency name={['name']}>
  {({ name }) => {
    return (
      <ProFormSelect
        options={[
          {
            value: 'chapter',
            label: 'Effective when stamped',
          },
        ]}
        width="md"
        name="useMode"
        label={`Contractual agreement with `${name`` to take effect `}
      />
    );
  }}
</ProFormDependency>
```

## 代码示例

### Full amount of form field

<code src="./demos/components-other.tsx" heigh="1774px"/>

### Read-only for form field

<code src="./demos/components-other-readonly.tsx" heigh="1774px"/>

## API

ProForm comes with Filed , which basically corresponds to the valueType one by one.

### Generic properties

| parameter | description | type | default |
| --- | --- | --- | --- | --- |
| width | The length of the Field, we summarize the common Field lengths and suitable scenarios, support some enumeration "xs" , "s" , "m" , "l" , "x" | `number \| "xs" \| "s" \| "m" \| "l" \| "x"` | - | tooltip |
| tooltip | will add an icon next to the label to show the configured information when hovered | `string \| tooltipProps` | - |
| secondary | Whether secondary control, only valid for LightFilter | `boolean` | `false` |
| allowClear | Support for clearing, valid for LightFilter, will also be passed to `fieldProps` | `boolean` | `true` | if actively set. |

### Width

In some cases, we need to adapt the input box according to the page display, except that a form area should use the fixed width rule by default.

! [width info](https://gw.alipayobjects.com/zos/antfincdn/CyJPTSL07y/1574664269794-254db9de-2574-4361-bcf1-b82c6db0c80a.png)

- `XS=104px` for short numbers, short text or options.
- `S=216px` for shorter field entries, such as name, phone, ID, etc.
- `M=328px` Standard width, suitable for most field lengths.
- `L=440px` Suitable for longer field entries, such as long URLs, tag groups, file paths, etc.
- `XL=552px` Suitable for long text entry, such as long links, descriptions, notes, etc., usually used with adaptive multi-line input boxes or fixed height text fields.

### ProFormText

Same as [Input](https://ant.design/components/input-cn/).

```tsx | pure
<ProFormText name="text" label="Name" placeholder="Please enter a name" fieldProps={inputProps} />
```

### ProFormText.Password

Same as [Input.Password](https://ant.design/components/input-cn/#Input.Password).

```tsx | pure
<ProFormText.Password label="InputPassword" name="input-password" />
```

### ProFormDatePicker

Same as [DatePicker](https://ant.design/components/date-picker-cn/).

```tsx | pure
<ProFormDatePicker name="date" label="date" />
```

### ProFormDateTimePicker

Same as [DatePicker](https://ant.design/components/date-picker-cn/).

```tsx | pure
<ProFormDateTimePicker name="datetime" label="date" />
```

### ProFormDateRangePicker

Same as [DatePicker](https://ant.design/components/date-picker-cn/).

```tsx | pure
<ProFormDateRangePicker name="dateRange" label="date" />
```

### ProFormDateTimeRangePicker

Same as [DatePicker](https://ant.design/components/date-picker-cn/).

```tsx | pure
<ProFormDateRangePicker name="datetimeRange" label="date" />
```

### ProFormTimePicker

Same as [DatePicker](https://ant.design/components/date-picker-cn/)

```tsx | pure
<ProFormDateRangePicker name="time" label="time" />
```

### ProFormTextArea

Same as [Input](https://ant.design/components/input-cn/).

```tsx | pure
<ProFormTextArea
  name="text"
  label="name"
  placeholder="Please enter a name"
  fieldProps={inputTextAreaProps}
/>
```

### ProFormCheckbox

> Requesting remote data is more complicated, see [here](/components/field#remote data) for details.

Same as [checkbox](https://ant.design/components/checkbox-cn/), but supports `options` and `layout`.

| parameters | description | type | default | | --- | --- | --- | --- | options | options | Same as select, generates child nodes based on options, recommended. | `string[]` \| `{label:ReactNode,value:string}[]` | - | | layout | Configure the look of the checkbox to support vertical `vertical` and `horizontal` | `horizontal` \| `vertical` | - |

```tsx | pure
<ProFormCheckbox.Group
  name="checkbox"
  layout="vertical"
  label="Industry Distribution"
  options={['Agriculture', 'Manufacturing', 'Internet']}
/>
```

### ProFormRadio.Group

> Requesting remote data is more complicated, see [here](/components/field#remote data) for details.

Same as [radio](https://ant.design/components/radio-cn/) but with support for `options`.

| parameters | description | type | default | | --- | --- | --- | --- | options | options | Same as select, generates child nodes based on options, recommended. | `string[]` \| `{label:ReactNode,value:string}[]` | - | | radioType | Set whether button mode or radio mode | `button` \| `radio` | `radio` |

```tsx | pure
<ProFormRadio.Group
  name="radio-group"
  label="Radio.Group"
  options={[
    {
      label: 'item 1',
      value: 'a',
    },
    {
      label: 'item 2',
      value: 'b',
    },
    {
      label: 'item 3',
      value: 'c',
    },
  ]}
/>
```

### ProFormSwitch

与 [switch](https://ant.design/components/switch-cn/) 相同。

```tsx | pure
<ProFormSwitch name="switch" label="Switch" />
```

### ProFormRate

与 [rate](https://ant.design/components/rate-cn/) 相同。

```tsx | pure
<ProFormRate name="rate" label="Rate" />
```

### ProFormSlider

与 [slider](https://ant.design/components/slider-cn/) 相同。

```tsx | pure
<ProFormSlider
  name="slider"
  label="Slider"
  marks={{
    0: 'A',
    20: 'B',
    40: 'C',
    60: 'D',
    80: 'E',
    100: 'F',
  }}
/>
```

### ProFormUploadDragger

Same as [upload](https://ant.design/components/upload-cn/). Dragger style is preset, otherwise it is the same as Upload.

| Parameters  | Description               | Type            | Default                          |
| ----------- | ------------------------- | --------------- | -------------------------------- | -------------------------------------------- |
| icon        | The chart of the Dragger. | `ReactNode`     | InboxOutlined                    |
| title       | Title                     | Dragger's title | `ReactNode`                      | 'Click or drag files to this area to upload' |
| description | Dragger's description     | `ReactNode`     | 'Support single or bulk uploads' |

```tsx | pure
<ProFormUploadDragger label="Dragger" name="dragger" action="upload.do" />
```

### ProFormUploadButton

Same as [upload](https://ant.design/components/upload-cn/). The Button style is preset, otherwise it is the same as Upload.

| Parameters | Description           | Type        | Default         |
| ---------- | --------------------- | ----------- | --------------- |
| icon       | The chart of Dragger. | `ReactNode` | UploadOutlined  |
| title      | Dragger's title       | `ReactNode` | Click to upload |

```tsx | pure
<ProFormUploadButton label="upload" name="upload" action="upload.do" />
```

### ProFormSelect

Same as [select](https://ant.design/components/select-cn/). Both request and valueEnum are supported to generate options.

> Requesting remote data is more complicated, see [here](/components/field#remote data) for details.

> Why support valueEnum when you have options? valueEnum can be used with tables, descriptions, and has engineering advantages.

| parameters | description | type | default |
| --- | --- | --- | --- |
| valueEnum | Enumeration of current values [valueEnum](/components/table#valueenum) | `{[key:string`\|`number]:any}` | - |
| request | Enumerate data from network requests | `()=>Promise<{[key:string`\|`number]:any}>` | - |

```tsx | pure
<>
  <ProFormSelect
    name="select"
    label="Select"
    valueEnum={{
      open: 'Unresolved',
      closed: 'Resolved',
    }}
    placeholder="Please select a country"
    rules={[{ required: true, message: 'Please select your country!' }]}
  />

  <ProFormSelect
    name="select2"
    label="Select"
    request={async () => [
      { label: 'all', value: 'all' }
      { label: 'Unresolved', value: 'open' }
      { label: 'Resolved', value: 'closed' }
      { label: 'Resolving', value: 'processing' },
    ]}
    placeholder="Please select a country"
    rules={[{ required: true, message: 'Please select your country!' }]}
  />
</>
```

### ProFormDigit

Same as [inputNumber](https://ant.design/components/input-number-cn/). It comes with a formatting (retains 2 decimal places, minimum value is 0), you can turn it off if needed.

```tsx | pure
<ProFormDigit label="InputNumber" name="input-number" min={1} max={10} />
```

If you want to change the number of decimal places.

```tsx | pure
<ProFormDigit
  label="InputNumber"
  name="input-number"
  min={1}
  max={10}
  fieldProps={{ precision: 0 }}
/>
```
