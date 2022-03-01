<template>
  <div class="table-page">
    <CollapseContainer title="表格数据一览">
      <BasicTable @register="tableClass.table.register" @edit-end="tableEditEnd">
        <template #toolbar>
          <div>
            <a-button color="success" @click="chooseOk">确认展示选中项</a-button>
            <a-button color="success" @click="chooseDel">删除所选</a-button>
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
  import { getqueryDelete, getqueryChart, getqueryUpdate } from '/@/api/model/chooseModel';
  import { QueryTable } from './utils';
  import { message, Button, Tabs } from 'ant-design-vue';
  import _ from 'lodash-es';

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

      async function del(ids) {
        const res: any = await getqueryDelete({ id: ids });
        res.code === 0 && message.success(res.message);
        res.code === 1 && message.error(res.message);
        tableClass.table.reload();
      }
      function returnOmitFields(data: object, other?: string[]) {
        const omitFields = [
          'cancelCbs',
          'editValueRefs',
          'onCancelEdit',
          'onEdit',
          'onSubmitEdit',
          'onValid',
          'submitCbs',
          'validCbs',
        ];
        // 去掉指定的字段
        let ohterParams = other || [];
        return _.omit(data, ...omitFields, ...ohterParams);
      }
      async function tableEditEnd({ record, index, key, value }) {
        const res: any = await getqueryUpdate({ level: value, id: record.id });
        res.code === 0 && message.success(res.message);
        res.code === 1 && message.error(res.message);
      }
      return {
        state,
        tableClass,
        tableEditEnd,
        async chooseOk() {
          let rows = tableClass.table.getSelectRows();
          if (!rows.length) {
            message.warn('请选择至少一条');
            return;
          }
          state.results = [];
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
        async chooseDel() {
          let rows = tableClass.table.getSelectRows();
          if (!rows.length) {
            message.warn('请选择至少一条');
            return;
          }
          del(rows.map((v) => v.id));
        },
        async delFn(record) {
          del(record.id);
        },
      };
    },
  });
</script>

<style lang="less" scoped></style>
