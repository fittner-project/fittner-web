import styles from "./NotificationHistory.module.scss";

function NotificationHistory() {
  const notifications: unknown[] = []; // Assuming no notifications for now

  return (
    <div className={styles.container}>
      {notifications.length === 0 ? (
        <div className={styles.no_notifications}>알림 내역이 없습니다</div>
      ) : (
        <div>
          {/* We will map through notifications here later */}
        </div>
      )}
    </div>
  );
}

export default NotificationHistory;
