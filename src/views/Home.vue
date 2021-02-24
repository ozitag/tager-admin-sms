<template>
  <navigation-grid :nav-items="navItemList" />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  SetupContext,
} from '@vue/composition-api';
import { NavigationGridItem, useTranslation } from '@tager/admin-ui';

import { getSmsLogListUrl, getSmsTemplateListUrl } from '../utils/paths';

export default defineComponent({
  name: 'Home',
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

    const smsNavItem = ref<NavigationGridItem>({
      name: 'SMS',
      linkList: [
        { url: getSmsTemplateListUrl(), text: t('sms:templates') },
        { url: getSmsLogListUrl(), text: t('sms:logs') },
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
