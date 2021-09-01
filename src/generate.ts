import { serializerFactory } from "./serializers/factory";
import { SnapshotSerializer } from "./serializers/serializer.interface";
import { AsyncSnapshotImpl, SnapshotImpl } from "./snapshot";
import { SnapshotTarget } from "./types";

export async function generate<T extends SnapshotTarget>(
  module: object,
  targets: T[]
): Promise<GeneratorOutput<T>> {
  const snapshotter = new AsyncSnapshotImpl();
  const snapshot = await snapshotter.snapshot(module);
  const outputs = generateOutputs(snapshot, targets);

  return {
    targets: outputs,
  };
}

export function generateSync<T extends SnapshotTarget>(
  module: object,
  targets: T[]
): unknown {
  const snapshotter = new SnapshotImpl();
  const snapshot = snapshotter.snapshot(module);
  const outputs = generateOutputs(snapshot, targets);

  return {
    targets: outputs,
  };
}

function generateOutputs<T extends SnapshotTarget>(
  snapshot: unknown,
  targets: T[]
): Record<T, string> {
  return targets
    .map((target): [SnapshotTarget, SnapshotSerializer] => [
      target,
      serializerFactory(target),
    ])
    .reduce(
      (map, [target, serializer]) => ({
        ...map,
        [target]: serializer.serialize(snapshot),
      }),
      {} as Record<T, string>
    );
}

export interface GeneratorOutput<T extends SnapshotTarget> {
  targets: Record<T, string>;
}
