import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: '名称', dataIndex: 'name', width: 60 },
  { title: 'id', dataIndex: 'id', width: 60 },
  { title: '代码', dataIndex: 'code', width: 60 },
  { title: '周期', dataIndex: 'dwm', width: 60 },
  { title: '开始日期', dataIndex: 'buy', width: 60 },
  { title: '买入日期', dataIndex: 'buyDate', width: 60 },
  { title: '卖出日期', dataIndex: 'saleDate', width: 60 },
  { title: '备注', dataIndex: 'remark', width: 120 },
];
