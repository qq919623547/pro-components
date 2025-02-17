import React from 'react';
import { message } from 'antd';
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormDatePicker,
} from '@ant-design/pro-form';

export default () => {
  return (
    <ProForm
      onFinish={async () => {
        message.success('提交成功');
      }}
      syncToUrl={(values, type) => {
        if (type === 'get') {
          // 为了配合 transform
          // startTime 和 endTime 拼成 createTimeRanger
          return {
            ...values,
            createTimeRanger: [values.startTime, values.endTime],
          };
        }
        // expirationTime 不同步到 url
        return {
          ...values,
          expirationTime: undefined,
        };
      }}
      initialValues={{
        name: '蚂蚁设计有限公司',
        useMode: 'chapter',
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="签约客户名称"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormDateRangePicker
        transform={(values) => {
          return {
            startTime: values[0],
            endTime: values[1],
          };
        }}
        width="md"
        name="createTimeRanger"
        label="合同生效时间"
      />

      <ProFormDatePicker width="md" name="expirationTime" label="合同失效时间" />
      <ProFormSelect
        options={[
          {
            value: 'chapter',
            label: '盖章后生效',
          },
        ]}
        width="sm"
        name="useMode"
        label="合同约定生效方式"
      />
    </ProForm>
  );
};
