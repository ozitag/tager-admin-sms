import { CustomRouteConfig } from '@tager/admin-layout';

import SmsTemplateList from '../views/SmsTemplateList';
import SmsTemplateForm from '../views/SmsTemplateForm';
import SmsLogList from '../views/SmsLogList';

import { SMS_ROUTE_PATHS } from './paths';

const HOME_BREADCRUMB = { url: '/', text: 'Home' };

export const SMS_TEMPLATE_LIST_ROUTE: CustomRouteConfig = {
  path: SMS_ROUTE_PATHS.TEMPLATE_LIST,
  component: SmsTemplateList,
  name: 'Templates',
  meta: {
    getBreadcrumbs: (route) => [
      HOME_BREADCRUMB,
      { url: route.path, text: 'Templates' },
    ],
  },
};

export const SMS_TEMPLATE_FORM_ROUTE: CustomRouteConfig = {
  path: SMS_ROUTE_PATHS.TEMPLATE_FORM,
  component: SmsTemplateForm,
  name: 'Template form',
  meta: {
    getBreadcrumbs: (route) => [
      HOME_BREADCRUMB,
      { url: route.path, text: 'Template form' },
    ],
  },
};

export const SMS_LOG_LIST_ROUTE: CustomRouteConfig = {
  path: SMS_ROUTE_PATHS.LOG_LIST,
  component: SmsLogList,
  name: 'Logs',
  meta: {
    getBreadcrumbs: (route) => [
      HOME_BREADCRUMB,
      { url: route.path, text: 'Logs' },
    ],
  },
};
