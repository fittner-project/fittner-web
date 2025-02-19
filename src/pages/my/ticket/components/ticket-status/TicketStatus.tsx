import classNames from "classnames";
import styles from "./TicketStatus.module.scss";

interface TicketStatusProps {
  ticketCode: string | undefined;
}

export default function TicketStatus({ ticketCode }: TicketStatusProps) {
  const getTicketStatus = (ticketCode: string | undefined) => {
    const codeToFilterMap: { [key: string]: string } = {
      TOTAL: "전체",
      STOP: "이용전",
      ING: "이용중",
      REFUND: "환불",
      ASSIGN_TO: "양도하기",
      ASSIGN_FROM: "양도받기",
      AFTER: "기간만료",
    };

    return codeToFilterMap[ticketCode ?? ""];
  };
  return (
    <div
      className={classNames(styles.container, {
        [styles.stop]: ticketCode === "STOP",
        [styles.ing]: ticketCode === "ING",
        [styles.refund]: ticketCode === "REFUND",
        [styles.assign_to]: ticketCode === "ASSIGN_TO",
        [styles.assign_from]: ticketCode === "ASSIGN_FROM",
        [styles.after]: ticketCode === "AFTER",
      })}
    >
      {getTicketStatus(ticketCode)}
    </div>
  );
}
