import { useEffect, useState } from 'react';

import * as i18n from './i18n.ts';
// 根据对象路径获取对象值
function _get(source: any, path: string, defaultValue: string | undefined = undefined) {
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = source;
  for (const p of paths) {
    result = Object(result)[p]; // null 与 undefined 取属性会报错, 用Object包装一下
  }
  return result || defaultValue;
}

export function useTranslation(locale: string) {
  return {
    t: (key: string) => {
      return _get(i18n[locale], key, key);
    },
  };
}
