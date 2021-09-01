import { SnapshotSerializer } from "../serializer.interface";

export class JsonSerializerImpl implements SnapshotSerializer {
  public serialize(snapshot: unknown) {
    return JSON.stringify(snapshot, null, 2);
  }
}
