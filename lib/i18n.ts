import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enLocales from '@/lib/locales/en.json';
import itLocales from '@/lib/locales/it.json';

// Ensure this only runs once and only on the client
if (!i18n.isInitialized) {
    i18n
        // detect user language
        // learn more: https://github.com/i18next/i18next-browser-languageDetector
        .use(LanguageDetector)
        // pass the i18n instance to react-i18next.
        .use(initReactI18next)
        // init i18next
        // for all options read: https://www.i18next.com/overview/configuration-options
        .init({
            resources: {
                en: enLocales,
                it: itLocales,
            },
            fallbackLng: 'en',
            // By default i18next tries to load translations from a namespace 'translation'
            defaultNS: 'translation',

            interpolation: {
                escapeValue: false, // not needed for react as it escapes by default
            },
            detection: {
                // Order and from where user language should be detected
                order: ['localStorage', 'navigator'],
                // Keys or params to lookup language from
                lookupLocalStorage: 'i18nextLng',
                // Cache user language on
                caches: ['localStorage'],
            }
        });
}

export default i18n;
