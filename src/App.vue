<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';

  // support Multi-language
  const { getAntdLocale } = useLocale();

  window.dicts = [
    {
      label: '亢龙有悔',
      value: 'isKlyh',
      conditions: [
        '第一天的阴线尽量小',
        '第二天的阴线尽量大',
        '第三天的阳线要低开高收',
        '均线并列下行,或10、20向下、60向上，如果触碰10均线后根据阴阳线定涨跌，',
        '往往有阳线触碰后第二天阴线开启下跌，注意可当天势头不对就卖，',
        '如果买入当天没有碰到10均线(包括影线，高开的阴线)，可以等第二天观察，',
        '一般来说，触碰后也没有突破10均线，大概率涨不上去',
        '横盘中，底底抬高，模型未创前低，果断买入(包括阳线过大)',
      ],
    },
    { label: '一箭双雕', value: 'isYjsd' },
    { label: '七星1', value: 'isQx1' },
    { label: '七星2', value: 'isQx2' },
    { label: '反客为主', value: 'isFkwz' },
    { label: '以逸待劳', value: 'isYydl' },
    { label: '出水芙蓉', value: 'isCsfr' },
    { label: '隔山打牛', value: 'isGsdn' },
    { label: '大有', value: 'isDy', conditions: ['慢速均线向上或趋平', '金叉后不久'] },
    {
      label: '峰回路转',
      value: 'isFhlz',
      conditions: [
        '模型中2根实体不要比最近的大',
        '模型开始站在10上或离10不远',
        '远离10后回调到10附近可继续等待, 看跌看涨主要看下穿10的k线，参考强弱突破',
        '模型第一根k线与前一个比较，要么跳空不回补(包括影线)，要么没缺口',
        '2周内',
      ],
    },
    {
      label: '龙战于野',
      value: 'isLzyy',
      conditions: [
        '底部的初始阶段',
        '如果是回调阶段，则不能高于前高',
        '60向上且k线在60上面，且不能离得60太远',
        '1-2周',
        '买入后上涨远离10，随后回靠10，如果接触到10的是阳线，则大概率上涨，下穿20结果参考强弱突破',
      ],
    },
    { label: '飞龙在天', value: 'isFlzt' },
    { label: '柳暗花明', value: 'isLahm' },
    {
      label: '事不过三',
      value: 'isSbg3',
      conditions: [
        '模型的阳线不能太大，不能高过前面阴线（除非是在金叉后，死叉后不能做）',
        '阳线不能完全站在20均线下，或者不能站在10均线下，后者成功率更高',
      ],
    },
    {
      label: '神龙摆尾0',
      value: 'isSlbw0',
      conditions: ['买点后3-5日，快速均线拐头向上，增加成功率'],
    },
    {
      label: '神龙摆尾1',
      value: 'isSlbw1',
      conditions: [
        '站上10均线后，突破安装强弱来定',
        '危险：与60金叉后，10在20的上面；10、20、60并头向下，或10、20有死叉的趋势；',
        '60向下，10与20向上金叉，后若是差不多10%可卖出',
      ],
    },
    { label: '神龙摆尾2', value: 'isSlbw2' },
    { label: '神龙摆尾3', value: 'isSlbw3' },
    { label: '神龙摆尾4', value: 'isSlbw4' },
    { label: '葛式八法1', value: 'isGsbf1' },
    { label: '葛式八法2', value: 'isGsbf2' },
    { label: '鱼跃龙门', value: 'isYylm' },
  ];

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>

<style lang="less">
  .ant-input-number {
    width: 100% !important;
  }
</style>
