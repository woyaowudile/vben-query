<template>
  <div class="analysis-pie">
    <div ref="analysispie" :style="{ width, height }" @click="pieClick"></div>
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
      const analysispie = ref<HTMLDivElement | null>(null);
      const { setOptions, echarts } = useECharts(analysispie as Ref<HTMLDivElement>);
      const { datas } = toRefs(props);
      watch(
        () => datas.value,
        (val) => {
          setOptions(getOptions(val) as any);
        },
        { deep: true, immediate: true },
      );
      function getOptions(data = datas.value) {
        debugger;
        const success = data
          .slice(1, -1)
          .map((v: any) => {
            const list = v[3].split(',');
            if (list.length > 8) {
              return list;
            }
          })
          .filter((v: any) => v?.indexOf('-100%') > -1);
        const fail = data
          .slice(1, -1)
          .map((v: any) => {
            const list = v[3].split(',');
            if (list.length > 8) {
              return list;
            }
          })
          .filter((v: any) => v?.indexOf('-100%') === -1);
        return {
          title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '50%',
              data: [
                {
                  value: success?.length,
                  name: '成功',
                },
                {
                  value: fail?.length,
                  name: '失败',
                },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        };
      }
      function pieClick(params) {
        debugger;
      }
      return { analysispie, pieClick };
    },
  });
</script>
<style lang="less" scoped>
  .analysis-pie {
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
