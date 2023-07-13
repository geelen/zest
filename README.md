# Z-Expect — Zod + Jest Expect

🎵 _WIP WIP WIP that's a Work in Progress_ 🎵

```ts
import { z, expect } from 'z-expect'

// Throws exception or returns void. No need to use a test runner.
expect(await response.json()).toMatchObject({
  results: [{ 1: 1 }],
  meta: { duration: z.number().gt(0), served_by: 'x-server-123' },
  success: true,
})
```

This gets converted to:

```ts
const schema = z.object({
  results: z.tuple([
    z.object({1: z.literal(1)})
  ]),
  meta: z.object({
    duration: z.number().gt(0),
    served_by: z.literal('x-server-123')
  }),
  success: z.literal(true),
})

schema.parse(await response.json())
```
