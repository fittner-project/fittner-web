import styles from "./FindCenters.module.scss";

import CenterSearchTips from "./components/center-search-tips/CenterSearchTips";

import SearchedCenters from "./components/searched-centers/SearchedCenters";

import { useSearch } from "@/hooks/useSearch";
import { openBottomSheet } from "@/utils/bottomSheet";
import SelectCenterBottomSheet from "./components/searched-centers/select-center-bottom-sheet/SelectCenterBottomSheet";
import { CenterListResDto } from "@/api/generated/models";

import { useEffect, useRef } from "react";
import { useSearchValueStore } from "@/stores/searchValue";
import { useGetUserCenterList } from "@/api/generated/유저/유저";
import { useSearchParams } from "react-router-dom";
import useAssignNewTraineeValueStore from "../assign-new-trainee/stores/assignNewTraineeValue";

function FindCenters() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const navigate = useNavigate();
  const searchValue = useSearchValueStore((state) => state.searchValue);
  const reset = useSearchValueStore((state) => state.reset);
  const showCenterList = useRef(false);
  const { data: centerListData, isLoading: isCenterListLoading } =
    useGetUserCenterList();
  const centerList = centerListData?.result;
  const { filteredData: filteredCenterList } = useSearch({
    searchValue,
    data: centerList,
    searchFields: ["centerName", "centerAddress"],
  });
  const setSelectedCenter = useAssignNewTraineeValueStore(
    (state) => state.setSelectedCenter
  );

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const handleCenterClick = (center: CenterListResDto) => {
    if (type === "assign-new") {
      setSelectedCenter(center);
      navigate(-1);
      return;
    }

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
