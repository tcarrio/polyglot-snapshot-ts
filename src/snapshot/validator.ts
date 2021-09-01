import { ValidationError } from "../errors";
import { isPromise } from "../util/is-promise";

export class SnapshotValidator {
  public static validate(snapshot: unknown): void {
    switch (typeof snapshot) {
      case "function":
        throw new ValidationError("Function not serialized");

      case "bigint":
      case "symbol":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return;

      case "object":
        if (snapshot === null) {
          return;
        }

        if (Array.isArray(snapshot)) {
          return snapshot.forEach((entry) => this.validate(entry));
        }

        if (isPromise(snapshot)) {
          throw new ValidationError("Promise cannot be serialized");
        }

        return Object.keys(snapshot).forEach((key) =>
          this.validate(snapshot[key as never])
        );
    }
  }
}
