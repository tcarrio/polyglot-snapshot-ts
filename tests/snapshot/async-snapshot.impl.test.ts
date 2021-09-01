import { test } from "uvu";
import assert from "uvu/assert";
import { AsyncSnapshotImpl } from "../../src/snapshot/async-snapshot.impl";

const defaultSnapshotter = new AsyncSnapshotImpl();

test("should serialize a single level object of basic builtins", async () => {
  const inputValue = {
    firstName: "ricky",
    lastName: "bobby",
    mph: 239,
  };
  const expectedValue = inputValue;

  const actualValue = await defaultSnapshotter.snapshot(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a nested object of basic builtins", async () => {
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

  const actualValue = await defaultSnapshotter.snapshot(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize an object with a factory method", async () => {
  const inputValue = {
    greeting: () => "hello world",
  };
  const expectedValue = {
    greeting: "hello world",
  };

  const actualValue = await defaultSnapshotter.snapshot(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a deeply nested object with factory method", async () => {
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

  const actualValue = await defaultSnapshotter.snapshot(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a list of basic builtins", async () => {
  const inputValue = {
    values: [1, null, "yo", undefined],
  };
  const expectedValue = inputValue;

  const actualValue = await defaultSnapshotter.snapshot(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a list of factories", async () => {
  const inputValue = {
    values: [() => "hello", () => "world", () => () => null],
  };
  const expectedValue = {
    values: ["hello", "world", null],
  };

  const actualValue = await defaultSnapshotter.snapshot(inputValue);

  assert.equal(actualValue, expectedValue);
});

test("should serialize a factory of lists of factories", async () => {
  const inputValue = {
    values: () => [() => "hello", () => "world", () => () => null],
  };
  const expectedValue = {
    values: ["hello", "world", null],
  };

  const actualValue = await defaultSnapshotter.snapshot(inputValue);

  assert.equal(actualValue, expectedValue);
});

test.run();
