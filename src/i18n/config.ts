import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import ptBR from './locales/pt-BR';
import zhCN from './locales/zh-CN';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': ptBR,
      'zh-CN': zhCN,
    },
    lng: 'pt-BR', // default language
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 