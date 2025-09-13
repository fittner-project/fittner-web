import Image from "@/components/image/Image";
import styles from "./TicketList.module.scss";
import { chevronRightGrey } from "@/assets/assets";
import { TicketListResDto } from "@/api/generated/models";
import dayjs from "dayjs";
import Skeleton from "@/components/skeleton/Skeleton";
import TicketStatus from "../ticket-status/TicketStatus";

interface TicketListProps {
  tickets: TicketListResDto[] | undefined;
  isLoading: boolean;
}

export default function TicketList({ tickets, isLoading }: TicketListProps) {
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
            <Link
              to={ticket.ticketId ?? ""}
              key={ticket.ticketId}
              className={styles.ticket_item}
            >
              <section className={styles.left_section}>
                <div className={styles.trainee_info}>
                  <p className={styles.trainee_name}>
                    {ticket.memberName}{" "}
                    <span className={styles.trainee_phone_end}>
                      {`${ticket.memberPhoneEnd !== null ? `(${ticket.memberPhoneEnd})` : ""}`}
                    </span>
                  </p>
                  <TicketStatus ticketCode={ticket.ticketCode} />
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
            </Link>
          ))}

      {tickets?.length === 0 && (
        <div className={styles.no_tickets}>등록된 이용권이 없습니다.</div>
      )}
    </div>
  );
}
