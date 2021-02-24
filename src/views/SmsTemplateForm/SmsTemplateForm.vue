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
        <form-field-rich-text-input
          v-model="values.body"
          name="body"
          :error="errors.body"
          :label="t('sms:body')"
        />

        <div
          v-if="smsTemplate && smsTemplate.fields.length > 0"
          class="legend-vars"
        >
          <h4 class="title">{{ t('sms:templateVariables') }}</h4>
          <ul>
            <li v-for="variable of smsTemplate.fields" :key="variable.name">
              <span>{{ variable.label }}</span> -
              <span>
                {{ getKeyTemplate(variable.name) }}
              </span>
              <base-button
                variant="icon"
                :title="t('sms:copy')"
                @click="copyVarTemplate(variable.name)"
              >
                <svg-icon name="contentCopy" />
              </base-button>
            </li>
          </ul>
        </div>
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
  convertSmsTemplateToFormValues,
  FormValues,
} from './SmsTemplateForm.helpers';
import { SmsTemplateFull } from '../../typings/model';
import { useTranslation } from '@tager/admin-ui';

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

    function getKeyTemplate(key: string): string {
      return `{{${key}}}`;
    }

    function copyVarTemplate(key: string) {
      navigator.clipboard.writeText(getKeyTemplate(key)).catch(console.error);
    }

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
      copyVarTemplate,
      getKeyTemplate,
      submitForm,
      isSubmitting,
      isContentLoading,
      smsTemplate,
    };
  },
});
</script>

<style scoped lang="scss">
.legend-vars {
  h4 {
    margin-bottom: 0.5rem;
  }
  ul {
    display: inline-block;
    padding-left: 1.2rem;
    list-style-type: decimal;

    li:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
  }

  button {
    margin-left: 0.5rem;
  }
}
</style>
