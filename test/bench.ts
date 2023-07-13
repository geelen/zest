import b from 'benny'
import { getRandoms, skewedRandom } from './utils'
import base16, { base32, base36, base62 } from '../src'

b.suite(
  'Baseline',
  b.add('Just randoms (baseline)', () => {
    skewedRandom()
  }),
  b.cycle(),
  b.complete()
)

b.suite(
  'Converting random numbers to inverse lexicographic encoding',
  b.add('base16.encode()', () => {
    base16.encode(skewedRandom())
  }),
  b.add('base32.encode', () => {
    base32.encode(skewedRandom())
  }),
  b.add('base36.encode', () => {
    base36.encode(skewedRandom())
  }),
  b.add('base62.encode', () => {
    base62.encode(skewedRandom())
  }),
  b.cycle(),
  b.complete()
)

const randoms = getRandoms(1_000_000)
const num_randoms = randoms.length // Will be less than ^ due to uniq()

b.suite(
  'Converting inverse lexicographic encoding back to numbers',
  b.add('base16.decode()', () => {
    const encoded = randoms.map(base16.encode)
    let i = 0
    return () => base16.decode(encoded[i++ % num_randoms])
  }),
  b.add('base32.decode()', () => {
    const encoded = randoms.map(base32.encode)
    let i = 0
    return () => base32.decode(encoded[i++ % num_randoms])
  }),
  b.add('base36.decode()', () => {
    const encoded = randoms.map(base36.encode)
    let i = 0
    return () => base36.decode(encoded[i++ % num_randoms])
  }),
  b.add('base62.decode()', () => {
    const encoded = randoms.map(base62.encode)
    let i = 0
    return () => base62.decode(encoded[i++ % num_randoms])
  }),
  b.cycle(),
  b.complete()
)


b.suite(
  'Converting to and from inverse lexicographic encoding',
  b.add('base16.encode()', () => {
    base16.decode(base16.encode(skewedRandom()))
  }),
  b.add('base32.encode', () => {
    base32.decode(base32.encode(skewedRandom()))
  }),
  b.add('base36.encode', () => {
    base36.decode(base36.encode(skewedRandom()))
  }),
  b.add('base62.encode', () => {
    base62.decode(base62.encode(skewedRandom()))
  }),
  b.cycle(),
  b.complete()
)
