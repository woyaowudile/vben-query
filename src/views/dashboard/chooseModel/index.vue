<template>
  <div>
    <div class="mt-2">
      <BasicForm @register="state.register" @submit="handleSubmit" />
      <div class="flexbox">
        <a-pagination
          show-size-changer
          :current="state.page"
          :pageSize="state.size"
          :total="state.total || 10"
          :pageSizeOptions="[10, 25, 50]"
          @change="changePage"
          @showSizeChange="changeSize"
        />
        <Button class="flex1" type="primay" @click.once="preCheckClick">预查数据</Button>
      </div>
    </div>
    <div class="choose-chart">
      <chart
        class="px-4 mt-4"
        v-for="(item, i) in state.res.data"
        :key="i"
        :item="item"
        :queryFn="getFieldsValue"
      />
    </div>
  </div>
</template>

<script>
  import { computed, onMounted, reactive } from 'vue-demi';
  import { BasicForm, useForm } from '/@/components/Form';
  import { getquery, getqueryBefore, getqueryTable } from '/@/api/model/chooseModel';
  import chart from './queryChartSection.vue';
  import { message, Button, Pagination } from 'ant-design-vue';
  import { createSessionStorage } from '/@/utils/cache';
  export default {
    components: { BasicForm, Button, chart, aPagination: Pagination },
    setup() {
      const session = createSessionStorage();
      const state = reactive({
        register: null,
        res: {},
        index: 0,
        page: 1,
        size: 10,
      });
      onMounted(async () => {
        session.set('stash_page', [null, { page: 1, index: 0 }]);
        // const res = await getqueryTable();
        // debugger;
      });
      const modalSchema = [
        {
          field: 'models',
          label: '模型',
          component: 'Select',
          colProps: { span: 6 },
          defaultValue: ['isKlyh'],
          componentProps: ({ formModel }) => {
            return {
              mode: 'multiple',
              options: window.dicts,
              onChange(e) {
                state.index = 0;
                state.page = 1;
              },
            };
          },
        },
        {
          field: 'date',
          label: '开始日期',
          component: 'DatePicker',
          defaultValue: new Date().toLocaleDateString(),
          colProps: { span: 6 },
          componentProps: {
            valueFormat: 'YYYY-MM-DD',
            onChange(e) {
              state.index = 0;
              state.page = 1;
            },
          },
        },
        {
          field: 'endDate',
          label: '结束日期',
          component: 'DatePicker',
          defaultValue: new Date().toLocaleDateString(),
          colProps: { span: 6 },
          componentProps: {
            valueFormat: 'YYYY-MM-DD',
          },
        },
        {
          field: 'codes',
          label: '类型',
          component: 'Input',
          defaultValue: '600,601,603,000,002',
          colProps: { span: 6 },
          componentProps: {
            onChange(e) {
              state.index = 0;
              state.page = 1;
            },
          },
        },
        {
          field: 'dwm',
          label: '周期',
          component: 'Select',
          colProps: { span: 6 },
          defaultValue: 'd',
          componentProps: {
            options: [
              { label: '日', value: 'd' },
              { label: '周', value: 'w' },
              { label: '月', value: 'm' },
            ],
            onChange(e) {
              state.index = 0;
              state.page = 1;
            },
          },
        },
        {
          field: 'isToday',
          label: '当日',
          component: 'Select',
          colProps: { span: 6 },
          defaultValue: 'N',
          componentProps: {
            options: [
              { label: '是', value: 'Y' },
              { label: '否', value: 'N' },
            ],
            onChange(e) {
              state.index = 0;
              state.page = 1;
            },
          },
        },
      ];
      const [register, { getFieldsValue }] = useForm({
        labelWidth: 80,
        // showActionButtonGroup: false,
        schemas: modalSchema,
        baseColProps: {
          xxl: 12,
          xs: 12,
          sm: 6,
          md: 6,
          lg: 6,
        },
        actionColOptions: {
          span: 24,
        },
      });
      state.register = register;
      async function init() {
        const values = getFieldsValue();
        state.res = [];
        const res = await getquery({
          ...values,
          index: state.index,
          page: state.page,
          size: state.size,
        });
        if (res.code === 1) {
          message.error(res.message);
        } else {
          message.success(res.message);
          state.res = res;
          state.index = res.index;
          state.total = res.total;
        }
      }
      function setPageSize(page, size) {
        state.page = page;
        state.size = size;
        init();
      }
      async function preCheckClick() {
        message.warn('正在预处理数据，请稍后...');
        const res = await getqueryBefore({
          ...getFieldsValue(),
          index: state.index,
          page: state.page,
          size: state.size,
        });
        message.success(res.message);
      }
      return {
        state,
        getFieldsValue,
        preCheckClick,
        async handleSubmit() {
          init();
        },
        changePage(page, size) {
          setPageSize(page, size);
        },
        changeSize(page, size) {
          setPageSize(page, size);
        },
      };
    },
  };
</script>

<style lang="less" scoped>
  .choose-chart {
  }
  // .flexbox {
  //   display: grid;
  //   grid-template-columns: 33% 33% 33%;
  //   grid-template-rows: 250px 250px 250px;
  // }
  // .flex1 {
  //   grid-template-columns: 100px 100px 100px;
  //   grid-template-rows: 100px 100px 100px;
  // }
  .flexbox {
    display: flex;
  }
  .flex1 {
    flex: 1;
  }
</style>
