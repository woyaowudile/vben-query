<template>
  <div class="plan-page">
    <BasicTable
      v-for="(item, k) in tableClass.tabs"
      :key="k"
      @register="tableClass[item.key].register"
    >
      <template #action="{ record }">
        <TableAction :actions="getTableActionActions(record)" />
      </template>
      <template #toolbar v-if="item.btns">
        <div class="plan-list--table-btns">
          <a-button
            class="mx-2"
            v-for="(btn, i) in item.btns"
            v-auth="btn.auth"
            :key="i"
            :type="btn.type || 'primary'"
            @click="tableHeadrClick(btn.onClick, btn.params)"
            >{{ btn.label }}</a-button
          >
        </div>
      </template>
    </BasicTable>
    <drawerComp @register="state.drawer[0]" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import { TableClass } from './utils';
  import drawerComp from './components/drawerComp.vue';

  export default defineComponent({
    components: {
      TableAction,
      BasicTable,
      drawerComp,
    },
    setup() {
      const tableClass = new TableClass();
      const state = {
        drawer: [] as any[],
        params: {},
      };
      state.drawer = useDrawer();
      const { openDrawer, closeDrawer, setDrawerProps } = state.drawer[1];

      function getAdd(params) {
        openDrawer(true, params);
      }
      function getEdit(params) {
        params.isAdd = false;
        setDrawerProps(params);
        getAdd(params);
      }
      function tableHeadrClick(name, params = {}) {
        switch (name) {
          case 'getAdd':
            params.isAdd = true;
            getAdd(params);
            break;
          default:
            break;
        }
      }
      function getTableActionActions(record) {
        let params = {
          grade: record.level,
          ...record,
        };
        delete params.level;
        let lists: any[] = [{ label: '编辑', onclick: getEdit.bind(null, params) }];
        return lists;
      }
      return {
        tableClass,
        state,
        getTableActionActions,
        tableHeadrClick,
      };
    },
  });
</script>

<style scoped></style>
