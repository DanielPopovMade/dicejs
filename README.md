# dicejs

A virtual die with numbered sides or custom values. Each entry has the same chance of being rolled.

```sh
npm install @daniel-popov-made/dicejs
```

```ts
import { Dice } from '@daniel-popov-made/dicejs';

const d20 = new Dice(20);
const value = d20.roll(); // number from 1 to 20

const direction = new Dice(['north', 'south']);
const next = direction.roll(); // 'north' | 'south'
```

dicejs is published as an ES module. From CommonJS, use
`await import('@daniel-popov-made/dicejs')` inside an async function.

## API

- `new Dice()` creates a six-sided die with values from 1 through 6.
- `new Dice(sides)` creates a die with values from 1 through `Math.floor(sides)`. The number must be finite and at least 1.
- `new Dice(values)` copies a non-empty array of values with no empty slots. Repeated values count as separate sides.
- `die.roll()` draws a value and updates the read-only `die.result`. The constructor performs the first draw.
- `die.list` is the read-only array of sides. `die.size` is the number of sides.

TypeScript 5.0 or later infers the result type from the array's element type. Inline literals retain their literal types, and mutable and read-only arrays are both supported.

## Development

```sh
npm ci
npm test
npm pack --dry-run
```
