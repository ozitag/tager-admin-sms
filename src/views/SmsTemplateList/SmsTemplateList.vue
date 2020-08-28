<template>
  <page title="SMS Templates">
    <template v-slot:content>
      <base-table
        :column-defs="columnDefs"
        :row-data="rowData"
        :loading="isRowDataLoading"
        :error-message="errorMessage"
        enumerable
      >
        <template v-slot:cell(recipients)="{ row }">
          <ul>
            <li v-for="(recipient, index) of row.recipients" :key="index">
              {{ recipient }}
            </li>
          </ul>
        </template>

        <template v-slot:cell(actions)="{ row }">
          <base-button
            variant="icon"
            title="Edit"
            :href="getSmsTemplateFormUrl({ templateId: row.id })"
          >
            <svg-icon name="edit"></svg-icon>
          </base-button>
        </template>
      </base-table>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import { ColumnDefinition } from '@tager/admin-ui';

import { SmsTemplateShort } from '../../typings/model';
import { getSmsTemplateList } from '../../services/requests';
import { getSmsTemplateFormUrl } from '../../utils/paths';
import { useResource } from '@tager/admin-services';

const COLUMN_DEFS: Array<ColumnDefinition<SmsTemplateShort>> = [
  {
    id: 1,
    name: 'Name',
    field: 'name',
  },
  {
    id: 4,
    name: 'Recipients',
    field: 'recipients',
  },
  {
    id: 5,
    name: 'Actions',
    field: 'actions',
    style: { width: '80px', textAlign: 'center' },
    headStyle: { width: '80px', textAlign: 'center' },
  },
];

export default defineComponent({
  name: 'SmsTemplateList',
  setup(props, context) {
    const [
      fetchTemplateList,
      { data: templateList, loading, error },
    ] = useResource<Array<SmsTemplateShort>>({
      fetchResource: getSmsTemplateList,
      initialValue: [],
      context,
      resourceName: 'SMS template list',
    });

    onMounted(() => {
      fetchTemplateList();
    });

    return {
      columnDefs: COLUMN_DEFS,
      rowData: templateList,
      isRowDataLoading: loading,
      errorMessage: error,
      getSmsTemplateFormUrl,
    };
  },
});
</script>

<style scoped lang="scss"></style>
