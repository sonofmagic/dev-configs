import { isObject } from '@/utils'

describe('isObject', () => {
  it('only treats plain objects as objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject(() => {})).toBe(false)
  })
})
