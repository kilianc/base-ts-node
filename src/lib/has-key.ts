export const hasKey = <T extends Record<number | string | symbol, unknown>>(
  o: T,
  k: number | string
): k is Extract<keyof T, typeof k> => {
  return o[k] != null
}
