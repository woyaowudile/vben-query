<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { basicProps } from './props';

  const props = defineProps({
    ...basicProps,
    datas: {
      type: Array,
      default: () => [],
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  function init() {
    const val = props.datas;
    if (val?.length) {
      let maxlength = [];
      val.forEach((v) => {
        if (v.results.length > maxlength.length) {
          maxlength = v.results.map((d) => d.d);
        }
      });
      const options = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: val.map((v) => `${v.code}:${v.id}`),
        },
        xAxis: {
          type: 'category',
          data: maxlength,
        },
        yAxis: {
          type: 'value',
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
          },
        ],
        series: val.map((v) => {
          let length = v.results.length;
          let sub = maxlength.length - length;
          let newArray = new Array(sub).fill(0);
          let data = v.results.map((d) => d.c);
          data.splice(0, 0, ...newArray);
          return {
            data,
            name: `${v.code}:${v.id}`,
            type: 'line',
            smooth: true,
          };
        }),
      };
      console.log(options);
      return options;
    }
  }
  onMounted(() => {
    console.log(props.datas);
    setOptions(init());
  });
</script>
