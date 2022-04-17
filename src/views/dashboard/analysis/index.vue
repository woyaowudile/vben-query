<template>
  <div>
    <BasicForm @register="register" @submit="handleSubmit" />
    <div class="boxs">
      <div class="box" v-for="(item, k) in state.data" :key="k">
        <div>{{ item.name }}</div>
        <div class="container">
          <chartComp :datas="item.data" />
          <pieComp :datas="item.data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, reactive } from 'vue';
  import { getanalysis } from '/@/api/model/chooseModel';
  import { BasicForm, useForm } from '/@/components/Form';
  import chartComp from './components/chart.vue';
  import pieComp from './components/pie.vue';
  export default defineComponent({
    components: { BasicForm, chartComp, pieComp },
    setup() {
      const state = reactive({
        data: [],
      });
      const modalSchema = [
        {
          field: 'models',
          label: '模型',
          component: 'Select',
          colProps: { span: 6 },
          defaultValue: [
            'isKlyh',
            'isQx1',
            'isYjsd',
            'isQx2',
            'isFkwz',
            'isYydl',
            'isCsfr',
            'isGsdn',
            'isDy',
            'isFhlz',
            'isLzyy',
            'isFlzt',
            'isLahm',
            'isSlbw0',
            'isSlbw1',
            'isSlbw2',
            'isSlbw3',
            'isSlbw4',
          ],
          componentProps: ({ formModel }) => {
            return {
              maxTagCount: 1,
              mode: 'multiple',
              options: window.dicts,
            };
          },
        },
        {
          field: 'date',
          label: '日期',
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
          componentProps: {},
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
      async function handleSubmit(values) {
        const res = await getanalysis(values);
        state.data = res.data;
        debugger;
      }
      return {
        state,
        register,
        handleSubmit,
      };
    },
  });
</script>

<style lang="less" scoped>
  .container {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 300px;
    .box {
      height: 300px;
    }
  }
</style>
