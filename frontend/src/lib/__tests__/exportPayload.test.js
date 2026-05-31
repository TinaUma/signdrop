import { describe, it, expect } from 'vitest'
import { buildExportPayload, signAllPages } from '../exportPayload'

const layer = (sigId, over = {}) => ({
  id: `${sigId}-x`, sigId, x: 10, y: 20, width: 30, height: 40, rotation: 5, opacity: 0.8, ...over,
})

describe('buildExportPayload', () => {
  it('includes only signed, non-deleted pages with their dims and jitter', () => {
    const layersByPage = { 0: [layer('a')], 1: [], 2: [layer('b')], 3: [layer('c')] }
    const pageDims = { 0: { width: 100, height: 200 }, 2: { width: 300, height: 400 } }
    const out = buildExportPayload({
      layersByPage, pageDims, deletedPages: new Set([3]), jitter: 50,
    })
    expect(out.map((p) => p.page_idx)).toEqual([0, 2]) // 1 is empty, 3 is deleted
    expect(out[0]).toMatchObject({ page_idx: 0, stage_w: 100, stage_h: 200, jitter: 0.5 })
    expect(out[0].signatures[0]).toEqual({
      id: 'a', x: 10, y: 20, w: 30, h: 40, angle: 5, opacity: 0.8,
    })
    expect(out[1]).toMatchObject({ stage_w: 300, stage_h: 400 })
  })

  it('falls back to A4 dims when pageDims is missing', () => {
    const out = buildExportPayload({
      layersByPage: { 0: [layer('a')] }, pageDims: {}, deletedPages: new Set(), jitter: 0,
    })
    expect(out[0]).toMatchObject({ stage_w: 794, stage_h: 1123, jitter: 0 })
  })
})

describe('signAllPages', () => {
  it('copies to every non-deleted page with unique ids', () => {
    const cur = [layer('a'), layer('a')] // same signature twice
    const map = signAllPages(cur, 3, new Set([1]))
    expect(Object.keys(map).map(Number)).toEqual([0, 2]) // page 1 deleted
    const ids = [...map[0], ...map[2]].map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length) // no duplicate React keys
    expect(map[0][0].sigId).toBe('a')
  })

  it('returns an empty map when all pages are deleted', () => {
    expect(signAllPages([layer('a')], 2, new Set([0, 1]))).toEqual({})
  })
})
