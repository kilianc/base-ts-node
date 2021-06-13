import { hasKey } from './has-key'

describe('hasKey(o, k)', () => {
  const obj = {
    a: 'a',
    b: 'b',
    1: '1',
    2: '2'
  } as const

  test('should correctly narrow types when `key: string`', () => {
    const key = 'a' as string

    // @ts-expect-error key is not narrowed
    let value: 'a' | 'b' = key

    if (!hasKey(obj, key)) {
      throw new Error('hasKey w/ `key: string`')
    }

    value = key
    expect(obj[value]).toBe('a')
  })

  test('should correctly narrow types when `key: number`', () => {
    const key = 1 as number

    // @ts-expect-error key is not narrowed
    let value: 1 | 2 = key

    if (!hasKey(obj, key)) {
      throw new Error('hasKey w/ `key: number`')
    }

    value = key
    expect(obj[value]).toBe('1')
  })
})
