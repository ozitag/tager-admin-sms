<template>
  <page
    :title="pageTitle"
    :is-content-loading="isContentLoading"
    :footer="{
      backHref: templateListRoutePath,
      onSubmit: submitForm,
      isSubmitting: isSubmitting,
    }"
  >
    <form novalidate @submit.prevent>
      <form-field
        v-model="values.recipients"
        name="recipients"
        :error="errors.recipients"
        :label="t('sms:recipients')"
      />

      <template>
        <form-field-message-template
          v-model="values.body"
          :label="t('sms:body')"
          :variable-list="variableList"
          :error="errors.body"
          type="textArea"
          name="body"
        />
      </template>
    </form>
  </page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  SetupContext,
  watch,
} from '@vue/composition-api';
import {
  convertRequestErrorToMap,
  Nullable,
  useResource,
} from '@tager/admin-services';

import { getSmsTemplate, updateSmsTemplate } from '../../services/requests';
import { getSmsTemplateListUrl } from '../../utils/paths';
import {
  convertFormValuesToSmsTemplateUpdatePayload,
  convertFormValuesToVariableList,
  convertSmsTemplateToFormValues,
  FormValues,
} from './SmsTemplateForm.helpers';
import { SmsTemplateFull } from '../../typings/model';
import { useTranslation, VariableType } from '@tager/admin-ui';

export default defineComponent({
  name: 'SmsTemplateForm',
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

    /** Sms template fetching */

    const smsTemplateId = computed<string>(
      () => context.root.$route.params.templateId
    );

    const [
      fetchSmsTemplate,
      { data: smsTemplate, loading: isSmsTemplateLoading },
    ] = useResource<Nullable<SmsTemplateFull>>({
      fetchResource: () => getSmsTemplate(smsTemplateId.value),
      initialValue: null,
      context,
      resourceName: 'SMS template',
    });

    onMounted(() => {
      fetchSmsTemplate();
    });

    watch(smsTemplateId, fetchSmsTemplate);

    /** Form State */
    const values = ref<FormValues>(
      convertSmsTemplateToFormValues(smsTemplate.value)
    );
    const errors = ref<Record<string, string>>({});
    const isSubmitting = ref<boolean>(false);

    watch(smsTemplate, () => {
      values.value = convertSmsTemplateToFormValues(smsTemplate.value);
    });

    function submitForm({ shouldExit }: { shouldExit: boolean }) {
      isSubmitting.value = true;

      const updateBody = convertFormValuesToSmsTemplateUpdatePayload(
        values.value
      );

      updateSmsTemplate(smsTemplateId.value, updateBody)
        .then(() => {
          errors.value = {};

          if (shouldExit) {
            context.root.$router.push(getSmsTemplateListUrl());
          }

          context.root.$toast({
            variant: 'success',
            title: t('sms:success'),
            body: t('sms:SMSTemplateHasBeenSuccessfullyUpdated'),
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          context.root.$toast({
            variant: 'danger',
            title: t('sms:error'),
            body: t('sms:SMSTemplateUpdateHasBeenFailed'),
          });
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    }

    /** Misc */
    const pageTitle = computed<string>(() =>
      smsTemplate.value
        ? `${t('sms:SMSTemplate')} "${smsTemplate.value.name}"`
        : t('sms:SMSTemplate')
    );

    const isContentLoading = computed<boolean>(
      () => isSmsTemplateLoading.value
    );

    const variableList = computed<Array<VariableType>>(() => {
      return smsTemplate.value
        ? convertFormValuesToVariableList(smsTemplate.value.fields)
        : [];
    });

    return {
      t,
      templateListRoutePath: getSmsTemplateListUrl(),
      values,
      errors,
      pageTitle,
      submitForm,
      isSubmitting,
      isContentLoading,
      variableList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
