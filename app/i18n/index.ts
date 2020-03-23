import enLocale from './en'
import ruLocale from './ru'
import { createContext } from 'preact'

export const locales = {
  en: enLocale,
  ru: ruLocale
}

export type I18nLocale = typeof enLocale

export type I18nLocaleKey = keyof typeof locales

export const I18nContext = createContext<{
  localeKey: I18nLocaleKey
  locale: I18nLocale
}>({
  localeKey: 'en',
  locale: enLocale
})
