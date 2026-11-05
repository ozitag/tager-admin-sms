import { type Nullable, request, type ResponseBody } from '@tager/admin-services';

import { type SmsLog, type SmsTemplateShort, type SmsTemplateFull } from '../typings/model';

export function getSmsTemplateList(): Promise<
  ResponseBody<Array<SmsTemplateShort>>
> {
  return request.get({ path: '/admin/sms/templates' });
}

export function getSmsTemplate(
  templateId: number | string
): Promise<ResponseBody<SmsTemplateFull>> {
  return request.get({ path: `/admin/sms/templates/${templateId}` });
}

export type SmsTemplateUpdatePayload = {
  body: Nullable<string>;
  recipients: Array<string>;
};

export function updateSmsTemplate(
  templateId: string | number,
  payload: SmsTemplateUpdatePayload
): Promise<ResponseBody<SmsTemplateFull>> {
  return request.put({
    path: `/admin/sms/templates/${templateId}`,
    body: payload,
  });
}

export function getSmsLogList(params?: {
  query?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<ResponseBody<Array<SmsLog>>> {
  return request.get({ path: '/admin/sms/logs', params });
}
