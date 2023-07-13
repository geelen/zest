export const NUMERIC_BASES = [16, 32] as const
export const CUSTOM_BASES = [36, 62] as const
export const BASES = [...NUMERIC_BASES, ...CUSTOM_BASES] as const
