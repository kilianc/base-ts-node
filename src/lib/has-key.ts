export const hasKey = <T extends Record<string | number | symbol, unknown>>(
  o: T,
  k: string | number
): k is Extract<keyof T, typeof k> => {
  return o[k] != null
}
