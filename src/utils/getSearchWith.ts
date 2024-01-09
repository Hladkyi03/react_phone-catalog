export const getSearchWith = (
  currentParams: URLSearchParams,
  key: string,
  value: number | string,
) => {
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

  newParams.set(key, value.toString());

  return newParams;
};
