<template>
  <BasicDrawer v-bind="$attrs" title="Modal Title" width="50%" showFooter @ok="handleSubmit">
    <BasicForm @register="register" />

    <div class="mt-4">
      <a-image :width="200" :src="getImages" />
    </div>
  </BasicDrawer>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive, toRefs, unref } from 'vue';
  import { Image, message } from 'ant-design-vue';
  import { BasicDrawer } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form';
  import { getanalog, getqueryOne } from '/@/api/model/chooseModel';
  import { getOptions, getCallbacks } from '../data';
  export default defineComponent({
    components: { BasicForm, BasicDrawer, AImage: Image },
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
          field: 'codes',
          label: '类型',
          component: 'Input',
          defaultValue: '600,601,603,000,002',
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
        {
          field: 'random',
          label: '随机',
          component: 'Select',
          colProps: { span: 6 },
          defaultValue: 'Y',
          componentProps: {
            options: [
              { label: '是', value: 'Y' },
              { label: '否', value: 'N' },
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
      const getImages = computed(() => {
        const { label, value } = unref(state).modalImage;
        const name = value?.split('is')[1]?.toLocaleLowerCase();
        let url = '';
        if (name) {
          url = `http://qianniu.mengtianxiang.top/gupiao/${label}/${name}.png`;
        }
        return url;
      });
      async function handleSubmit() {
        unref(state).show = false;
        const values = getFieldsValue();

        queryOne(values);
      }
      async function queryOne(values) {
        const res = await getqueryOne({ ...values });
        unref(state).datas = res.data;
        // unref(state).callbacks = getCallbacks([item]);
        debugger;
        emit('on-ok', res.data, unref(state));
      }

      return {
        register,
        getImages,
        handleSubmit,
      };
    },
  });
</script>
