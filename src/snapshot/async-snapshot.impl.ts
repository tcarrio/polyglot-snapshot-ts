import { deepAwait } from "../util/deep-await";
import { SnapshotImpl } from "./snapshot.impl";
import { Snapshotter, SnapshotterOptions } from "./snapshot.interface";
import { SnapshotValidator } from "./validator";

export class AsyncSnapshotImpl implements Snapshotter {
  private static readonly defaultOptions: SnapshotterOptions = {
    validate: true,
  };

  private readonly snapshotter = new SnapshotImpl({ validate: false });
  private readonly options: SnapshotterOptions;

  public constructor(overrideOptions: Partial<SnapshotterOptions> = {}) {
    this.options = { ...AsyncSnapshotImpl.defaultOptions, ...overrideOptions };
  }

  public async snapshot(module: object): Promise<unknown> {
    const output = await deepAwait(this.snapshotter.snapshot(module));

    if (this.options.validate) {
      SnapshotValidator.validate(output);
    }

    return output;
  }
}
