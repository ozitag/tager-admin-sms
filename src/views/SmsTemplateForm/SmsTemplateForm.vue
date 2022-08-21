<template>
  <Page :title="pageTitle" :is-content-loading="isContentLoading">
    <form novalidate @submit.prevent>
      <FormField
        v-model:value="values.recipients"
        name="recipients"
        :error="errors.recipients"
        :label="$i18n.t('sms:recipients')"
      />
      <FormFieldMessageTemplate
        v-model:value="values.body"
        :label="$i18n.t('sms:body')"
        :variable-list="
          smsTemplate
            ? smsTemplate.fields.map((item) => {
                return { ...item, key: item.name };
              })
            : []
        "
        :error="errors.body"
        type="textArea"
        name="body"
      />
    </form>

    <template #footer>
      <FormFooter
        :back-href="templateListRoutePath"
        :is-submitting="isSubmitting"
        :submit-and-exit-label="$i18n.t('sms:saveAndExit')"
        :submit-label="$i18n.t('sms:save')"
        @submit="submitForm"
      />
    </template>
  </Page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  SetupContext,
  watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  convertRequestErrorToMap,
  navigateBack,
  Nullable,
  useI18n,
  useResource,
  useToast,
} from '@tager/admin-services';
import {
  FormField,
  FormFieldMessageTemplate,
  FormFooter,
  TagerFormSubmitEvent,
} from '@tager/admin-ui';
import { Page } from '@tager/admin-layout';

import { getSmsTemplate, updateSmsTemplate } from '../../services/requests';
import { getSmsTemplateListUrl } from '../../utils/paths';
import { SmsTemplateFull } from '../../typings/model';

import {
  convertFormValuesToSmsTemplateUpdatePayload,
  convertSmsTemplateToFormValues,
  FormValues,
} from './SmsTemplateForm.helpers';

export default defineComponent({
  name: 'SmsTemplateForm',
  components: { FormFooter, FormFieldMessageTemplate, FormField, Page },
  setup() {
    const { t } = useI18n();

    const toast = useToast();
    const route = useRoute();
    const router = useRouter();

    /** Sms template fetching */

    const smsTemplateId = computed(
      () => route.params.templateId as string | undefined
    );

    const [
      fetchSmsTemplate,
      { data: smsTemplate, loading: isSmsTemplateLoading },
    ] = useResource<Nullable<SmsTemplateFull>>({
      fetchResource: () => {
        if (smsTemplateId.value) {
          return getSmsTemplate(smsTemplateId.value);
        }

        return Promise.resolve({ data: null });
      },
      initialValue: null,
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

    function submitForm({ type }: TagerFormSubmitEvent) {
      isSubmitting.value = true;

      const updateBody = convertFormValuesToSmsTemplateUpdatePayload(
        values.value
      );

      updateSmsTemplate(smsTemplateId.value || '', updateBody)
        .then(() => {
          errors.value = {};

          if (type === 'save_exit') {
            navigateBack(router, getSmsTemplateListUrl());
          }

          toast.show({
            variant: 'success',
            title: t('sms:success'),
            body: t('sms:SMSTemplateHasBeenSuccessfullyUpdated'),
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          toast.show({
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

    return {
      t,
      templateListRoutePath: getSmsTemplateListUrl(),
      values,
      errors,
      pageTitle,
      submitForm,
      isSubmitting,
      isContentLoading,
      smsTemplate,
    };
  },
});
</script>

<style scoped lang="scss"></style>
