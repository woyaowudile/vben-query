<template>
  <div class="table-page">
    <CollapseContainer title="表格数据一览">
      <BasicTable @register="tableClass.table.register">
        <template #toolbar>
          <div>
            <a-button color="success" @click="chooseOk">确认展示选中项</a-button>
          </div>
        </template>
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                label: '删除',
                popConfirm: {
                  title: '确认删除吗？',
                  confirm: () => delFn(record),
                },
              },
            ]"
          />
        </template>
      </BasicTable>
    </CollapseContainer>
    <CollapseContainer title="echarts一览">
      <a-tabs :tabBarStyle="{ backgroundColor: '#ffffff' }">
        <a-tabs-pane tab="11111">
          <div v-if="state.results.length">
            <ChartDatas :datas="state.results" />
          </div>
        </a-tabs-pane>
      </a-tabs>
    </CollapseContainer>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { BasicTable, TableAction } from '/@/components/Table/index';
  import { getqueryDelete, getqueryChart } from '/@/api/model/chooseModel';
  import { QueryTable } from './utils';
  import { message, Button, Tabs } from 'ant-design-vue';

  import ChartDatas from './components/chartDatas.vue';

  export default defineComponent({
    name: 'TablePage',
    components: {
      ATabs: Tabs,
      ATabsPane: Tabs.TabPane,
      AButton: Button,
      ChartDatas,
      CollapseContainer,
      BasicTable,
      TableAction,
    },
    setup() {
      const tableClass: any = new QueryTable({});
      const state = reactive({
        results: [],
      });
      return {
        state,
        tableClass,
        async chooseOk() {
          state.results = [];
          let rows = tableClass.table.getSelectRows();
          const res: any = await getqueryChart([...new Set(rows)]);

          res.code === 0 && message.success(res.message);
          res.code === 1 && message.error(res.message);

          state.results = rows.map((v) => {
            let { code, id, buy } = v;
            let datas = res.data.find((d) => d.id === id)?.datas;
            let results = datas.filter((d) => {
              let now = new Date(d.d).getTime();
              let compire = new Date(buy).getTime();
              return now >= compire;
            });
            return {
              code,
              id,
              results,
            };
          });
        },
        async delFn(record) {
          const res: any = await getqueryDelete({ id: record.id });
          debugger;
          res.code === 0 && message.success(res.message);
          res.code === 1 && message.error(res.message);
          tableClass.table.reload();
        },
      };
    },
  });
</script>

<style lang="less" scoped></style>
