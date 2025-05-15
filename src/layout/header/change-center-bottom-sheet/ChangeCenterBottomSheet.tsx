import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./ChangeCenterBottomSheet.module.scss";
import { useGetUserCenters } from "@/api/generated/유저/유저";
import { uniqueId } from "lodash";
import classNames from "classnames";

export default function ChangeCenterBottomSheet() {
  const selectedCenter = useUserStore((state) => state.selectedCenter);
  const trainerEmail = useUserStore((state) => state.userInfo?.trainerEmail);
  const setSelectedCenter = useUserStore((state) => state.setSelectedCenter);
  const { data } = useGetUserCenters(trainerEmail ?? "", {
    query: { enabled: !!trainerEmail },
  });

  const centers = data?.result?.filter(
    (center) => center.centerJoinApprovalYn === "Y"
  );

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>센터 변경</p>

        <div className={styles.center_list}>
          {centers?.map((center) => (
            <p
              key={uniqueId()}
              onClick={() => {
                setSelectedCenter(center);
              }}
              className={classNames(styles.center, {
                [styles.active]:
                  center.centerName === selectedCenter.centerName,
              })}
            >
              {center.centerName}
            </p>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
