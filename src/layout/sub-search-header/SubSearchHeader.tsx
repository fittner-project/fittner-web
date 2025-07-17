import { chevronLeft } from "@/assets/assets";
import Image from "@/components/image/Image";

import styles from "./SubSearchHeader.module.scss";
import Input from "@/components/input/Input";
import useGetCurrentRoute from "@/hooks/useGetCurrentRoute";
import { useSearchValueStore } from "@/stores/searchValue";

interface SubSearchHeaderProps {
  fallback: string | "none";
}

export default function SubSearchHeader({ fallback }: SubSearchHeaderProps) {
  const searchValue = useSearchValueStore((state) => state.searchValue);
  const setSearchValue = useSearchValueStore((state) => state.setSearchValue);
  const { currentRoute } = useGetCurrentRoute();
  const navigate = useNavigate();

  const handleBack = () => {
    if (fallback === "none") navigate(-1);
    else navigate(fallback);
  };

  return (
    <header className={styles.container}>
      <button onClick={handleBack} className={styles.back_button}>
        <Image src={chevronLeft} />
      </button>
      <div className={styles.search_container}>
        <Input
          inputType="line-search"
          placeholder={currentRoute?.subHeaderConfig?.searchConfig?.placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </header>
  );
}
