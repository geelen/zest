import { describe, expect, it } from 'vitest'
import { getRandoms } from './utils'
import base16, { base32, base36, base62 } from '../src'

export const CASES = [
  [16, base16],
  [32, base32],
  [36, base36],
  [62, base62],
] as const

describe('zest', () => {
  it.each(CASES)('should be invertible at base %i', (base, zest) => {
    const numbers = getRandoms(2000)
    const encoded = numbers.map(zest.encode)
    const decoded = encoded.map(zest.decode)
    expect(decoded).toEqual(decoded)
  })

  it.each(CASES)(
    'should generate IDs that sort inverse-lexicographically at base %i',
    (base, zest) => {
      const numbers = getRandoms(2000)

      const encoded = numbers.map(zest.encode)
      const sorted_numerically = [...numbers].sort((a, b) => b - a) // inverse numeric sort
      const sorted_lexicographically = [...encoded].sort()

      expect(sorted_lexicographically).toEqual(
        sorted_numerically.map(zest.encode)
      )
    }
  )
})
