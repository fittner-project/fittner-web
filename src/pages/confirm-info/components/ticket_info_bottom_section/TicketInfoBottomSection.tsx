import Flex from "@/components/flex/Flex";
import styles from "./TicketInfoBottomSection.module.scss";
import { AssignToInfoResDto, RefundInfoResDto } from "@/api/generated/models";
import COLORS from "@/constants/colors";

interface TicketInfoBottomSectionProps {
  ticketTotalCnt: number;
  ticketRemainCnt: number;
  refundInfo: RefundInfoResDto | null;
  assignInfo: AssignToInfoResDto | null;
}

export default function TicketInfoBottomSection({
  ticketTotalCnt,
  ticketRemainCnt,
  refundInfo,
  assignInfo,
}: TicketInfoBottomSectionProps) {
  return (
    <div className={styles.container}>
      <Flex justifyContent="space-between">
        <p>잔여횟수</p>
        <p className={styles.ticket_remaining_count_value}>
          <span>{ticketRemainCnt}회</span> 총 <span>{ticketTotalCnt}회</span>
        </p>
      </Flex>
      {refundInfo && <RefundInfoSection refundInfo={refundInfo} />}
    </div>
  );
}

function RefundInfoSection({ refundInfo }: { refundInfo: RefundInfoResDto }) {
  return (
    <div
      style={{
        marginTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <Flex style={{ width: "100%" }} justifyContent="space-between">
        <p>총액</p>
        <p style={{ color: COLORS.text_4, fontWeight: 700 }}>
          {Number(refundInfo.ticketPrice).toLocaleString()}원
        </p>
      </Flex>
      <Flex style={{ width: "100%" }} justifyContent="space-between">
        <p>사용금액</p>
        <p style={{ color: COLORS.text_4, fontWeight: 700 }}>
          {Number(refundInfo.ticketUsePrice).toLocaleString()}원
        </p>
      </Flex>
      <Flex
        style={{ width: "100%", color: COLORS.text_7 }}
        justifyContent="space-between"
      >
        <p>환불 예상금액</p>
        <p style={{ color: COLORS.text_4, fontWeight: 700 }}>
          {Number(refundInfo.refundPrice).toLocaleString()}원
        </p>
      </Flex>
    </div>
  );
}
