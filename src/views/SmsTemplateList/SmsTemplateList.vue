<template>
  <Page :title="$i18n.t('sms:SMSTemplates')">
    <template #content>
      <BaseTable
        :column-defs="columnDefs"
        :row-data="rowData"
        :loading="isRowDataLoading"
        :error-message="errorMessage"
        enumerable
      >
        <template #cell(recipients)="{ row }">
          <ul>
            <li v-for="(recipient, index) of row.recipients" :key="index">
              {{ recipient }}
            </li>
          </ul>
        </template>

        <template #cell(actions)="{ row }">
          <BaseButton
            variant="icon"
            :title="$i18n.t('sms:edit')"
            :href="getSmsTemplateFormUrl({ templateId: row.id })"
          >
            <EditIcon />
          </BaseButton>
        </template>
      </BaseTable>
    </template>
  </Page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import {
  BaseButton,
  BaseTable,
  ColumnDefinition,
  EditIcon,
} from '@tager/admin-ui';
import { useI18n, useResource } from '@tager/admin-services';
import { Page } from '@tager/admin-layout';

import { SmsTemplateShort } from '../../typings/model';
import { getSmsTemplateList } from '../../services/requests';
import { getSmsTemplateFormUrl } from '../../utils/paths';

export default defineComponent({
  name: 'SmsTemplateList',
  components: { EditIcon, BaseButton, BaseTable, Page },
  setup() {
    const { t } = useI18n();

    const [fetchTemplateList, { data: templateList, loading, error }] =
      useResource<Array<SmsTemplateShort>>({
        fetchResource: getSmsTemplateList,
        initialValue: [],
        resourceName: 'SMS template list',
      });

    onMounted(() => {
      fetchTemplateList();
    });

    const columnDefs: Array<ColumnDefinition<SmsTemplateShort>> = [
      {
        id: 1,
        name: t('sms:name'),
        field: 'name',
      },
      {
        id: 4,
        name: t('sms:recipients'),
        field: 'recipients',
      },
      {
        id: 5,
        name: t('sms:actions'),
        field: 'actions',
        style: { width: '80px', textAlign: 'center' },
        headStyle: { width: '80px', textAlign: 'center' },
      },
    ];

    return {
      t,
      columnDefs,
      rowData: templateList,
      isRowDataLoading: loading,
      errorMessage: error,
      getSmsTemplateFormUrl,
    };
  },
});
</script>

<style scoped lang="scss"></style>
