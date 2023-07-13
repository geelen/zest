import { describe, it, expect, Constructable } from 'vitest'

import * as zest from '../src'

const ok = (fn: Function) => fn()
const err = (
  fn: Function,
  expected?: string | Constructable | RegExp | Error
) => expect(fn).toThrow(expected)

describe('zest', () => {
  it('should work', () => {
    ok(() => zest.expect({ a: 1 }).toMatchObject({ a: 1 }))
    err(() => zest.expect({ a: 1 }).toMatchObject({ a: 2 }))
  })
})
