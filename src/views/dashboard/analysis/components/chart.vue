<template>
  <div class="analysis-bar">
    <div ref="analysisbar" :style="{ width, height }"></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, toRefs, watch } from 'vue';

  import { useECharts } from '/@/hooks/web/useECharts';

  export default defineComponent({
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: '100%',
      },
      datas: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const analysisbar = ref<HTMLDivElement | null>(null);
      const { setOptions, echarts } = useECharts(analysisbar as Ref<HTMLDivElement>);
      const { datas } = toRefs(props);
      watch(
        () => datas.value,
        (val) => {
          setOptions(getOptions(val) as any);
        },
        { deep: true, immediate: true },
      );
      function getOptions(data = datas.value) {
        const lists = data
          .slice(1, -1)
          .map((v: any) => {
            const list = v[3].split(',');
            if (list.length > 8) {
              return list;
            }
          })
          .filter((v) => v);
        let zheng = new Array(10).fill(0),
          fu = new Array(10).fill(0);
        lists.forEach((v) => {
          v.map((d, k) => (d.indexOf('-') > -1 ? fu[k]-- : zheng[k]++));
        });
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          legend: {
            data: ['失败', '成功'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          yAxis: [
            {
              type: 'value',
            },
          ],
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false,
              },
              data: new Array(10).fill(1).map((v, i) => i + 1),
            },
          ],
          series: [
            {
              name: '失败',
              type: 'bar',
              stack: 'Total',
              label: {
                show: true,
                position: 'inside',
              },
              emphasis: {
                focus: 'series',
              },
              data: fu,
            },
            {
              name: '成功',
              type: 'bar',
              stack: 'Total',
              label: {
                show: true,
                position: 'left',
              },
              emphasis: {
                focus: 'series',
              },
              data: zheng,
            },
          ],
        };
      }
      return { analysisbar };
    },
  });
</script>
<style lang="less" scoped>
  .analysis-bar {
    position: relative;
    height: 100%;
    .topRight {
      height: 25px;
      position: absolute;
      top: 10px;
      right: 14px;
    }
  }
</style>
