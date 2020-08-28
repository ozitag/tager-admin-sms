<template>
  <navigation-grid :nav-items="navItemList" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { NavigationGridItem } from '@tager/admin-ui';

import { getSmsLogListUrl, getSmsTemplateListUrl } from '../utils/paths';

export default defineComponent({
  name: 'Home',
  setup() {
    const smsNavItem = ref<NavigationGridItem>({
      name: 'SMS',
      linkList: [
        { url: getSmsTemplateListUrl(), text: 'Templates' },
        { url: getSmsLogListUrl(), text: 'Logs' },
      ],
    });

    const navItemList = computed<Array<NavigationGridItem>>(() => [
      smsNavItem.value,
    ]);

    return { navItemList };
  },
});
</script>

<style scoped lang="scss"></style>
