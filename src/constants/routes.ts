import { CustomRouteConfig } from '@tager/admin-layout';

import SmsTemplateList from '../views/SmsTemplateList';
import SmsTemplateForm from '../views/SmsTemplateForm';
import SmsLogList from '../views/SmsLogList';

import { SMS_ROUTE_PATHS } from './paths';

export const SMS_TEMPLATE_LIST_ROUTE: CustomRouteConfig = {
  path: SMS_ROUTE_PATHS.TEMPLATE_LIST,
  component: SmsTemplateList,
  name: 'SMS Templates',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('sms:home') },
      { url: route.path, text: t('sms:templates') },
    ],
  },
};

export const SMS_TEMPLATE_FORM_ROUTE: CustomRouteConfig = {
  path: SMS_ROUTE_PATHS.TEMPLATE_FORM,
  component: SmsTemplateForm,
  name: 'SMS Template form',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('sms:home') },
      { url: route.path, text: t('sms:templateForm') },
    ],
  },
};

export const SMS_LOG_LIST_ROUTE: CustomRouteConfig = {
  path: SMS_ROUTE_PATHS.LOG_LIST,
  component: SmsLogList,
  name: 'SMS Logs',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('sms:home') },
      { url: route.path, text: t('sms:logs') },
    ],
  },
};
