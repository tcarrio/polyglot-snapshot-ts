export interface Snapshotter {
  snapshot: (module: object) => unknown;
}

export interface SnapshotterOptions {
  validate: boolean;
}
