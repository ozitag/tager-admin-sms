import Vue, { CreateElement } from 'vue';
import VueCompositionApi, { createApp } from '@vue/composition-api';
import { configStore, i18n } from '@tager/admin-services';
import { AdminUiPlugin } from '@tager/admin-ui';
import {
  AdminLayoutPlugin,
  createRouter,
  CustomRoute,
  CustomRouteConfig,
} from '@tager/admin-layout';

import '@tager/admin-ui/dist/admin-ui.css';

import {
  SMS_LOG_LIST_ROUTE,
  SMS_TEMPLATE_FORM_ROUTE,
  SMS_TEMPLATE_LIST_ROUTE,
} from './constants/routes';
import config from './config/config.json';
import App from './views/App.vue';
import Home from './views/Home.vue';
import EN from './locales/en';
import RU from './locales/ru';

configStore.setConfig(config);

export const HOME_ROUTE: CustomRouteConfig = {
  path: '/',
  component: Home,
  name: 'Home',
  meta: {
    getBreadcrumbs: (route: CustomRoute, t) => [
      { url: '/', text: t('sms:home') },
    ],
  },
};

const router = createRouter(
  {
    routes: [
      HOME_ROUTE,
      SMS_TEMPLATE_LIST_ROUTE,
      SMS_TEMPLATE_FORM_ROUTE,
      SMS_LOG_LIST_ROUTE,
    ],
  },
  { useTitleSync: false }
);

Vue.use(VueCompositionApi);

i18n.addTranslations('en', 'sms', EN);
i18n.addTranslations('ru', 'sms', RU);

i18n.init({ debug: false }).then(() => {
  const app = createApp({
    router,
    render: (h: CreateElement) => h(App),
  });

  app.use(i18n.getPlugin());
  app.use(AdminUiPlugin);
  app.use(AdminLayoutPlugin);

  app.mount('#app');
});
