import styles from "./FindCenters.module.scss";

import CenterSearchTips from "./components/center-search-tips/CenterSearchTips";

import SearchedCenters from "./components/searched-centers/SearchedCenters";

import { useSearch } from "@/hooks/useSearch";
import { openBottomSheet } from "@/utils/bottomSheet";
import SelectCenterBottomSheet from "./components/searched-centers/select-center-bottom-sheet/SelectCenterBottomSheet";
import { CenterListResDto } from "@/api/generated/models";

import { useEffect, useRef } from "react";
import { useSearchValueStore } from "@/store/searchValue";
import { useGetUserCenterList } from "@/api/generated/유저/유저";

function FindCenters() {
  const { searchValue, reset } = useSearchValueStore();
  const showCenterList = useRef(false);
  const { data: centerListData, isLoading: isCenterListLoading } =
    useGetUserCenterList();
  const centerList = centerListData?.result;

  const { filteredData: filteredCenterList } = useSearch({
    searchValue,
    data: centerList,
    searchFields: ["centerName", "centerAddress"],
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const handleCenterClick = (center: CenterListResDto) => {
    openBottomSheet({
      component: SelectCenterBottomSheet,
      props: {
        center,
      },
    });
  };

  useEffect(() => {
    if (searchValue) {
      showCenterList.current = true;
    }
  }, [searchValue]);

  return (
    <div className={styles.container}>
      {!showCenterList.current && !searchValue && <CenterSearchTips />}
      {(showCenterList.current || searchValue) && (
        <SearchedCenters
          centerList={filteredCenterList}
          isCenterListLoading={isCenterListLoading}
          handleCenterClick={handleCenterClick}
        />
      )}
    </div>
  );
}

export default FindCenters;
