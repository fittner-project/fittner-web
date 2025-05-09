import { CenterListResDto } from "@/api/generated/models";
import CenterCard from "@/components/center-card/CenterCard";
import Skeleton from "@/components/skeleton/Skeleton";
import styles from "./SearchedCenters.module.scss";
import BackgroundContainer from "@/layout/containers/background-container/BackgroundContainer";

interface SearchedCentersProps {
  centerList: CenterListResDto[] | undefined;
  isCenterListLoading: boolean;
  handleCenterClick?: (center: CenterListResDto) => void;
}

export default function SearchedCenters({
  centerList,
  isCenterListLoading,
  handleCenterClick,
}: SearchedCentersProps) {
  return (
    <BackgroundContainer>
      <div className={styles.container}>
        {isCenterListLoading ? (
          <Skeleton
            width={15}
            height={2.2}
            borderRadius={1}
            backgroundColor="skeleton_2"
          />
        ) : (
          <p className={styles.search_result}>
            검색 결과{" "}
            <span className={styles.search_result_count}>
              {centerList?.length}건
            </span>
          </p>
        )}
        <div className={styles.center_list}>
          {isCenterListLoading
            ? [...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  height={30}
                  borderRadius={2}
                  fullWidth
                  backgroundColor="skeleton_2"
                >
                  <Skeleton
                    fullWidth
                    height={22}
                    backgroundColor="skeleton_3"
                  />

                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      flexDirection: "column",
                      padding: "1.5rem 2rem",
                    }}
                  >
                    <Skeleton
                      width={17}
                      height={2.2}
                      backgroundColor="skeleton_3"
                      borderRadius={1}
                    />
                    <Skeleton
                      width={20}
                      height={2.2}
                      backgroundColor="skeleton_3"
                      borderRadius={1}
                    />
                  </div>
                </Skeleton>
              ))
            : centerList?.map((center) => (
                <CenterCard
                  handleCenterClick={() => handleCenterClick?.(center)}
                  key={center.centerId}
                  center={center}
                />
              ))}
        </div>
      </div>
    </BackgroundContainer>
  );
}
