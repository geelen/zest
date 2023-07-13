import { describe, it, expect, Constructable } from 'vitest'
import z from 'zod'

import * as zest from '../src'

const ok = <T, U>(a: T, b: U) => zest.expect(a).toMatchObject(b)
const err = <T, U>(
  a: T,
  b: U,
  expected?: string | Constructable | RegExp | Error
) => expect(() => zest.expect(a).toMatchObject(b)).toThrow(expected)

describe('zest', () => {
  it('should work', () => {
    ok({ a: 1 }, { a: 1 })
    err({ a: 1 }, { a: 2 })

    ok({ a: 1, b: 2 }, { a: 1 })
    err({ a: 1 }, { a: 1, b: 2 })

    ok({ a: 1, b: 2 }, { a: 1, b: z.number() })
    ok({ a: 1, b: 2 }, { a: 1, b: z.number().gt(0) })
    ok({ a: 1, b: 2 }, { a: 1, b: z.number().gte(2) })

    err({ a: 1, b: 2 }, { a: 1, b: z.string() })
    err({ a: 1, b: 2 }, { a: 1, b: z.number().lt(0) })
    err({ a: 1, b: 2 }, { a: 1, b: z.number().gt(2) })
  })
})
