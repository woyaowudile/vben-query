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
    { label: '隔山打牛', value: '隔山打牛' },
    { label: '大有', value: '大有' },
    { label: '峰回路转', value: '峰回路转' },
    { label: '龙战与野', value: '龙战与野' },
    { label: '飞龙在天', value: '飞龙在天' },
    { label: '柳暗花明', value: '柳暗花明' },
    { label: '神0', value: '神0' },
    { label: '神1', value: '神1' },
    { label: '神2', value: '神2' },
    { label: '神3', value: '神3' },
    { label: '神4', value: '神4' },
    { label: '葛八', value: '葛八' },
  ];

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
