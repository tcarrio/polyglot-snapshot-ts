import { test } from "uvu";
import assert from "uvu/assert";
import { generate, generateSync } from "../src/generate";

/// sync generator tests

test("should synchronously generate a single-level yaml file", () => {
  const expectedValue = { targets: { yaml: `key: value\nname: test\n` } };
  const inputValue = { key: "value", name: "test" };

  const actualValue = generateSync(inputValue, ["yaml"]);

  assert.equal(actualValue, expectedValue);
});

test("should synchronously generate a multi-level yaml file", () => {
  const expectedValue = {
    targets: { yaml: `metadata:\n  info:\n    key: value\n` },
  };
  const inputValue = { metadata: { info: { key: "value" } } };

  const actualValue = generateSync(inputValue, ["yaml"]);

  assert.equal(actualValue, expectedValue);
});

test("should synchronously generate a factory-powered yaml file", () => {
  const expectedValue = {
    targets: { yaml: `metadata:\n  info:\n    key: value\n` },
  };
  const inputValue = { metadata: { info: { key: () => () => "value" } } };

  const actualValue = generateSync(inputValue, ["yaml"]);

  assert.equal(actualValue, expectedValue);
});

/// async generator tests

test("should synchronously generate a single-level yaml file", async () => {
  const expectedValue = { targets: { yaml: `key: value\nname: test\n` } };
  const inputValue = { key: "value", name: "test" };

  const actualValue = await generate(inputValue, ["yaml"]);

  assert.equal(actualValue, expectedValue);
});

test("should synchronously generate a multi-level yaml file", async () => {
  const expectedValue = {
    targets: { yaml: `metadata:\n  info:\n    key: value\n` },
  };
  const inputValue = { metadata: { info: { key: "value" } } };

  const actualValue = await generate(inputValue, ["yaml"]);

  assert.equal(actualValue, expectedValue);
});

test("should synchronously generate a factory-powered yaml file", async () => {
  const expectedValue = {
    targets: { yaml: `metadata:\n  info:\n    key: value\n` },
  };
  const inputValue = {
    metadata: async () => ({ info: { key: () => "value" } }),
  };

  const actualValue = await generate(inputValue, ["yaml"]);

  assert.equal(actualValue, expectedValue);
});

test.run();
