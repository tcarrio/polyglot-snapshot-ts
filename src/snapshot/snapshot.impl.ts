import { FactoryFunction } from "../types";
import { isPromise } from "../util/is-promise";
import { Snapshotter, SnapshotterOptions } from "./snapshot.interface";
import { SnapshotValidator } from "./validator";

export class SnapshotImpl implements Snapshotter {
  private static readonly defaultOptions: SnapshotterOptions = {
    validate: true,
  };
  private readonly options: SnapshotterOptions;

  public constructor(overrideOptions: Partial<SnapshotterOptions> = {}) {
    this.options = { ...SnapshotImpl.defaultOptions, ...overrideOptions };
  }

  public snapshot(module: object): unknown {
    const output = SnapshotImpl.serializeObject(module);
    if (this.options.validate) {
      SnapshotValidator.validate(output);
    }
    return output;
  }

  public static serialize(input: unknown): unknown {
    switch (typeof input) {
      case "bigint":
      case "symbol":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return input;

      case "object":
        if (input === null) {
          return input;
        }

        if (Array.isArray(input)) {
          return this.serializeList(input);
        }

        // respect objects with custom serialization
        if (typeof input["toJSON" as never] === "function") {
          return JSON.parse(JSON.stringify(input));
        }

        return this.serializeObject(input);

      case "function":
        return this.serializeFactory(input as FactoryFunction);
    }
  }

  private static serializeObject(obj: object): object {
    return Object.keys(obj).reduce(
      (snap, key) => ({
        ...snap,
        [key]: SnapshotImpl.serialize(obj[key as keyof typeof obj]),
      }),
      {}
    );
  }

  private static serializeList(list: Array<unknown>): Array<unknown> {
    return list.map((input) => this.serialize(input));
  }

  private static serializeFactory(factory: FactoryFunction): unknown {
    if (factory.length !== 0) {
      throw new Error("Factory functions cannot have any arguments!");
    }

    const valueOrPromise = factory();

    if (!isPromise(valueOrPromise)) {
      return this.serialize(valueOrPromise);
    }

    return valueOrPromise.then((value) => this.serialize(value));
  }
}
