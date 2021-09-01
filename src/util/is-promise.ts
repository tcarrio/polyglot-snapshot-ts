export function isPromise(input: unknown): input is Promise<unknown> {
  return !!(
    typeof input === "object" &&
    input &&
    (input as unknown as Promise<unknown>)["then"]
  );
}
