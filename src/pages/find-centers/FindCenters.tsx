import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./FindCenters.module.scss";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import CenterSearchTips from "./components/center-search-tips/CenterSearchTips";

interface SearchCenterForm {
  name: string;
}

function FindCenters() {
  const { register, handleSubmit, watch } = useForm<SearchCenterForm>({
    mode: "onChange",
  });

  const name = watch("name");

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <Input
          type="line-search"
          placeholder="센터명, 주소를 입력해주세요"
          {...register("name", {
            required: true,
          })}
        />

        {!name && <CenterSearchTips />}
      </div>
    </PaddingContainer>
  );
}

export default FindCenters;
