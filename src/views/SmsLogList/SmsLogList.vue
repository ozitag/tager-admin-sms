<template>
  <page title="SMS Logs">
    <template v-slot:content>
      <base-table
        :column-defs="columnDefs"
        :row-data="rowData"
        :loading="isRowDataLoading"
        :error-message="errorMessage"
      >
        <template v-slot:cell(body)="{ row }">
          <body-cell :log="row" />
        </template>
        <template v-slot:cell(error)="{ row }">
          <error-cell :log="row" />
        </template>
      </base-table>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import { ColumnDefinition } from '@tager/admin-ui';
import { useResource } from '@tager/admin-services';

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
    const [fetchLogList, { data: logList, loading, error }] = useResource<
      Array<SmsLog>
    >({
      fetchResource: getSmsLogList,
      initialValue: [],
      context,
      resourceName: 'SMS log list',
    });

    onMounted(() => {
      fetchLogList();
    });

    return {
      columnDefs: COLUMN_DEFS,
      rowData: logList,
      isRowDataLoading: loading,
      errorMessage: error,
    };
  },
});
</script>

<style scoped lang="scss"></style>
