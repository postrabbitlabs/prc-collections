import i18n from './i18n.ts';
// 根据对象路径获取对象值
function _get(source: any, path: string, defaultValue: string | undefined = undefined) {
  return source[path] || defaultValue;
}

export function useTranslation(locale: 'zh' | 'en') {
  return {
    t: (key: string) => {
      return _get(i18n[locale], key, key);
    },
  };
}
