import { compile } from 'path-to-regexp';

import { SMS_ROUTE_PATHS } from '../constants/paths';

export function getSmsTemplateListUrl(): string {
  return SMS_ROUTE_PATHS.TEMPLATE_LIST;
}

export function getSmsTemplateFormUrl(params: { templateId: string }): string {
  return compile(SMS_ROUTE_PATHS.TEMPLATE_FORM)(params);
}

export function getSmsLogListUrl(): string {
  return SMS_ROUTE_PATHS.LOG_LIST;
}
