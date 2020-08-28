import { Nullable } from '@tager/admin-services';

export type SmsTemplateShort = {
  id: number;
  template: string;
  name: string;
  body: string;
  recipients: Array<string>;
};

export type SmsTemplateFull = SmsTemplateShort & {
  fields: Array<{ name: string; label: string }>;
};

export type SmsLog = {
  id: number;
  recipient: string;
  body: string;
  status: 'CREATED';
  error: Nullable<string>;
  serviceResponse: Nullable<string>;
  createdAt: string;
  updatedAt: string;
};
