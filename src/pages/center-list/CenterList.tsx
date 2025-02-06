import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./CenterList.module.scss";
import Center from "./components/center/Center";
import { openBottomSheet } from "@/utils/bottomSheet";
import ApprovalNoticeBottomSheet from "./components/approval-notice-bottom-sheet/ApprovalNoticeBottomSheet";
import { storageKeys } from "@/constants/storageKeys";
import { storage } from "@/utils/storage";
import { useGetUserCenters } from "@/api/generated/유저/유저";
import Skeleton from "@/components/skeleton/Skeleton";

export default function CenterList() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const trainerEmail = storage.get<string>({
    key: storageKeys.trainerEmail,
  });

  const {
    data: initialUserCentersData,
    isLoading: isInitialUserCentersLoading,
  } = useGetUserCenters(
    trainerEmail as string,
    {
      currentPageNo: "1",
      recordsPerPage: "10",
    },
    { query: { enabled: !!trainerEmail } }
  );

  const connectedCenters = initialUserCentersData?.result?.items?.filter(
    (center) => center.centerJoinMainYn === "Y"
  );

  const notConnectedCenters = initialUserCentersData?.result?.items?.filter(
    (center) => center.centerJoinMainYn === "N"
  );

  useEffect(() => {
    if (!isAuthenticated) {
      openBottomSheet({
        component: ApprovalNoticeBottomSheet,
      });
    }
  }, [isAuthenticated]);

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <div style={{ width: "100%" }}>
          <p className={styles.title}>연동 승인중</p>
          <div className={styles.center_list}>
            {notConnectedCenters?.map((center) => (
              <Center isConnected={false} center={center} />
            ))}

            {isInitialUserCentersLoading && (
              <Skeleton className={styles.center_skeleton}>
                <div className={styles.center_skeleton_left}>
                  <Skeleton
                    width={10}
                    height={2.2}
                    borderRadius={1}
                    backgroundColor="skeleton_2"
                  />
                  <Skeleton
                    width={17.5}
                    height={2.2}
                    borderRadius={1}
                    backgroundColor="skeleton_2"
                  />
                </div>
                <Skeleton
                  width={9.337}
                  height={3.6}
                  borderRadius={10}
                  backgroundColor="skeleton_2"
                />
              </Skeleton>
            )}
          </div>
        </div>

        <div
          style={{
            minHeight: "25rem",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flex: 1,
          }}
        >
          <p className={styles.title}>연동 완료</p>

          <div className={styles.center_list}>
            {connectedCenters?.map((center) => (
              <Center isConnected={true} center={center} />
            ))}
          </div>

          {connectedCenters?.length === 0 && (
            <div className={styles.no_center_container}>
              <p className={styles.no_center_text}>연동된 센터가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </PaddingContainer>
  );
}
