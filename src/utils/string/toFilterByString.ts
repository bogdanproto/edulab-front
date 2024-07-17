export const toFilterByString = <T extends { title: string }>(
  arr: T[],
  str: string
) =>
  arr.filter((item: T) =>
    (item as T).title.toLowerCase().includes(str.toLowerCase())
  );
