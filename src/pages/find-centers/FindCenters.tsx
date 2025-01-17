import styles from "./FindCenters.module.scss";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import CenterSearchTips from "./components/center-search-tips/CenterSearchTips";

import SearchedCenters from "./components/searched-centers/SearchedCenters";
import { useCenterList1 } from "@/api/generated/유저/유저";
import { useSearch } from "@/hooks/useSearch";

interface SearchCenterForm {
  searchCenterValue: string;
}

function FindCenters() {
  const { register, watch } = useForm<SearchCenterForm>({
    mode: "onChange",
  });
  const showCenterList = useRef(false);
  const searchCenterValue = watch("searchCenterValue");
  const { data: centerListData, isLoading: isCenterListLoading } =
    useCenterList1();
  const centerList = centerListData?.result;

  const { filteredData: filteredCenterList } = useSearch({
    searchValue: searchCenterValue,
    data: centerList,
    searchFields: ["centerName", "centerAddress"],
  });

  return (
    <div className={styles.container}>
      <div className={styles.search_container}>
        <Input
          onFocus={() => (showCenterList.current = true)}
          inputType="line-search"
          placeholder="센터명, 주소를 입력해주세요"
          {...register("searchCenterValue", {
            required: true,
          })}
        />
      </div>

      {!showCenterList.current && !searchCenterValue && <CenterSearchTips />}
      {(showCenterList.current || searchCenterValue) && (
        <SearchedCenters
          centerList={filteredCenterList}
          isCenterListLoading={isCenterListLoading}
        />
      )}
    </div>
  );
}

export default FindCenters;
