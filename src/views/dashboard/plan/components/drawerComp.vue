<template>
  <BasicDrawer
    v-bind="$attrs"
    title="Modal Title"
    width="50%"
    showFooter
    @register="registerDrawer"
    @ok="handleSubmit"
    @visible-change="change"
  >
    <BasicForm @register="register" :model="state.data" :schemas="getModelSchemas(state.isAdd)" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { createVNode, defineComponent, nextTick, reactive, toRefs, unref, watch } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form';
  import { getModelSchemas } from './data';
  import { getqueryUpdate } from '/@/api/model/chooseModel';
  import { message, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    components: { BasicForm, BasicDrawer },
    props: {
      params: {
        type: Object,
        default: () => ({}),
      },
    },
    emits: ['on-ok'],
    setup(props, { emit }) {
      const state = reactive({
        data: null,
        isAdd: true,
      });
      const [registerDrawer, { closeDrawer }] = useDrawerInner((data) => {
        state.data = data;
        state.isAdd = data.isAdd;
        // debugger;
        // setFieldsValue(data);
      });
      const [register, { getFieldsValue, resetFields }] = useForm({
        labelWidth: 120,
        showActionButtonGroup: false,
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
      function change(value) {
        if (!value) {
          resetFields();
        }
      }
      async function handleSubmit() {
        let title = state.isAdd ? '新增' : '修改';
        Modal.confirm({
          title,
          icon: createVNode(ExclamationCircleOutlined),
          content: `确认 ${title} 吗？`,
          okText: '确认',
          cancelText: '取消',
          async onOk() {
            const values = getFieldsValue();
            const res = await getqueryUpdate({ id: state.data?.id, ...values });
            if (res.code === 0) {
              message.success('更新成功');
              closeDrawer();
              emit('on-ok');
            } else {
              message.error(res.message);
            }
          },
        });
      }

      return {
        state,
        registerDrawer,
        register,
        handleSubmit,
        change,
        getModelSchemas,
      };
    },
  });
</script>
