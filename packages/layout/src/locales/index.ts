import { isBrowser } from '@ant-design/pro-utils';
import zhLocal from './zh-CN';
import zhTWLocal from './zh-TW';
import enUSLocal from './en-US';
import itITLocal from './it-IT';

const locales = {
  'zh-CN': zhLocal,
  'zh-TW': zhTWLocal,
  'en-US': enUSLocal,
  'it-IT': itITLocal,
};

type GLocaleWindow = {
  g_locale: keyof typeof locales;
};

export type LocaleType = keyof typeof locales;

const getLanguage = (): string => {
  let lang;
  // support ssr
  if (!isBrowser()) {
    return lang || '';
  }
  lang = window.localStorage.getItem('umi_locale');
  return lang || ((window as unknown) as GLocaleWindow).g_locale || navigator.language;
};

export { getLanguage };

export default (): Record<string, string> => {
  const gLocale = getLanguage();
  if (locales[gLocale]) {
    return locales[gLocale];
  }
  return locales['zh-CN'];
};
