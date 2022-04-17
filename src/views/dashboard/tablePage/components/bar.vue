<template>
  <div ref="dashbordbar" :style="{ width, height }"></div>
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
        default: '480px',
      },
      datas: {
        type: Object,
        default: () => ({}),
      },
    },
    setup(props) {
      const dashbordbar = ref<HTMLDivElement | null>(null);
      const { setOptions, echarts } = useECharts(dashbordbar as Ref<HTMLDivElement>);
      const { datas } = toRefs(props);
      watch(
        () => datas.value,
        (val) => {
          setOptions(getOptions(val) as any);
        },
        { deep: true, immediate: true },
      );
      function getOptions(data = datas.value) {
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          xAxis: [
            {
              type: 'category',
              data: data.xAxis1,
            },
            {
              type: 'category',
              data: data.xAxis2,
            },
          ],
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: data.data,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)',
              },
            },
          ],
        };
      }
      return { dashbordbar };
    },
  });
</script>
