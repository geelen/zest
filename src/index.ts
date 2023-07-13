import z, { ZodType } from 'zod'
import mapValues from 'just-map-values'

function toZodValue(val: unknown): ZodType {
  if (val === null) return z.never()

  if (val instanceof ZodType) return val
  if (Array.isArray(val)) {
    if (val.length === 0) return z.tuple([])
    // Zod tuples need to have a known zero/non-zero length, so split it out
    const [first, ...rest] = val
    return z.tuple([toZodValue(first), ...(rest as unknown[]).map(toZodValue)])
  }

  switch (typeof val) {
    case 'undefined':
      return z.never()
    case 'string':
    case 'number':
    case 'bigint':
    case 'boolean':
      return z.literal(val)
    case 'object': // except null, caught earlier
      return z.object(mapValues(val as Record<string, unknown>, toZodValue))
    default: // function, symbol
      throw new Error(`Can't infer zod validator from ${typeof val}: ${val}`)
  }
}

export function expect<T = unknown>(actual: unknown) {
  return {
    toMatchObject(expected: T) {
      const schema = toZodValue(expected)
      schema.parse(actual)
    },
  }
}
