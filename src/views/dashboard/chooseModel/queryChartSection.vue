<template>
  <div class="query-chart-section">
    <div
      ><a-checkbox v-model:checked="state.checked" @change="checkChange($event, state.code)">{{
        state.code
      }}</a-checkbox></div
    >
    <v-chart :id="getId()" :options="state.options1" :callbacks="state.callbacks" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, watch, toRefs, unref } from 'vue';
  import { Checkbox, message } from 'ant-design-vue';
  import vChart from './chart.vue';
  import { getqueryInsert, getqueryDelete } from '/@/api/model/chooseModel';

  export default defineComponent({
    components: {
      vChart,
      ACheckbox: Checkbox,
    },
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
      queryFn: Function,
    },
    setup(props) {
      const { item, queryFn } = toRefs(props);
      function MA(datas, n) {
        let lists = datas.map((v, start) => {
          if (start < n) return '';
          let data = datas.slice(start - (n - 1), start + 1);
          let count = data.reduce((x, y) => {
            let x1 = x.c ? x.c / 1 : x;
            let y1 = y.c ? y.c / 1 : y;
            return x1 + y1;
          }, 0);
          return (count / n).toFixed(2) / 1;
        });
        return lists;
      }
      function splitData(rawData) {
        let datas = rawData.datas;
        let categoryData = (datas || []).map((v) => v.d);
        let values = (datas || []).map((v) => [v.o, v.c, v.l, v.h, v.v]);
        let volumes = (datas || []).map((v, i) => [i, v.v, v.o > v.c ? 1 : -1]);
        let MA10 = MA(datas, 10, 10);
        let MA20 = MA(datas, 20, 20);
        let MA60 = MA(datas, 60, 60);

        return {
          categoryData,
          values,
          volumes,
          MA10,
          MA20,
          MA60,
        };
      }
      function calculateMA(dayCount, data) {
        return data[`MA${dayCount}`];
      }
      const state = reactive({
        callbacks: [],
        options1: {},
        code: '',
        checked: false,
      });
      function init() {
        // let obj = item.value?.[0] || [];
        let obj = item.value;
        let data = splitData(item.value);
        let coords = obj.coords;
        // let coords = item.value.map(v => v.coords);
        let areas = coords.map((v) => ({
          brushType: 'lineX',
          coordRange: [v[1], v[2]],
          xAxisIndex: 0,
        }));
        state.code = obj.code;
        state.callbacks = [
          {
            name: 'dispatchAction',
            params: {
              type: 'brush',
              areas,
            },
          },
        ];
        state.options1 = {
          animation: false,
          legend: {
            bottom: 10,
            left: 'center',
            data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30'],
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
              color: '#000',
            },
            position: function (pos, params, el, elRect, size) {
              const obj = {
                top: 10,
              };
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
              return obj;
            },
            // extraCssText: 'width: 170px'
          },
          axisPointer: {
            link: [
              {
                xAxisIndex: 'all',
              },
            ],
            label: {
              backgroundColor: '#777',
            },
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: false,
              },
              brush: {
                type: ['lineX', 'clear'],
              },
            },
          },
          brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
              colorAlpha: 0.1,
            },
          },
          visualMap: {
            show: false,
            seriesIndex: 5,
            dimension: 2,
            pieces: [
              {
                value: 1,
                color: '#00da3c',
              },
              {
                value: -1,
                color: '#ec0000',
              },
            ],
          },
          grid: [
            {
              left: '10%',
              right: '8%',
              height: '50%',
            },
            {
              left: '10%',
              right: '8%',
              top: '63%',
              height: '16%',
            },
          ],
          xAxis: [
            {
              type: 'category',
              data: data.categoryData,
              scale: true,
              boundaryGap: false,
              axisLine: { onZero: false },
              splitLine: { show: false },
              min: 'dataMin',
              max: 'dataMax',
              axisPointer: {
                z: 100,
              },
            },
            {
              type: 'category',
              gridIndex: 1,
              data: data.categoryData,
              scale: true,
              boundaryGap: false,
              axisLine: { onZero: false },
              axisTick: { show: false },
              splitLine: { show: false },
              axisLabel: { show: false },
              min: 'dataMin',
              max: 'dataMax',
            },
          ],
          yAxis: [
            {
              scale: true,
              splitArea: {
                show: true,
              },
            },
            {
              scale: true,
              gridIndex: 1,
              splitNumber: 2,
              axisLabel: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false },
            },
          ],
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0, 1],
              start: 20,
              end: 100,
            },
            {
              xAxisIndex: [0, 1],
              type: 'slider',
              top: '85%',
              handleSize: '120%',
              handleIcon:
                'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              start: 0,
              end: 100,
            },
          ],
          series: [
            {
              name: 'Dow-Jones index',
              type: 'candlestick',
              data: data.values,
              itemStyle: {
                color0: '#00da3c',
                color: '#ec0000',
                borderColor: undefined,
                borderColor0: undefined,
              },
              tooltip: {
                formatter: function (param) {
                  param = param[0];
                  return [
                    'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                    'Open: ' + param.data[0] + '<br/>',
                    'Close: ' + param.data[1] + '<br/>',
                    'Lowest: ' + param.data[2] + '<br/>',
                    'Highest: ' + param.data[3] + '<br/>',
                  ].join('');
                },
              },
            },
            {
              name: 'MA10',
              type: 'line',
              data: calculateMA(10, data),
              smooth: true,
              lineStyle: {
                opacity: 0.5,
              },
            },
            {
              name: 'MA20',
              type: 'line',
              data: calculateMA(20, data),
              smooth: true,
              lineStyle: {
                opacity: 0.5,
              },
            },
            {
              name: 'MA60',
              type: 'line',
              data: calculateMA(60, data),
              smooth: true,
              lineStyle: {
                opacity: 0.5,
              },
            },
            {
              name: 'Volume',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: data.volumes,
            },
          ],
        };
      }
      async function checkChange({ target }, code) {
        let res = unref(item),
          result: any = {};
        if (!target.checked) {
          const getFormsValue = queryFn.value?.();
          result = await getqueryDelete({ code, models: getFormsValue.models });
        } else {
          const addConf = res.coords.map((v) => {
            return {
              name: window.dicts.find((d) => d.value === v[0])?.label,
              name_key: v[0],
              buy: v[1],
              code: res.code,
              type: res.code.slice(0, 3),
              dwm: res.dwm,
            };
          });
          result = await getqueryInsert(addConf);
        }
        message.success(result.message);
      }
      watch(
        () => item,
        ({ value }) => {
          if (!value) return;
          init();
        },
        { deep: true, immediate: true },
      );
      return {
        state,
        checkChange,
        getId() {
          return `${new Date().getTime() * Math.random()}`;
        },
      };
    },
  });
</script>

<style scoped>
  .query-chart-section {
    height: 300px;
  }
</style>
