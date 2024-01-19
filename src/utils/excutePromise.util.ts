export const excutePromise = <T, E = Error>(
  promise: Promise<T>,
): Promise<[err: E, data: T]> => {
  return promise
    .then<[null, T]>((data) => [null, data])
    .catch<[E, null]>((err) => [err, null]);
};
