import { BasicColumn, FormSchema } from '/@/components/Table';

// 排序：优先级 > 买入日期 > 待定
export const columns: BasicColumn[] = [
  // { title: 'id', dataIndex: 'id', width: 40 },
  { title: '优先级', dataIndex: 'level', width: 120 },
  { title: '名称', dataIndex: 'name', width: 80 },
  { title: '代码', dataIndex: 'code', width: 80 },
  { title: '出现日期', dataIndex: 'find_date', width: 120 },
  { title: '买入日期', dataIndex: 'buy_date', width: 120 },
  { title: '买入价格（元）', dataIndex: 'buy', width: 80 },
  { title: '参考卖出（元）', dataIndex: 'sale_reference', width: 80 },
  { title: '卖出日期', dataIndex: 'sale_date', width: 120 },
  { title: '卖出价格（元）', dataIndex: 'sale', width: 80 },
  { title: '参考利润（元）', dataIndex: 'profit_reference', width: 80 },
  { title: '实际利润（元）', dataIndex: 'profit', width: 80 },
  { title: '待定', dataIndex: 'wait', width: 80 },
  { title: '周期', dataIndex: 'dwm', width: 50 },
  // { title: '开始日期', dataIndex: 'buy', width: 120 },
  { title: '理由/备注', dataIndex: 'remark', width: 120 },
];
export const formSchemas: FormSchema[] = [
  {
    field: 'settlementCode',
    label: '结算单号',
    component: 'Input',
    colProps: {
      xl: 8,
      xxl: 6,
    },
  },
];
