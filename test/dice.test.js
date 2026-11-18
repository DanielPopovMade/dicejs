import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Dice } from '@daniel-popov-made/dicejs';

test('each sixth of the random range maps to one of the default sides', (context) => {
  let random = 0;
  context.mock.method(Math, 'random', () => random);
  const die = new Dice();

  assert.deepEqual(die.list, [1, 2, 3, 4, 5, 6]);
  assert.equal(die.size, 6);
  assert.equal(die.result, 1);

  for (let index = 0; index < die.size; index++) {
    random = (index + 0.1) / die.size;
    assert.equal(die.roll(), index + 1);
    assert.equal(die.result, index + 1);
  }

  random = 1 - Number.EPSILON;
  assert.equal(die.roll(), 6);
});

test('numeric side counts round down', () => {
  assert.deepEqual(new Dice(3.9).list, [1, 2, 3]);
  assert.equal(new Dice(1).roll(), 1);
});

test('custom sides retain their values, duplicates, and object identity', (context) => {
  context.mock.method(Math, 'random', () => 0);
  const face = { id: 1 };
  const input = [face, face, undefined];
  const die = new Dice(input);

  input.splice(0);
  assert.deepEqual(die.list, [face, face, undefined]);
  assert.ok(Object.isFrozen(die.list));
  assert.equal(die.roll(), face);
  assert.equal(new Dice([undefined]).roll(), undefined);
});

test('invalid input is rejected at construction', () => {
  for (const value of [0, -1, 0.5, NaN, Infinity, -Infinity, []]) {
    assert.throws(() => new Dice(value), RangeError);
  }

  for (const value of ['6', null, {}, [1, , 3]]) {
    assert.throws(() => new Dice(value), TypeError);
  }
});
