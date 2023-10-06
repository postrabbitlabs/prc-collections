import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import cn_PRC from './locales/cn.json';
import en_PRC from './locales/en.json';
import ja_PRC from './locales/ja.json';
import ko_PRC from './locales/ko.json';
import cn from './remocollab/prc-base/locales/cn.json';
import en from './remocollab/prc-base/locales/en.json';
import ja from './remocollab/prc-base/locales/ja.json';
import ko from './remocollab/prc-base/locales/ko.json';
const resources = {
  en: {
    translation: {
      ...en,
      ...en_PRC,
    },
  },
  cn: {
    translation: {
      ...cn,
      ...cn_PRC,
    },
  },
  ko: {
    translation: {
      ...ko,
      ...ko_PRC,
    },
  },
  ja: {
    translation: {
      ...ja,
      ...ja_PRC,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('locale') || 'en',
  fallbackLng: 'en',
});

export default i18n;
