import { describe, it, expect, Constructable } from 'vitest'
import z from 'zod'

import * as zest from '../src'

describe('zest', () => {
  it('toMatchObject', () => {
    const ok = <T, U>(a: T, b: U) => zest.expect(a).toMatchObject(b)
    const err = <T, U>(
      a: T,
      b: U,
      expected?: string | Constructable | RegExp | Error
    ) => expect(() => zest.expect(a).toMatchObject(b)).toThrow(expected)

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

    ok({ a: [1, 2, 3], b: { ok: true } }, { a: [1, 2, 3], b: { ok: true } })
    ok(
      { a: [1, 2, 3], b: { ok: true } },
      { a: [1, 2, 3], b: { ok: z.boolean() } }
    )
    ok({ a: [1, 2, 3], b: { ok: true } }, { a: z.array(z.number()) })
    ok({ a: [1, 2, 3], b: { ok: true } }, { a: z.array(z.number()).length(3) })

    err({ a: [1, 2, 3], b: { ok: true } }, { a: [1, 3, 2], b: { ok: true } })
    err({ a: [1, 2, 3], b: { ok: true } }, { a: z.array(z.string()) })
    err({ a: [1, 2, 3], b: { ok: true } }, { a: z.array(z.number()).length(2) })
  })

  it('toEqual', () => {
    const ok = <T, U>(a: T, b: U) => zest.expect(a).toEqual(b)
    const err = <T, U>(
      a: T,
      b: U,
      expected?: string | Constructable | RegExp | Error
    ) => expect(() => zest.expect(a).toEqual(b)).toThrow(expected)

    ok(1, 1)
    err(1, 2)

    ok({ a: 1, b: 2 }, { a: 1 })
    err({ a: 1 }, { a: 1, b: 2 })

    ok(2, z.number().gt(0))
    ok(2, z.number().gte(2))

    err(2, z.string())
    err(2, z.number().lt(0))
    err(2, z.number().gt(2))
  })
})
