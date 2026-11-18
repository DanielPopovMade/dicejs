class Dice<T> {
  readonly #list: readonly T[];
  #result: T;

  constructor(input: number | readonly T[] = 6) {
    // The public constructor signatures include number in T for numeric input.
    this.#list = Object.freeze(createList(input)) as readonly T[];
    this.#result = this.#pick();
  }

  get list(): readonly T[] {
    return this.#list;
  }

  get size(): number {
    return this.#list.length;
  }

  get result(): T {
    return this.#result;
  }

  roll(): T {
    this.#result = this.#pick();
    return this.#result;
  }

  #pick(): T {
    const index = Math.floor(Math.random() * this.#list.length);
    // The list is non-empty, dense, and frozen after construction.
    return this.#list[index]!;
  }
}

type PublicDice<T = number> = Dice<T>;

const PublicDice: {
  new (sides?: number): Dice<number>;
  new <const T>(values: readonly T[]): Dice<T>;
  // A single explicit type argument selects only the array constructor.
  new <const T, Sides extends number | undefined>(
    input: Sides | readonly T[],
  ): Dice<number | T>;
} = Dice;

export { PublicDice as Dice };

function createList<T>(input: number | readonly T[]): number[] | T[] {
  if (typeof input === 'number') {
    if (!Number.isFinite(input) || input < 1) {
      throw new RangeError('The number of sides must be finite and at least 1');
    }

    return Array.from({ length: Math.floor(input) }, (_, index) => index + 1);
  }

  if (!Array.isArray(input)) {
    throw new TypeError('Expected a number or an array of values');
  }

  if (input.length === 0) {
    throw new RangeError('The array of values must not be empty');
  }

  return Array.from({ length: input.length }, (_, index) => {
    if (!(index in input)) {
      throw new TypeError('The array of values must not contain empty slots');
    }

    return input[index]!;
  });
}
