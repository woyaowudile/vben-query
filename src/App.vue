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
    { label: '亢龙', value: 'isKlyh' },
    { label: '一箭双雕', value: 'isYjsd' },
    { label: '七星1', value: 'isQx1' },
    { label: '七星2', value: 'isQx2' },
    { label: '反客为主', value: 'isFkwz' },
    { label: '以逸待劳', value: 'isYydl' },
    { label: '出水芙蓉', value: 'isCsfr' },
    { label: '隔山打牛', value: 'isGsdn' },
    { label: '大有', value: 'isDy' },
    { label: '峰回路转', value: 'isFhlz' },
    { label: '龙战与野', value: 'isLzyy' },
    { label: '飞龙在天', value: 'isFlzt' },
    { label: '柳暗花明', value: 'isLahm' },
    { label: '神0', value: 'isSlbw0' },
    { label: '神1', value: 'isSlbw1' },
    { label: '神2', value: 'isSlbw2' },
    { label: '神3', value: 'isSlbw3' },
    { label: '神4', value: 'isSlbw4' },
    { label: '葛八', value: 'isG8M1' },
  ];

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
