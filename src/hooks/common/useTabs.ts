import { useCallback, useMemo, useState } from "react";

export type TabController = {
  tabIdx: number;
  validTab: (idx: number) => boolean;
  changeTab: (idx: number) => void;
  canChangeTab?: (prev: number, next: number) => boolean;
  onChange?: (idx: number) => void;
};

const useTabs = (
  intialIdx: number,
  length: number,
  onChange?: (idx: number) => void,
  canChangeTab: (next: number) => boolean = (idx) => true
): TabController => {
  const [selected, setSelected] = useState(intialIdx);
  const validTab = useCallback(
    (idx: number) => {
      return idx >= 0 && idx < length;
    },
    [length]
  );
  const changeTab = useCallback(
    (idx: number) => {
      if (validTab(idx) && canChangeTab(idx)) {
        setSelected((prev) => idx);
        onChange?.(idx);
      }
    },

    [canChangeTab, onChange, validTab]
  );
  const memo = useMemo<TabController>(
    () => ({
      tabIdx: selected,
      validTab,
      changeTab,
      onChange,
    }),
    [changeTab, onChange, selected, validTab]
  );
  return memo;
};
export default useTabs;
