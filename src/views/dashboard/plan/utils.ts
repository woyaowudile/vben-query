import _ from 'lodash-es';
import { columns, formSchemas } from './data';
import { getqueryTable } from '/@/api/model/chooseModel';
import { BasicTableProps, useTable } from '/@/components/Table';

class table {
  readonly tableConfig: BasicTableProps;
  public opts: any;
  constructor(opts?: object) {
    this.opts = opts;
    this.tableConfig = {
      title: '交易计划',
      api: getqueryTable,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: formSchemas,
      },
      useSearchForm: false,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      actionColumn: {
        width: 120,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
        fixed: 'left',
      },
    };
  }
}

export class TableClass extends table {
  public tabs: object;
  constructor(opts?: object) {
    super(opts);
    const tabs = [
      {
        tabName: '计划列表', // 有用到tab组件必填
        key: 'plan', // 必填
        btns: [{ label: '新增', onClick: 'getAdd' }],
      },
    ];
    tabs.map((v) => {
      const params = Object.assign({}, this.tableConfig);
      const [register, other] = useTable(params);
      this[v.key] = {
        register,
        ...other,
      };
    });
    this.tabs = tabs;
  }
}
