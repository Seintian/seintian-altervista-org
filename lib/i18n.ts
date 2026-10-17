import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enLocales from '@/lib/locales/en.json';
import itLocales from '@/lib/locales/it.json';

if (!i18n.isInitialized) {
    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources: {
                en: { translation: enLocales },
                it: { translation: itLocales },
            },
            fallbackLng: 'en',
            defaultNS: 'translation',
            interpolation: {
                escapeValue: false,
            },
            detection: {
                order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
                lookupQuerystring: 'lng',
                lookupCookie: 'i18next',
                lookupLocalStorage: 'i18nextLng',
                caches: ['localStorage', 'cookie'],
            },
        });
}

export default i18n;
