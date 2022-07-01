import { BasicColumn, FormSchema } from '/@/components/Table';

// 排序：优先级 > 买入日期 > 待定
export const columns: BasicColumn[] = [
  // { title: 'id', dataIndex: 'id', width: 40 },
  { title: '名称', dataIndex: 'name', width: 100 },
  { title: '代码', dataIndex: 'code', width: 80 },
  { title: '实盘', dataIndex: 'is_real', width: 60 },
  { title: '止损', dataIndex: 'is_sl', width: 60 },
  { title: '待定', dataIndex: 'wait', width: 50 },
  { title: '出现日期', dataIndex: 'find_date', width: 120 },
  { title: '买入日期', dataIndex: 'buy_date', width: 120 },
  { title: '买入价格（元）', dataIndex: 'buy', width: 120 },
  { title: '止损价格（元）', dataIndex: 'sale_reference', width: 120 },
  { title: '卖出日期', dataIndex: 'sale_date', width: 120 },
  { title: '实际卖出（元）', dataIndex: 'sale', width: 120 },
  { title: '参考利润（元）', dataIndex: 'profit_reference', width: 120 },
  { title: '实际利润（元）', dataIndex: 'profit', width: 120 },
  { title: '优先级', dataIndex: 'level', width: 60 },
  { title: '周期', dataIndex: 'dwm', width: 50 },
  // { title: '开始日期', dataIndex: 'buy', width: 120 },
  { title: '理由/备注', dataIndex: 'remark', width: 200 },
];
export const formSchemas: FormSchema[] = [
  {
    field: 'name_key',
    label: '名称',
    component: 'Select',
    colProps: {
      xl: 6,
      xxl: 4,
    },
    componentProps: ({ formModel }) => {
      return {
        options: window.dicts,
      };
    },
  },
  {
    field: 'code',
    label: '代码',
    component: 'Input',
    colProps: {
      xl: 6,
      xxl: 4,
    },
  },
  {
    field: 'start_date',
    label: '出现日期',
    component: 'DatePicker',
    colProps: {
      xl: 6,
      xxl: 4,
    },
    defaultValue: new Date().toLocaleDateString(),
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'end_date',
    label: '结束日期',
    component: 'DatePicker',
    colProps: {
      xl: 6,
      xxl: 4,
    },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
