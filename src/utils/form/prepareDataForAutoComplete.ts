type AutoCompleteItem = {
  id: number;
  title: string;
  [key: string]: unknown;
};

export const prepareDataForAutoComplete = (
  arr: AutoCompleteItem[] | undefined
) =>
  arr &&
  arr.map(({ id, title }) => ({
    id,
    title,
  }));
