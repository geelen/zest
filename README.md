# zest — Inverse Lexicographic Encoding

For encoding numbers so that higher numbers appear first, sorted lexicographically (i.e. in a cloud storage bucket that only has ascending LIST operations), in as few bytes as possible.

## Usage

```sh
npm install --save-dev zest
pnpm add -D zest
```

```ts
import zest from 'zest'

zest.encode(0) // "zf"
zest.encode(1) // "ze"
zest.encode(15) // "z0"
zest.encode(16) // "yef"
zest.encode(1959) // "x858"
zest.encode(49584741) // "td0b659a"
zest.encode(350371465044) // "qae6c3bb8ab"
zest.encode(84296151321634) // "ob35545d833dd"
```

```ts
import { base36 as zest } from 'zest'

zest.encode(0) // "zz"
zest.encode(1) // "zy"
zest.encode(15) // "zk"
zest.encode(16) // "zj"
zest.encode(1959) // "xyhk"
zest.encode(49584741) // "v6h862"
zest.encode(350371465044) // "svj1hvjcb"
zest.encode(84296151321634) // "r64avryqxp"
```

```ts
import { base62 as zest } from 'zest'

zest.encode(0) // "zz"
zest.encode(1) // "zy"
zest.encode(15) // "zk"
zest.encode(16) // "zj"
zest.encode(1959) // "yUO"
zest.encode(49584741) // "vwdwk6"
zest.encode(350371465044) // "ttpYL2Pz"
zest.encode(84296151321634) // "sc3uyZfif"
```

Also defined is `base32`, and each export has a corresponding `.decode` function.

## Format

Numbers are converted to a hex string (or base-32 or base-64 string, see below), then inverted (so "001" becomes "ffe"), then prefixed with a single letter that encodes the length, starting at 'z' and moving up the alphabet, meaning that longer (larger) numbers appear first when sorted lexicographically.

This uses a lot less bytes than a naive approach (`Number.MAX_SAFE_INTEGER - n`, for example), and by converting to hex/base32/64, makes the IDs look opaque enough to not look obviously "wrong".

## Development

```sh
pnpm install
pnpm test
```

## Benchmarks

Absolutely no effort has been put into optimising this, but I was curious. There are two code paths within `zest`, `base16` and `base32` use `Number.toString(radix)` and `parseInt(radix)`, whereas `base36` and `base64` both use a lookup into a preset array.

```sh
Running "Baseline" suite...
Progress: 100%

  Just randoms (baseline):
    72 705 140 ops/s, ±1.62%   | fastest

Finished 1 case!
Running "Converting random numbers to inverse lexicographic encoding" suite...
Progress: 100%

  base16.encode():
    1 832 049 ops/s, ±1.13%   | slowest, 38.26% slower

  base32.encode:
    2 007 291 ops/s, ±3.42%   | 32.35% slower

  base36.encode:
    2 733 974 ops/s, ±2.19%   | 7.86% slower

  base62.encode:
    2 967 347 ops/s, ±0.96%   | fastest

Finished 4 cases!
  Fastest: base62.encode
  Slowest: base16.encode()
Running "Converting inverse lexicographic encoding back to numbers" suite...
Progress: 100%

  base16.decode():
    2 326 712 ops/s, ±2.45%   | 15.23% slower

  base32.decode():
    2 744 656 ops/s, ±1.15%   | fastest

  base36.decode():
    1 947 971 ops/s, ±2.50%   | slowest, 29.03% slower

  base62.decode():
    1 962 106 ops/s, ±4.35%   | 28.51% slower

Finished 4 cases!
  Fastest: base32.decode()
  Slowest: base36.decode()
Running "Converting to and from inverse lexicographic encoding" suite...
Progress: 100%

  base16.encode():
    1 143 259 ops/s, ±6.10%   | slowest, 19.05% slower

  base32.encode:
    1 346 793 ops/s, ±1.76%   | 4.63% slower

  base36.encode:
    1 359 610 ops/s, ±1.59%   | 3.73% slower

  base62.encode:
    1 412 220 ops/s, ±3.46%   | fastest

Finished 4 cases!
  Fastest: base62.encode
  Slowest: base16.encode()
```

## Acknowledgements

This was [@kentonv](https://github.com/kentonv)'s idea, I just ported it to JS and tried out non-base16 implementations.
