import { SnapshotTarget } from "../types";
import {
  JsonSerializerImpl,
  PythonSerializerImpl,
  TypeScriptSerializerImpl,
  YamlSerializerImpl,
} from "./impl";
import { SnapshotSerializer } from "./serializer.interface";

export function serializerFactory(target: SnapshotTarget): SnapshotSerializer {
  switch (target) {
    case "typescript":
      return new TypeScriptSerializerImpl();
    case "json":
      return new JsonSerializerImpl();
    case "yaml":
      return new YamlSerializerImpl();
    case "python":
      return new PythonSerializerImpl();
    default:
      throw new Error(`Target ${target} is not supported`);
  }
}
