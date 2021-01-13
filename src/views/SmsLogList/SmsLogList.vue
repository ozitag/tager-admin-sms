<template>
  <page title="SMS Logs">
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
import { defineComponent } from '@vue/composition-api';
import { ColumnDefinition, useDataTable } from '@tager/admin-ui';

import { SmsLog } from '../../typings/model';
import { getSmsLogList } from '../../services/requests';
import { capitalizeWord } from '../../utils/common';

import BodyCell from './components/BodyCell.vue';
import ErrorCell from './components/ErrorCell.vue';

const COLUMN_DEFS: Array<ColumnDefinition<SmsLog>> = [
  {
    id: 1,
    name: 'ID',
    field: 'id',
    style: { width: '50px', textAlign: 'center' },
    headStyle: { width: '50px', textAlign: 'center' },
  },
  { id: 3, name: 'Recipient', field: 'recipient' },
  { id: 5, name: 'Body', field: 'body' },
  {
    id: 6,
    name: 'Status',
    field: 'status',
    format: ({ row }) => capitalizeWord(row.status),
  },
  { id: 7, name: 'Date', field: 'createdAt', type: 'datetime' },
  {
    id: 9,
    name: 'Error',
    field: 'error',
    useCustomDataCell: true,
    headStyle: { width: '300px' },
  },
];

export default defineComponent({
  name: 'SmsTemplateList',
  components: { BodyCell, ErrorCell },
  setup(props, context) {
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

    return {
      columnDefs: COLUMN_DEFS,
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
