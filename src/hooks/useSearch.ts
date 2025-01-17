import { useMemo } from "react";
import { getChosung } from "@/utils/hangul";

interface SearchConfig<T> {
  searchValue: string;
  data: T[] | undefined;
  searchFields: (keyof T)[];
}

export function useSearch<T extends Record<string, any>>({
  searchValue,
  data,
  searchFields,
}: SearchConfig<T>) {
  const filteredData = useMemo(() => {
    if (!searchValue || !data) return data;

    const searchTerm = searchValue.toLowerCase();
    const { result: searchChosung } = getChosung({ str: searchValue });

    return data.filter((item) => {
      return searchFields.some((field) => {
        const fieldValue = item[field]?.toString() ?? "";
        const fieldValueLower = fieldValue.toLowerCase();
        const fieldValueChosung = getChosung({ str: fieldValue }).result;

        return (
          fieldValueLower.includes(searchTerm) ||
          fieldValueChosung.includes(searchChosung)
        );
      });
    });
  }, [searchValue, data, searchFields]);

  return { filteredData };
}
