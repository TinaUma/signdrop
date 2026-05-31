import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { ru } from './locales/ru'
import { en } from './locales/en'

const CATALOGS = { ru, en }
const STORAGE_KEY = 'pdfsigner.lang'

function detectInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && CATALOGS[saved]) return saved
  } catch {
    /* localStorage unavailable */
  }
  const nav = (typeof navigator !== 'undefined' && navigator.language || '').slice(0, 2)
  return CATALOGS[nav] ? nav : 'ru'
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLang)

  const setLanguage = useCallback((next) => {
    if (!CATALOGS[next]) return  // ignore unknown languages
    setLang(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* localStorage unavailable */
    }
  }, [])

  // t(key, vars): looks up the current language, falls back to en, then the key
  // itself. {placeholders} in the template are replaced from vars.
  const t = useCallback((key, vars) => {
    const tpl = CATALOGS[lang]?.[key] ?? CATALOGS.en[key] ?? key
    if (!vars) return tpl
    return tpl.replace(/\{(\w+)\}/g, (_, name) => (name in vars ? vars[name] : `{${name}}`))
  }, [lang])

  const value = useMemo(
    () => ({ lang, setLanguage, t, languages: Object.keys(CATALOGS) }),
    [lang, setLanguage, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider')
  return ctx
}
