<template>
  <div class="analog">
    <div>
      <a-button class="m-2" type="primary" @click="preClick">上一步</a-button>
      <a-button class="m-2" type="primary" @click="nextClick">下一步</a-button>
      <a-button class="m-2" type="primary" @click="openDrawer(true)">筛选</a-button>
    </div>
    <div>
      <div v-if="state.show" class="analog-chart">
        <!-- <div class="mt-2">{{ state.datas?.[0]?.code }}</div> -->
        <Chart
          class="px-4 mt-4"
          :id="getId()"
          :options="getOptions(state.options)"
          :callbacks="state.callbacks"
        />
        <Chart class="px-4 mt-4" :id="getId()" :options="getLineOptions(state.options)" />
        <div v-html="state.pieDatas"></div>
        <div v-html="getConditions"></div>
      </div>
    </div>
    <!-- <div class="button">
      <a-button type="primary" @click="btnClick">Primary</a-button>
    </div> -->
    <!-- <BasicModal v-bind="$attrs" @register="modalRegister" title="Modal Title"> </BasicModal> -->
    <drawer-comp @register="register" :state="state" @on-ok="drawerOk" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive } from 'vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import Chart from '../chooseModel/chart.vue';
  import drawerComp from './components/drawer.vue';
  import { getOptions, getLineOptions } from './data';

  export default defineComponent({
    components: { BasicModal, Chart, drawerComp },
    setup() {
      const state = reactive({
        modalImage: window.dicts.find((v) => 'isKlyh' === v.value),
        datas: [],
        options: {},
        callbacks: [] as any,
        time: new Date().getTime(),
        show: false,
        pieDatas: '',
      });
      const [register, { openDrawer, closeDrawer }] = useDrawer();
      const [modalRegister, { openModal }] = useModal();
      const getConditions = computed(() => {
        const conditions = state.modalImage?.conditions;
        return conditions?.join('<br />');
      });
      function btnClick() {
        openModal(true);
      }
      function preClick() {
        state.time -= 1 * 24 * 60 * 60 * 1000;
        filterData();
      }
      function nextClick() {
        state.time += 1 * 24 * 60 * 60 * 1000;
        filterData();
      }
      function drawerOk(datas, item, items) {
        closeDrawer();
        state.time = new Date(item[3]).getTime();
        filterData();
        let success = {};
        let fails = {};
        let zf = {};
        let df = {};
        items.coords.forEach((v, i) => {
          let arrs = v[4].split(',');
          arrs.some((d, k) => {
            let result = d.split('%')[0] / 1 || 0;
            if (d.indexOf('-') > -1) {
              fails[k] = fails[k] ? fails[k] + 1 : 1;
              df[k] = df[k] ? df[k] + result : result;
              return true;
            } else {
              success[k] = success[k] ? success[k] + 1 : 1;
              zf[k] = zf[k] ? zf[k] + result : result;
            }
          });
        });
        Object.keys(success).forEach((v, i) => {
          // const total = (fails[v] || 0) + (success[v] || 0);
          const total = items.coords.length;
          const ok = `<span>成功(${success[v] || 0})(${
            ((success[v] / total || 0) * 100).toFixed(2) + '%'
          })（${(zf[v] / (success[v] || 1)).toFixed(2)}）</span>`;
          const nok = `<span>失败(${fails[v] || 0})(${
            ((fails[v] / total || 0) * 100).toFixed(2) + '%'
          })（${(df[v] / (fails[v] || 1)).toFixed(2)}）</span>`;
          state.pieDatas += `<div>${i + 1}日：${ok}，${nok}</div>`;
        });
        state.pieDatas = `<div>${state.pieDatas}</div>`;
        state.show = true;
      }
      function filterData() {
        state.options = state.datas.filter((v) => new Date(v.d).getTime() <= state.time);
      }
      return {
        state,
        register,
        getConditions,
        openDrawer,
        modalRegister,
        btnClick,
        preClick,
        nextClick,
        drawerOk,
        getId() {
          return `${new Date().getTime() * Math.random()}`;
        },
        getOptions,
        getLineOptions,
      };
    },
  });
</script>

<style scoped lang="less">
  .analog {
    .analog-chart {
      height: 300px;
    }
    // .button {
    //   position: fixed;
    //   right: 0;
    //   top: 20%;
    // }
  }
</style>
