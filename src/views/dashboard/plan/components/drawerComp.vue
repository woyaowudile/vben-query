<template>
  <BasicDrawer
    v-bind="$attrs"
    title="Modal Title"
    width="50%"
    showFooter
    @register="registerDrawer"
    @ok="handleSubmit"
  >
    <BasicForm @register="register" :model="state.data" :schemas="getModelSchemas()" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, nextTick, reactive, toRefs, unref, watch } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form';
  import { getModelSchemas } from './data';
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
      });
      const [registerDrawer, { closeDrawer }] = useDrawerInner((data) => {
        debugger;
        state.data = data;
        // debugger;
        // setFieldsValue(data);
      });
      const [register, { getFieldsValue, setFieldsValue }] = useForm({
        labelWidth: 80,
        showActionButtonGroup: false,
        schemas: getModelSchemas(),
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
        const values = getFieldsValue();
        debugger;
      }

      return {
        state,
        registerDrawer,
        register,
        handleSubmit,
        getModelSchemas,
      };
    },
  });
</script>
