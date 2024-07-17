export const setPreviewString = <T extends string, N extends number>(
  str: T,
  qnt: N
): T => {
  return (str.slice(0, qnt) + '...') as T;
};
