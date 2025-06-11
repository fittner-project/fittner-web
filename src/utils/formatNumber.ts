export const formatNumberOnly = ({ value }: { value: string }): string => {
  return value.replace(/[^0-9]/g, "");
};
