import type { RouteRecordRaw } from 'vue-router';

import SmsTemplateList from '../views/SmsTemplateList';
import SmsTemplateForm from '../views/SmsTemplateForm';
import SmsLogList from '../views/SmsLogList';

import { SMS_ROUTE_PATHS } from './paths';

export const SMS_TEMPLATE_LIST_ROUTE: RouteRecordRaw = {
  path: SMS_ROUTE_PATHS.TEMPLATE_LIST,
  component: SmsTemplateList,
  name: 'SMS Templates',
  meta: {
    getBreadcrumbs: (route, i18n) => [
      { url: '/', text: i18n.t('sms:home') },
      { url: route.path, text: i18n.t('sms:templates') },
    ],
  },
};

export const SMS_TEMPLATE_FORM_ROUTE: RouteRecordRaw = {
  path: SMS_ROUTE_PATHS.TEMPLATE_FORM,
  component: SmsTemplateForm,
  name: 'SMS Template form',
  meta: {
    getBreadcrumbs: (route, i18n) => [
      { url: '/', text: i18n.t('sms:home') },
      { url: route.path, text: i18n.t('sms:templateForm') },
    ],
  },
};

export const SMS_LOG_LIST_ROUTE: RouteRecordRaw = {
  path: SMS_ROUTE_PATHS.LOG_LIST,
  component: SmsLogList,
  name: 'SMS Logs',
  meta: {
    getBreadcrumbs: (route, i18n) => [
      { url: '/', text: i18n.t('sms:home') },
      { url: route.path, text: i18n.t('sms:logs') },
    ],
  },
};
