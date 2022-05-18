<template>
  <div class="model-test-page">
    <div>
      <a-button class="m-2" type="primary" @click="openDrawer(true)">筛选</a-button>
    </div>
    <div class="model-test--chart" v-if="state.show">
      <Chart class="px-4 mt-4" :id="getId()" :options="state.options" />
    </div>
    <drawer-comp @register="register" :state="state" @on-ok="drawerOk" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useDrawer } from '/@/components/Drawer';
  import DrawerComp from './drawer.vue';
  import Chart from '../chooseModel/chart.vue';

  export default defineComponent({
    components: { Chart, DrawerComp },
    setup() {
      const state = reactive({
        modalImage: window.dicts.find((v) => 'isKlyh' === v.value),
        datas: [],
        callbacks: [] as any,
        time: new Date().getTime(),
        show: false,
        pieDatas: '',
        options: {
          title: {
            text: 'Stacked Line',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['Email'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210],
            },
          ],
        },
      });
      const [register, { openDrawer, closeDrawer }] = useDrawer();
      function drawerOk({ values }) {
        state.show = true;
        closeDrawer();
        debugger;
      }
      return {
        state,
        register,
        openDrawer,
        drawerOk,
        getId() {
          return `${new Date().getTime() * Math.random()}`;
        },
      };
    },
  });
</script>

<style scoped lang="less">
  .model-test-page {
    .model-test--chart {
      height: 300px;
    }
  }
</style>
