import { fromBase, toBase } from './customBase'
import { BASES, CUSTOM_BASES } from './constants'

const Z_ASCII = 122

function isCustom(BASE: number): BASE is (typeof CUSTOM_BASES)[number] {
  return BASE === 36 || BASE === 62
}

export default (BASE: (typeof BASES)[number]) => ({
  encode(n: number) {
    if (n > Number.MAX_SAFE_INTEGER)
      throw new Error(`9 million billion isn't enough for you?`)

    let encoded
    if (isCustom(BASE)) {
      encoded = toBase(BASE)(n)
    } else {
      const digits = n.toString(BASE).length
      const inverse = BASE ** digits - n - 1
      encoded = inverse.toString(BASE).padStart(digits, '0')
    }

    const prefix = String.fromCharCode(Z_ASCII - (encoded.length - 1))
    // console.log({ n, digits: encoded.length, encoded, prefix })
    return prefix + encoded
  },

  decode(str: string) {
    const [prefix, ...hex] = str
    const digits = Z_ASCII - prefix.charCodeAt(0) + 1
    // console.log({str, prefix, hex, digits})
    if (hex.length !== digits)
      throw new Error(
        `Malformed Zest string, expected ${digits} digit(s) for '${str}', got ${hex.length}.`
      )
    return isCustom(BASE)
      ? fromBase(BASE)(hex.join(''))
      : BASE ** digits - parseInt(hex.join(''), BASE) - 1
  },
})
