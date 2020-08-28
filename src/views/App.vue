<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { getSmsLogListUrl, getSmsTemplateListUrl } from '../utils/paths';
import { MenuItemType } from '@tager/admin-layout';

export default defineComponent({
  name: 'App',
  setup() {
    const menuItemList: Array<MenuItemType> = [
      {
        id: 'sms',
        text: 'SMS Notifications',
        icon: 'sms',
        children: [
          { text: 'Templates', url: getSmsTemplateListUrl() },
          { text: 'Logs', url: getSmsLogListUrl() },
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
