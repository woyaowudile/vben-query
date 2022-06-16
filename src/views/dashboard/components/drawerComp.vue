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
  import { getModelSchemas } from './data';
  export default defineComponent({
    components: { BasicForm, BasicDrawer, AImage: Image },
    props: {
      state: {
        type: Object,
        default: () => ({}),
      },
      modals: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['on-ok'],
    setup(props, { emit }) {
      const { state, modals } = toRefs(props);

      const [register, { getFieldsValue }] = useForm({
        labelWidth: 80,
        showActionButtonGroup: false,
        schemas: getModelSchemas(unref(state), unref(modals)),
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
