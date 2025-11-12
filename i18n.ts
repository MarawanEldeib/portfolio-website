import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'de'] as const;

export default getRequestConfig(async ({requestLocale}) => {
  // Get the locale from the request
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as typeof locales[number])) {
    locale = 'en'; // fallback to default
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
