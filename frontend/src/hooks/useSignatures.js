import { useState, useCallback, useEffect } from 'react'
import { useI18n, resolveApiError } from '../i18n/index.jsx'
import { getApiBase } from '../constants'

// Built at request time, not module-load: the Tauri API base is only known
// after resolveApiBase() runs (dynamic sidecar port).
const api = () => `${getApiBase()}/api/signatures`

export function useSignatures() {
  const { t } = useI18n()
  const [signatures, setSignatures] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch_ = useCallback(async () => {
    const res = await fetch(api())
    if (!res.ok) throw new Error(t('error.load_signatures_failed'))
    return res.json()
  }, [t])

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setSignatures(await fetch_())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [fetch_])

  useEffect(() => { load() }, [load])

  const upload = useCallback(async (file, removeBg = true) => {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch(`${api()}?remove_bg=${removeBg}`, { method: 'POST', body: form })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(resolveApiError(body.detail, t))
    }
    await load()
    return res.json()
  }, [load, t])

  const remove_ = useCallback(async (id) => {
    await fetch(`${api()}/${id}`, { method: 'DELETE' })
    await load()
  }, [load])

  const imageUrl = (id) => `${api()}/${id}/image`

  return { signatures, loading, error, upload, remove: remove_, imageUrl, reload: load }
}
