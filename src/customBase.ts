import { CUSTOM_BASES } from './constants'

type Key = (typeof CUSTOM_BASES)[number]

export const INVERSE_BASE: Record<Key, string> = {
  36: 'zyxwvutsrqponmlkjihgfedcba9876543210',
  62: 'zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA9876543210',
}

export const toBase = (base: Key) => (num: number) => {
  let result = ''
  do {
    result = INVERSE_BASE[base][num % base] + result
    num = Math.floor(num / base)
  } while (num > 0)
  return result
}

export const fromBase = (base: Key) => (str: string) => {
  let num = 0
  for (let i = 0; i < str.length; i++) {
    num = num * base + INVERSE_BASE[base].indexOf(str.charAt(i))
  }
  return num
}
