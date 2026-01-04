import dayjs from "dayjs";
import styles from "./NotificationHistory.module.scss";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import Skeleton from "@/components/skeleton/Skeleton";
import { useGetUserPushs, usePostUserPushRead } from "@/api/generated/푸시/푸시";
import { useUserStore } from "@/stores/user";
import { PushResDto } from "@/api/generated/models";

function NotificationHistory() {
  const { selectedCenter } = useUserStore();
  const centerId = selectedCenter?.centerId ?? "";

  const { data, isPending, refetch } = useGetUserPushs(
    { centerId },
    {
      query: {
        enabled: !!centerId,
      },
    }
  );

  const { mutate: markAsRead } = usePostUserPushRead({
    mutation: {
      onSuccess: () => {
        refetch();
      },
    },
  });

  const notifications = data?.result ?? [];
  const isLoading = isPending && !!centerId;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = dayjs(dateString, "YYYYMMDD");
    const today = dayjs();
    const yesterday = dayjs().subtract(1, "day");

    if (date.isSame(today, "day")) {
      return "오늘";
    }
    if (date.isSame(yesterday, "day")) {
      return "어제";
    }
    return date.format("YYYY.MM.DD");
  };

  const handleNotificationClick = (notification: PushResDto) => {
    if (notification.pushReadYn === "N" && notification.pushId) {
      markAsRead({
        data: { pushId: notification.pushId },
      });
    }
  };

  if (isLoading) {
    return (
      <PaddingContainer>
        <div className={styles.container}>
          <div className={styles.list}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={styles.skeleton_item}>
                <Skeleton width={12} height={2} borderRadius={0.4} />
                <Skeleton fullWidth height={1.8} borderRadius={0.4} />
                <Skeleton width={8} height={1.4} borderRadius={0.4} />
              </div>
            ))}
          </div>
        </div>
      </PaddingContainer>
    );
  }

  if (notifications.length === 0) {
    return (
      <PaddingContainer>
        <div className={styles.container}>
          <div className={styles.empty}>
            <svg
              className={styles.empty_icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            <span className={styles.empty_text}>알림 내역이 없습니다</span>
          </div>
        </div>
      </PaddingContainer>
    );
  }

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <div className={styles.list}>
          {notifications.map((notification) => (
            <div
              key={notification.pushId}
              className={`${styles.item} ${notification.pushReadYn === "N" ? styles.unread : ""}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <span className={styles.title}>{notification.pushTitle}</span>
              <span className={styles.content}>{notification.pushContent}</span>
              <span className={styles.date}>
                {formatDate(notification.pushDate)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PaddingContainer>
  );
}

export default NotificationHistory;
