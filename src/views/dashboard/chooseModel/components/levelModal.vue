<template>
  <BasicModal v-bind="$attrs" @register="register" @ok="ok" @cancel="cancel" title="优先级">
    <a-input :value="state.value" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  export default defineComponent({
    components: { BasicModal },
    emits: ['on-modal-cancel', 'on-modal-ok'],
    setup(props, { emit }) {
      const [register, { closeModal, setModalProps }] = useModalInner();
      const state = reactive({
        value: 1,
      });
      return {
        state,
        register,
        closeModal,
        setModalProps: () => {
          setModalProps({ title: 'Modal New Title' });
        },
        cancel() {
          emit('on-modal-cancel');
        },
        ok() {
          emit('on-modal-ok', state.value);
        },
      };
    },
  });
</script>
