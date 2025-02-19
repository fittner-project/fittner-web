import { PropsWithChildren } from "react";
import styles from "./TicketDetailContainer.module.scss";
import TicketDetailTitle from "./ticket-detail-title/TicketDetailTitle";
import Skeleton from "@/components/skeleton/Skeleton";

type TicketDetailContainerTitleType =
  | "trainee-info"
  | "ticket-info"
  | "refund-info"
  | "assignment-to"
  | "assignment-from"
  | string;

interface TicketDetailContainerProps {
  type: TicketDetailContainerTitleType;
  isLoading: boolean;
}

export default function TicketDetailContainer({
  type,
  children,
  isLoading,
}: PropsWithChildren<TicketDetailContainerProps>) {
  const getTitle = (type: TicketDetailContainerTitleType) => {
    switch (type) {
      case "trainee-info":
        return "회원 정보";
      case "ticket-info":
        return "이용권 정보";
      case "refund-info":
        return "환불 내역";
      case "assignment-to":
        return "양도한 내역";
      case "assignment-from":
        return "양도받은 내역";
    }
  };

  return (
    <div className={styles.container}>
      <TicketDetailTitle>
        {isLoading ? (
          <Skeleton width={7.4} height={2.2} borderRadius={1} />
        ) : (
          getTitle(type)
        )}
      </TicketDetailTitle>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
