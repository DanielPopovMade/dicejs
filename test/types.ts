import { Dice } from '@daniel-popov-made/dicejs';

function expectType<T>(_value: T): void {}

expectType<number>(new Dice().roll());
expectType<number>(new Dice(20).roll());

const directions = new Dice(['north', 'south']);
expectType<'north' | 'south'>(directions.roll());
expectType<'north' | 'south'>(directions.result);
expectType<readonly ('north' | 'south')[]>(directions.list);
expectType<Dice<string>>(directions);

const options: readonly [1, 'retry'] = [1, 'retry'];
expectType<1 | 'retry'>(new Dice(options).roll());

const objects: { id: number }[] = [{ id: 1 }, { id: 2 }];
expectType<{ id: number }>(new Dice(objects).roll());

function rollEither(input: number | readonly string[]) {
  return new Dice(input).roll();
}
expectType<number | string>(rollEither(6));

class NumberDice extends Dice {}
class StringDice extends Dice<string> {
  constructor() {
    super(['north', 'south']);
  }
}
expectType<number>(new NumberDice().roll());
expectType<string>(new StringDice().roll());

// @ts-expect-error Numeric dice do not return strings.
expectType<string>(new Dice(6).roll());
// @ts-expect-error String dice do not return numbers.
expectType<number>(directions.roll());
// @ts-expect-error An explicit string die requires an array.
new Dice<string>();
// @ts-expect-error The last roll is read-only.
directions.result = 'north';
// @ts-expect-error The list of sides is read-only.
directions.list.push('north');
