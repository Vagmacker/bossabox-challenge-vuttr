export const isEmpty = (value: any): boolean => {
  return (
    value === null ||
    value === undefined ||
    (value && value.length === 0) ||
    Object.keys(value).length === 0
  );
};
