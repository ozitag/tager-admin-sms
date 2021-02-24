<template>
  <page :title="t('sms:SMSLogs')">
    <template v-slot:content>
      <data-table
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
        <template v-slot:cell(body)="{ row }">
          <body-cell :log="row" />
        </template>
        <template v-slot:cell(error)="{ row }">
          <error-cell :log="row" />
        </template>
      </data-table>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';
import {
  ColumnDefinition,
  useDataTable,
  useTranslation,
} from '@tager/admin-ui';

import { SmsLog } from '../../typings/model';
import { getSmsLogList } from '../../services/requests';
import { capitalizeWord } from '../../utils/common';

import BodyCell from './components/BodyCell.vue';
import ErrorCell from './components/ErrorCell.vue';

export default defineComponent({
  name: 'SmsTemplateList',
  components: { BodyCell, ErrorCell },
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

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
      context,
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
