import { Nullable } from '@tager/admin-services';

import { SmsTemplateFull } from '../../typings/model';
import { SmsTemplateUpdatePayload } from '../../services/requests';
import { VariableType } from '@tager/admin-ui';

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

export function convertFormValuesToVariableList(
  variables: SmsTemplateFull['fields']
): Array<VariableType> {
  return variables.map((variable) => ({
    label: variable.label,
    key: variable.name,
  }));
}
