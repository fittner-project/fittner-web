import Image from "@/components/image/Image";
import styles from "./TicketList.module.scss";
import { chevronRightGrey } from "@/assets/assets";
import { TicketListResDto } from "@/api/generated/models";
import dayjs from "dayjs";
import classNames from "classnames";
import Skeleton from "@/components/skeleton/Skeleton";

interface TicketListProps {
  tickets: TicketListResDto[] | undefined;
  isLoading: boolean;
}

export default function TicketList({ tickets, isLoading }: TicketListProps) {
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
    <div className={styles.container}>
      {isLoading
        ? Array.from({ length: 10 }).map(() => (
            <Skeleton
              height={11.6}
              style={{
                padding: "1.8rem",
                margin: "0 -1.8rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Skeleton
                  width={15.7}
                  height={2.2}
                  borderRadius={1}
                  backgroundColor="skeleton_2"
                />
                <Skeleton
                  width={12}
                  height={2.2}
                  backgroundColor="skeleton_2"
                  borderRadius={1}
                  style={{ marginTop: "0.7rem" }}
                />
                <Skeleton
                  width={15.8}
                  height={2.2}
                  backgroundColor="skeleton_2"
                  borderRadius={1}
                  style={{ marginTop: "0.5rem" }}
                />
              </div>
              <Skeleton
                width={2.8}
                height={2.8}
                borderRadius={1}
                backgroundColor="skeleton_2"
              />
            </Skeleton>
          ))
        : tickets?.map((ticket) => (
            <div key={ticket.ticketId} className={styles.ticket_item}>
              <section className={styles.left_section}>
                <div className={styles.trainee_info}>
                  <p className={styles.trainee_name}>
                    {ticket.memeberName}{" "}
                    {`${ticket.ticketTotalCnt !== null ? `(${ticket.ticketTotalCnt})` : ""}`}
                  </p>
                  <div
                    className={classNames(styles.ticket_status, {
                      [styles.stop]: ticket.ticketCode === "STOP",
                      [styles.ing]: ticket.ticketCode === "ING",
                      [styles.refund]: ticket.ticketCode === "REFUND",
                      [styles.assign_to]: ticket.ticketCode === "ASSIGN_TO",
                      [styles.assign_from]: ticket.ticketCode === "ASSIGN_FROM",
                      [styles.after]: ticket.ticketCode === "AFTER",
                    })}
                  >
                    {getTicketStatus(ticket.ticketCode)}
                  </div>
                </div>
                <p className={styles.ticket_name}>{ticket.ticketName}</p>
                <p className={styles.ticket_period}>
                  {dayjs(ticket.ticketStartDate).format("YYYY.MM.DD")}~
                  {dayjs(ticket.ticketEndDate).format("YYYY.MM.DD")}
                </p>
              </section>
              <Image
                src={chevronRightGrey}
                alt="chevron-right"
                width={2.8}
                height={2.8}
              />
            </div>
          ))}
    </div>
  );
}
