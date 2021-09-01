import { isPromise } from "./is-promise";

export async function deepAwait(input: unknown): Promise<unknown> {
  switch (typeof input) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "symbol":
    case "undefined":
      return input;

    case "function":
      return deepAwait(input());

    case "object":
      if (input === null) {
        return input;
      }

      if (isPromise(input)) {
        return input.then((value) => deepAwait(value));
      }

      if (Array.isArray(input)) {
        return Promise.all(input.map((i) => deepAwait(i)));
      }

      return Promise.all(
        Object.keys(input).map((key) =>
          deepAwait(input[key as never]).then((value) => [key, value])
        )
      ).then((pairs) =>
        pairs.reduce(
          (obj, [key, value]) => ({ ...obj, [key as never]: value }),
          {}
        )
      );
  }
}
