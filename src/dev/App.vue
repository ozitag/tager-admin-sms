<template>
  <PageLayout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </PageLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { MenuItemType, PageLayout } from '@tager/admin-layout';
import { SmsIcon } from '@tager/admin-ui';
import { useI18n } from '@tager/admin-services';

import { getSmsTemplateListUrl, getSmsLogListUrl } from '../utils/paths';

export default defineComponent({
  name: 'App',
  components: {
    PageLayout,
  },
  setup() {
    const { t } = useI18n();

    const sidebarMenuList: Array<MenuItemType> = [
      {
        id: 'sms',
        text: t('sms:SMSNotifications'),
        icon: SmsIcon,
        children: [
          { text: t('sms:templates'), url: getSmsTemplateListUrl() },
          { text: t('sms:logs'), url: getSmsLogListUrl() },
        ],
      },
    ];

    return {
      sidebarMenuList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
