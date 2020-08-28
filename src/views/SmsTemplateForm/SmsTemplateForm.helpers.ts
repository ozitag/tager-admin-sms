import { Nullable } from '@tager/admin-services';

import { SmsTemplateFull } from '../../typings/model';
import { SmsTemplateUpdatePayload } from '../../services/requests';

export type FormValues = {
  body: string;
  recipients: string;
};

export function convertSmsTemplateToFormValues(
  smsTemplate: Nullable<SmsTemplateFull>
): FormValues {
  if (!smsTemplate) {
    return {
      body: '',
      recipients: '',
    };
  }

  return {
    body: smsTemplate.body,
    recipients: smsTemplate.recipients.join(','),
  };
}

export function convertFormValuesToSmsTemplateUpdatePayload(
  values: FormValues
): SmsTemplateUpdatePayload {
  return {
    body: values.body,
    recipients: values.recipients
      .split(',')
      .filter((recipient) => recipient.trim().length > 0),
  };
}
