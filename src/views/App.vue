<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

import { getSmsLogListUrl, getSmsTemplateListUrl } from '../utils/paths';
import { MenuItemType } from '@tager/admin-layout';
import { useTranslation } from '@tager/admin-ui';

export default defineComponent({
  name: 'App',
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

    const menuItemList: Array<MenuItemType> = [
      {
        id: 'sms',
        text: t('sms:SMSNotifications'),
        icon: 'sms',
        children: [
          { text: t('sms:templates'), url: getSmsTemplateListUrl() },
          { text: t('sms:logs'), url: getSmsLogListUrl() },
        ],
      },
    ];

    return {
      sidebarMenuList: menuItemList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
