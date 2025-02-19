import { RefundInfo } from "@/api/generated/models";
import TicketDetailContent from "../ticket-detail-container/ticket-detail-content/TicketDetailContent";
import TicketDetailContainer from "../ticket-detail-container/TicketDetailContainer";
import styles from "./RefundDetailInfo.module.scss";
import dayjs from "dayjs";

interface RefundDetailInfoProps {
  refundInfo: RefundInfo | undefined;
  isLoading: boolean;
}

export default function RefundDetailInfo({
  refundInfo,
  isLoading,
}: RefundDetailInfoProps) {
  if (refundInfo === null) return;

  return (
    <div className={styles.container}>
      <TicketDetailContainer isLoading={isLoading} type="refund-info">
        <TicketDetailContent
          title="환불횟수"
          contentType="text"
          content={`${refundInfo?.refundCnt}회`}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="환불금액"
          contentType="text"
          content={`${Number(refundInfo?.refundPrice).toLocaleString()}원`}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="환불일시"
          contentType="text"
          content={dayjs(refundInfo?.refundDateTime).format("YYYY.MM.DD")}
          isLoading={isLoading}
        />
      </TicketDetailContainer>
    </div>
  );
}
