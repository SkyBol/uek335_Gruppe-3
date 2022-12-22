import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationDE from "./de/translation.json";
import translationEN from "./en/translation.json";

export const resources = {
  de: {
    translationDE,
  },
  en: {
    translationEN,
  },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  lng: 'de',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});