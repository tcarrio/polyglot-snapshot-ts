export type FactoryFunction = () => unknown;

export type SnapshotTarget = "typescript" | "json" | "yaml" | "python";

export type SyncSnapshotPipeline = (module: unknown) => string;
export type AsyncSnapshotPipeline = (module: unknown) => Promise<string>;
export type SnapshotPipeline = SyncSnapshotPipeline | AsyncSnapshotPipeline;
