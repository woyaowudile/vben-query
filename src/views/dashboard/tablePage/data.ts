import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: 'id', dataIndex: 'id', width: 40 },
  { title: '周期', dataIndex: 'dwm', width: 50 },
  { title: '名称', dataIndex: 'name', width: 80 },
  { title: '代码', dataIndex: 'code', width: 80 },
  { title: '价格', dataIndex: 'price', width: 80 },
  { title: '优先级', dataIndex: 'level', width: 120, edit: true, editComponent: 'InputNumber' },
  { title: '开始日期', dataIndex: 'buy', width: 120 },
  { title: '买入日期', dataIndex: 'buy_date', width: 120 },
  { title: '卖出日期', dataIndex: 'sale_date', width: 120 },
  { title: '备注', dataIndex: 'remark', width: 120 },
];
