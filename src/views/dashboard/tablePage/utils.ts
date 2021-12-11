import { columns } from './data';
import { getqueryTable } from '/@/api/model/chooseModel';
import { BasicTableProps, useTable } from '/@/components/Table';
import _ from 'lodash-es';

class table {
  readonly tableConfig: BasicTableProps;
  public opts: any;
  constructor(opts: object) {
    this.opts = opts;
    this.tableConfig = {
      title: '案件列表',
      api: getqueryTable,
      columns,
      fetchSetting: {
        listField: 'data',
      },
      formConfig: {
        labelWidth: 100,
        schemas: [],
      },
      rowSelection: {
        type: 'checkbox',
      },
      clickToRowSelect: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      actionColumn: {
        width: 60,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
        fixed: 'left',
      },
    };
  }
}

export class QueryTable extends table {
  constructor(opts: object) {
    super(opts);
    const tabs = [{ name: '表格一览', key: 'table' }];
    tabs.map((v) => {
      const params = Object.assign({}, this.tableConfig);
      const [register, other] = useTable(params);
      this[v.key] = {
        register,
        ...other,
      };
    });
  }
}
