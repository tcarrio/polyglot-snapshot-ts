import { test } from "uvu";
import assert from "uvu/assert";
import { SnapshotImpl } from "../../src/snapshot/snapshot.impl";

const defaultSnapshotter = new SnapshotImpl();

test("should serialize a bigint", () => {
  const inputValue = BigInt("12341234123412341234123412341234");
  const expectedValue = inputValue;

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a symbol", () => {
  const inputValue = Symbol.for("CLASS_REFLECTOR_KEY");
  const expectedValue = inputValue;

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a boolean", () => {
  const inputValue = false;
  const expectedValue = inputValue;

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a number", () => {
  const inputValue = 9000;
  const expectedValue = inputValue;

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a string", () => {
  const inputValue = "test-string";
  const expectedValue = inputValue;

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a undefined", () => {
  const inputValue = undefined;
  const expectedValue = inputValue;

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a factory method", () => {
  const inputValue = () => "hello world";
  const expectedValue = "hello world";

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a recursive factory method", () => {
  const inputValue = () => () => () => () => () => () => "hello world";
  const expectedValue = "hello world";

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a single level object of basic builtins", () => {
  const inputValue = {
    firstName: "ricky",
    lastName: "bobby",
    mph: 239,
  };
  const expectedValue = inputValue;

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a nested object of basic builtins", () => {
  const inputValue = {
    usa: {
      firstName: "ricky",
      lastName: "bobby",
      mph: 239,
    },
    france: {
      firstName: "jean",
      lastName: "girard",
      mph: 238,
    },
  };
  const expectedValue = inputValue;

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize an object with a factory method", () => {
  const inputValue = {
    greeting: () => "hello world",
  };
  const expectedValue = {
    greeting: "hello world",
  };

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a deeply nested object with factory method", () => {
  const inputValue = {
    top: {
      middle: {
        bottom: {
          greeting: () => "hello world",
        },
      },
    },
  };
  const expectedValue = {
    top: {
      middle: {
        bottom: {
          greeting: "hello world",
        },
      },
    },
  };

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a list of basic builtins", () => {
  const inputValue = [1, null, "yo", undefined];
  const expectedValue = inputValue;

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a list of factories", () => {
  const inputValue = [() => "hello", () => "world", () => () => null];
  const expectedValue = ["hello", "world", null];

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a factory of lists of factories", () => {
  const inputValue = () => [() => "hello", () => "world", () => () => null];
  const expectedValue = ["hello", "world", null];

  const actualValue = SnapshotImpl.serialize(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should not allow factory methods that expect arguments", () => {
  const oneArgFunction = (_x: never) => "hello world";
  const twoArgFunction = (_x: never, _y: never) => "hello world";
  const threeArgFunction = (_x: never, _y: never, _z: never) => "hello world";
  const nonZeroArgFunctions = [
    oneArgFunction,
    twoArgFunction,
    threeArgFunction,
  ];
  const expectedRuns = 3;

  let actualRuns = 0;
  for (const nonZeroArgFunction of nonZeroArgFunctions) {
    assert.throws(() => {
      actualRuns++;
      SnapshotImpl.serialize(nonZeroArgFunction);
    });
  }

  assert.equal(actualRuns, expectedRuns);
});

test.run();
