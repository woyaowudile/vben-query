<template>
  <BasicDrawer v-bind="$attrs" title="Modal Title" width="50%" showFooter @ok="handleSubmit">
    <BasicForm @register="register" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, toRefs, unref } from 'vue';
  import { BasicDrawer } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form';
  export default defineComponent({
    components: { BasicForm, BasicDrawer },
    props: {
      state: {
        type: Object,
        default: () => ({}),
      },
    },
    emits: ['on-ok'],
    setup(props, { emit }) {
      const { state } = toRefs(props);
      const modalSchema = [
        {
          field: 'models',
          label: '模型',
          component: 'Select',
          colProps: { span: 6 },
          defaultValue: 'isKlyh',
          componentProps: ({ formModel }) => {
            return {
              // mode: 'multiple',
              options: window.dicts,
              onChange(e) {
                unref(state).modalImage = window.dicts.find((v) => e === v.value);
              },
            };
          },
        },
        {
          field: 'startDate',
          label: '开始日期',
          component: 'DatePicker',
          defaultValue: new Date().toLocaleDateString(),
          colProps: { span: 6 },
          componentProps: {
            valueFormat: 'YYYY-MM-DD',
            onChange(e) {},
          },
        },
        {
          field: 'endDate',
          label: '结束日期',
          component: 'DatePicker',
          colProps: { span: 6 },
          componentProps: {
            valueFormat: 'YYYY-MM-DD',
            onChange(e) {},
          },
        },
        {
          field: 'code',
          label: '代码',
          component: 'Input',
          colProps: { span: 6 },
          componentProps: {
            onChange(e) {},
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
            onChange(e) {},
          },
        },
      ];
      const [register, { getFieldsValue }] = useForm({
        labelWidth: 80,
        showActionButtonGroup: false,
        schemas: modalSchema,
        baseColProps: {
          xxl: 24,
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
        },
        actionColOptions: {
          span: 24,
        },
      });
      async function handleSubmit() {
        unref(state).show = false;
        const values = getFieldsValue();
        emit('on-ok', { values });
      }
      return {
        register,
        handleSubmit,
      };
    },
  });
</script>
