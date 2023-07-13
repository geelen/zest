// Mostly small, some huge numbers
export const skewedRandom = () =>
  Math.round(
    Math.random() * 100 + Math.random() ** 50 * Number.MAX_SAFE_INTEGER
  )

export const getRandoms = (n: number) =>
  Array.from(new Set(new Array(n).fill(null).map(skewedRandom))) // N randoms (uniqued)
