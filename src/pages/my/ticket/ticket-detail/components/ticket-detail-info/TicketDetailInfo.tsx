import { TicketInfo } from "@/api/generated/models";
import TicketDetailContent from "../ticket-detail-container/ticket-detail-content/TicketDetailContent";
import TicketDetailContainer from "../ticket-detail-container/TicketDetailContainer";
import styles from "./TicketDetailInfo.module.scss";
import dayjs from "dayjs";

interface TicketDetailInfoProps {
  ticketInfo: TicketInfo | undefined;
  isLoading: boolean;
}

export default function TicketDetailInfo({
  ticketInfo,
  isLoading,
}: TicketDetailInfoProps) {
  return (
    <div className={styles.container}>
      <TicketDetailContainer isLoading={isLoading} type="ticket-info">
        <TicketDetailContent
          title="상태"
          contentType="status"
          ticketCode={ticketInfo?.ticketCode}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="상품명"
          contentType="text"
          content={ticketInfo?.ticketName}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="기간"
          contentType="text"
          content={`${dayjs(ticketInfo?.ticketStartDate).format("YYYY.MM.DD")}~${dayjs(ticketInfo?.ticketEndDate).format("YYYY.MM.DD")}`}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="잔여횟수"
          contentType="text"
          content={`${Number(ticketInfo?.ticketTotalCnt) - Number(ticketInfo?.ticketUseCnt)}회 (총 ${ticketInfo?.ticketTotalCnt}회)`}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="금액"
          contentType="text"
          content={`${Number(ticketInfo?.ticketPrice).toLocaleString()}원`}
          isLoading={isLoading}
        />
      </TicketDetailContainer>
    </div>
  );
}
