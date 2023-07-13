import createZest from './encoder'

export const base16 = createZest(16)
export default base16

export const base32 = createZest(32)
export const base36 = createZest(36)
export const base62 = createZest(62)
