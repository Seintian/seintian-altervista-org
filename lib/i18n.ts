import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLocales from '@/lib/locales/en.json';
import itLocales from '@/lib/locales/it.json';

if (!i18n.isInitialized) {
    i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: { translation: enLocales },
                it: { translation: itLocales },
            },
            lng: 'en',
            fallbackLng: 'en',
            defaultNS: 'translation',
            interpolation: {
                escapeValue: false,
            },
        });
}

export default i18n;
