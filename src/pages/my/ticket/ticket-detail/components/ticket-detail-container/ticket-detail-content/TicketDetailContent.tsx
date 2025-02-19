import TicketStatus from "@/pages/my/ticket/components/ticket-status/TicketStatus";
import styles from "./TicketDetailContent.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";

interface TicketDetailContentProps {
  title: string;
  contentType: "text" | "status";
  content?: string;
  ticketCode?: string;
  isLoading: boolean;
}

export default function TicketDetailContent({
  title,
  contentType,
  content,
  ticketCode,
  isLoading,
}: TicketDetailContentProps) {
  return (
    <>
      {isLoading ? (
        <Skeleton width={"80%"} height={2.2} borderRadius={1} />
      ) : (
        <div className={styles.container}>
          <p className={styles.title}>{title}</p>
          {contentType === "text" && (
            <p className={styles.content}>{content}</p>
          )}
          {contentType === "status" && <TicketStatus ticketCode={ticketCode} />}
        </div>
      )}
    </>
  );
}
