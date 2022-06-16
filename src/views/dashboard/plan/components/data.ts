import { FormSchema } from '/@/components/Form';
import { isInterThousandth, thousandth } from '/@/utils/number';

function getModelSchemas() {
  const list = [
    {
      field: 'name_key',
      label: '模型',
      component: 'Select',
      required: true,
      componentProps: ({ formModel }) => {
        return {
          // mode: 'multiple',
          options: window.dicts,
          onChange(e) {},
        };
      },
    },
    {
      field: 'code',
      label: '代码',
      required: true,
      component: 'Input',
    },
    {
      field: 'level',
      label: '优先级',
      component: 'InputNumber',
      format: thousandth as any,
      componentProps: {
        parser: isInterThousandth,
      },
    },
    {
      field: 'buy_date',
      label: '买入日期',
      required: true,
      component: 'DatePicker',
    },
    {
      field: 'buy',
      label: '买入价格（元）',
      component: 'InputNumber',
      required: true,
      componentProps: {
        parser: isInterThousandth,
      },
    },
    {
      field: 'sale_reference',
      label: '参考卖出（元）',
      required: true,
      component: 'DatePicker',
    },
    {
      field: 'sale_date',
      label: '卖出日期',
      required: true,
      component: 'DatePicker',
    },
    {
      field: 'sale',
      label: '卖出价格（元）',
      component: 'InputNumber',
      format: thousandth as any,
      required: true,
      componentProps: {
        parser: isInterThousandth,
      },
    },
    {
      field: 'profit_reference',
      label: '参考利润（元）',
      required: true,
      component: 'DatePicker',
    },
    {
      field: 'profit',
      label: '实际利润（元）',
      component: 'DatePicker',
    },
    {
      field: 'dwm',
      label: '周期',
      required: true,
      component: 'Select',
      componentProps: {
        options: [
          { label: '日', value: 'd' },
          { label: '周', value: 'w' },
          { label: '月', value: 'm' },
        ],
      },
    },
    {
      field: 'wait',
      label: '待定',
      component: 'Select',
      componentProps: {
        options: [
          { label: '是', value: 'Y' },
          { label: '否', value: 'N' },
        ],
      },
    },
    {
      field: 'remark',
      label: '备注',
      component: 'InputTextArea',
    },
  ];
  return list as FormSchema[];
}

export { getModelSchemas };
