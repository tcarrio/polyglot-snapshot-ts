import { test } from "uvu";
import assert from "uvu/assert";
import { isPromise } from "../../src/util/is-promise";

test("should determine a promise is a promise", () => {
  const promise = Promise.resolve(null);

  assert.ok(isPromise(promise));
});

test("should determine a non-promise is not a promise", () => {
  const notPromiseList = [
    [],
    {},
    0,
    Infinity,
    -1,
    null,
    undefined,
    new (class {})(),
    new Error(),
  ];

  for (const notPromise of notPromiseList) {
    assert.not.ok(isPromise(notPromise));
  }
});

test("should determine a promise-like object is a promise", () => {
  const promiseLike = {
    then: () => {},
  };

  assert.ok(isPromise(promiseLike));
});

test.run();
