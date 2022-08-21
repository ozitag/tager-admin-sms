<template>
  <Page :title="$i18n.t('sms:SMSLogs')">
    <template #content>
      <DataTable
        :column-defs="columnDefs"
        :row-data="rowData"
        :loading="isRowDataLoading"
        :error-message="errorMessage"
        :search-query="searchQuery"
        :pagination="{
          pageCount,
          pageNumber,
          pageSize,
          disabled: isRowDataLoading,
        }"
        @change="handleChange"
      >
        <template #cell(body)="{ row }">
          <BodyCell :log="row" />
        </template>
        <template #cell(error)="{ row }">
          <ErrorCell :log="row" />
        </template>
      </DataTable>
    </template>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ColumnDefinition, useDataTable, DataTable } from '@tager/admin-ui';
import { useI18n } from '@tager/admin-services';
import { Page } from '@tager/admin-layout';

import { SmsLog } from '../../typings/model';
import { getSmsLogList } from '../../services/requests';
import { capitalizeWord } from '../../utils/common';

import BodyCell from './components/BodyCell.vue';
import ErrorCell from './components/ErrorCell.vue';

export default defineComponent({
  name: 'SmsTemplateList',
  components: { Page, BodyCell, ErrorCell, DataTable },
  setup() {
    const { t } = useI18n();

    const {
      isLoading: isRowDataLoading,
      rowData: logList,
      errorMessage,
      searchQuery,
      handleChange,
      pageCount,
      pageNumber,
      pageSize,
    } = useDataTable<SmsLog>({
      fetchEntityList: (params) =>
        getSmsLogList({
          query: params.searchQuery,
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
        }),
      initialValue: [],
      resourceName: 'SMS log list',
      pageSize: 250,
    });

    const columnDefs: Array<ColumnDefinition<SmsLog>> = [
      {
        id: 1,
        name: 'ID',
        field: 'id',
        style: { width: '50px', textAlign: 'center' },
        headStyle: { width: '50px', textAlign: 'center' },
      },
      { id: 3, name: t('sms:recipient'), field: 'recipient' },
      { id: 5, name: t('sms:body'), field: 'body' },
      {
        id: 6,
        name: t('sms:status'),
        field: 'status',
        format: ({ row }) => capitalizeWord(row.status),
      },
      { id: 7, name: t('sms:date'), field: 'createdAt', type: 'datetime' },
      {
        id: 9,
        name: t('sms:error'),
        field: 'error',
        useCustomDataCell: true,
        headStyle: { width: '300px' },
      },
    ];

    return {
      t,
      columnDefs,
      rowData: logList,
      isRowDataLoading,
      errorMessage,
      searchQuery,
      handleChange,
      pageCount,
      pageNumber,
      pageSize,
    };
  },
});
</script>

<style scoped lang="scss"></style>
