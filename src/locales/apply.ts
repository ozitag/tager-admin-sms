import { i18n } from '@tager/admin-services';

import { EN } from './en';
import { RU } from './ru';

export function applyTranslations() {
  i18n.addTranslations('en', 'sms', EN);
  i18n.addTranslations('ru', 'sms', RU);
}
