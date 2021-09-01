export interface SnapshotSerializer {
  serialize: (snapshot: unknown) => string;
}
