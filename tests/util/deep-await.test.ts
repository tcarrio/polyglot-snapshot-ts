import { test } from "uvu";
import assert from "uvu/assert";
import { deepAwait } from "../../src/util/deep-await";

test("should process a list of promises", async () => {
  const listLength = 520;
  const inputValue = new Array(listLength)
    .fill(0)
    .map((_, i) => Promise.resolve(i));
  const expectedValue = new Array(listLength).fill(0).map((_, i) => i);

  const actualValue = await deepAwait(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should process an object with promises in its keys' values", async () => {
  const inputValue = {
    a: Promise.resolve("a"),
    b: Promise.resolve("b"),
  };
  const expectedValue = {
    a: "a",
    b: "b",
  };

  const actualValue = await deepAwait(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should process an object with deeply nested promises", async () => {
  const inputValue = {
    a: {
      b: {
        c: {
          value: Promise.resolve("c level"),
          d: {
            value: Promise.resolve("hello world"),
          },
        },
      },
    },
  };
  const expectedValue = {
    a: {
      b: {
        c: {
          value: "c level",
          d: {
            value: "hello world",
          },
        },
      },
    },
  };

  const actualValue = await deepAwait(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should process nested async factories of async factories", async () => {
  const inputValue = {
    a: async () => async () => async () => Promise.resolve(7),
  };
  const expectedValue = {
    a: 7,
  };

  const actualValue = await deepAwait(inputValue);

  assert.equal(actualValue, expectedValue);
});

test.run();
