import { FormSchema } from '/@/components/Form';

function getModelSchemas(state, modals) {
  const list = [
    {
      field: 'models',
      label: '模型',
      component: 'Select',
      colProps: { span: 6 },
      defaultValue: 'isKlyh',
      componentProps: ({ formModel }) => {
        return {
          // mode: 'multiple',
          options: window.dicts,
          onChange(e) {
            state.modalImage = window.dicts.find((v) => e === v.value);
          },
        };
      },
    },
    {
      field: 'startDate',
      label: '开始日期',
      component: 'DatePicker',
      defaultValue: new Date().toLocaleDateString(),
      colProps: { span: 6 },
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        onChange(e) {},
      },
    },
    {
      field: 'endDate',
      label: '结束日期',
      component: 'DatePicker',
      colProps: { span: 6 },
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        onChange(e) {},
      },
    },
    {
      field: 'code',
      label: '代码',
      component: 'Input',
      colProps: { span: 6 },
      componentProps: {
        onChange(e) {},
      },
    },
    {
      field: 'codes',
      label: '类型',
      component: 'Input',
      defaultValue: '600,601,603,000,002',
      colProps: { span: 6 },
      componentProps: {
        onChange(e) {},
      },
    },
    {
      field: 'dwm',
      label: '周期',
      component: 'Select',
      colProps: { span: 6 },
      defaultValue: 'd',
      componentProps: {
        options: [
          { label: '日', value: 'd' },
          { label: '周', value: 'w' },
          { label: '月', value: 'm' },
        ],
        onChange(e) {},
      },
    },
    {
      field: 'random',
      label: '随机',
      component: 'Select',
      colProps: { span: 6 },
      defaultValue: 'Y',
      componentProps: {
        options: [
          { label: '是', value: 'Y' },
          { label: '否', value: 'N' },
        ],
        onChange(e) {},
      },
    },
  ].filter((v) => modals.includes(v.field));
  return list as FormSchema[];
}

export { getModelSchemas };
