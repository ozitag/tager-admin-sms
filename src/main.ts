import { i18n } from '@tager/admin-services';
import EN from './locales/en';
import RU from './locales/ru';

i18n.addTranslations('en', 'sms', EN);
i18n.addTranslations('ru', 'sms', RU);

export * from './constants/routes';
export * from './utils/paths';
