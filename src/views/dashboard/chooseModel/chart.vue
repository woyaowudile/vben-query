<template>
  <div class="v-cahrt" style="height: 100%">
    <!-- <chart :options="options"></chart> -->
    <div :id="id" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script lang="ts">
  import { watch, defineComponent, toRefs, onMounted, nextTick, ref, unref } from 'vue';
  import * as echarts from 'echarts';

  export default defineComponent({
    name: 'v-chart',
    // components: { chart },
    props: {
      options: {
        type: Object,
        default: () => ({}),
      },
      id: [Number, String],
      callbacks: Array,
    },
    setup(props) {
      const { id, options, callbacks } = toRefs(props);
      let myChart = ref(null) as any;

      watch(
        () => unref(options).series,
        (val) => {
          nextTick(() => {
            resize();
          });
        },
        { deep: true, immediate: true },
      );
      function resize() {
        myChart = echarts.init(document.getElementById(id.value as any) as any);
        myChart.setOption(options.value);
        if (callbacks.value) {
          callbacks.value.forEach(({ name, params }) => {
            myChart[name](params);
          });
        }
        myChart.resize();
      }
      return {};
    },
  });
</script>

<style scoped></style>
