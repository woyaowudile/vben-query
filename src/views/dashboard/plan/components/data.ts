import { FormSchema } from '/@/components/Form';
import { isInterThousandth, thousandth } from '/@/utils/number';

function getModelSchemas(flag) {
  // flag: true表示是新增，false表示是编辑状态
  const list = [
    {
      field: 'name_key',
      label: '模型',
      component: 'Select',
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
      component: 'Input',
      componentProps: {},
    },
    {
      field: 'dwm',
      label: '周期',
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
      component: 'DatePicker',
      defaultValue: '',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
      },
    },
    {
      field: 'buy',
      label: '买入价格（元）',
      component: 'InputNumber',
      componentProps: ({ formModel }) => {
        return {
          onBlur(e) {
            formModel.profit_reference = thousandth(e.target.value * 1.3 + '');
          },
        };
      },
    },
    {
      field: 'sale_reference',
      label: '止损价格（元）',
      component: 'InputNumber',
      componentProps: {},
    },
    {
      field: 'sale_date',
      label: '卖出日期',
      component: 'DatePicker',
      defaultValue: '',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
      },
    },
    {
      field: 'sale',
      label: '实际卖出（元）',
      component: 'InputNumber',
      componentProps: {},
    },
    {
      field: 'profit_reference',
      label: '参考利润（元）',
      component: 'InputNumber',
      require: true,
      componentProps: {
        parser: thousandth,
      },
    },
    {
      field: 'profit',
      label: '实际利润（元）',
      component: 'InputNumber',
      componentProps: {},
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
      colProps: 24,
      componentProps: {},
    },
  ];
  return list as FormSchema[];
}

export { getModelSchemas };
