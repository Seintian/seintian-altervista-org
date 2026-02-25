import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLocales from '@/lib/locales/en.json';
import itLocales from '@/lib/locales/it.json';

// Ensure this only runs once and only on the client
if (!i18n.isInitialized) {
    i18n
        // pass the i18n instance to react-i18next.
        .use(initReactI18next)
        // init i18next
        .init({
            resources: {
                en: { translation: enLocales },
                it: { translation: itLocales },
            },
            lng: 'en', // Force English initially for SSR and hydration matching
            fallbackLng: 'en',
            // By default i18next tries to load translations from a namespace 'translation'
            defaultNS: 'translation',

            interpolation: {
                escapeValue: false, // not needed for react as it escapes by default
            },
        });
}

export default i18n;
