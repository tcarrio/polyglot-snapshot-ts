import { SnapshotSerializer } from "../serializer.interface";
import { dump } from "js-yaml";

export class YamlSerializerImpl implements SnapshotSerializer {
  public serialize(snapshot: unknown) {
    return dump(snapshot);
  }
}
