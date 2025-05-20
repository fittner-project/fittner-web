import styles from "./TicketInfoBottomSection.module.scss";
import { AssignToInfoResDto, RefundInfoResDto } from "@/api/generated/models";
import COLORS from "@/constants/colors";
import Skeleton from "@/components/skeleton/Skeleton";
import Row from "@/components/flex/Row";

interface TicketInfoBottomSectionProps {
  isLoading: boolean;
  ticketTotalCnt: number;
  ticketRemainCnt: number;
  refundInfo?: RefundInfoResDto;
  assignInfo?: AssignToInfoResDto;
}

export default function TicketInfoBottomSection({
  isLoading,
  ticketTotalCnt,
  ticketRemainCnt,
  refundInfo,
  assignInfo,
}: TicketInfoBottomSectionProps) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <Row justifyContent="space-between">
          <Skeleton
            backgroundColor="skeleton_2"
            height={2.2}
            width={5.877}
            borderRadius={1}
          />
          <Skeleton
            backgroundColor="skeleton_2"
            height={2.2}
            width={9.513}
            borderRadius={1}
          />
        </Row>
      ) : (
        <Row justifyContent="space-between">
          <p>잔여횟수</p>
          <p className={styles.ticket_remaining_count_value}>
            <span>{ticketRemainCnt}회</span> 총 <span>{ticketTotalCnt}회</span>
          </p>
        </Row>
      )}
      {refundInfo && <RefundInfoSection refundInfo={refundInfo} />}
      {assignInfo && (
        <AssignInfoSection assigneeMember="몰라" assignInfo={assignInfo} />
      )}
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
      <Row style={{ width: "100%" }} justifyContent="space-between">
        <p>총액</p>
        <p style={{ color: COLORS.text_4, fontWeight: 700 }}>
          {Number(refundInfo.ticketPrice).toLocaleString()}원
        </p>
      </Row>

      <Row style={{ width: "100%" }} justifyContent="space-between">
        <p>사용금액</p>
        <p style={{ color: COLORS.text_4, fontWeight: 700 }}>
          {Number(refundInfo.ticketUsePrice).toLocaleString()}원
        </p>
      </Row>

      <Row
        style={{ width: "100%", color: COLORS.text_7 }}
        justifyContent="space-between"
      >
        <p>환불 예상금액</p>
        <p style={{ color: COLORS.text_4, fontWeight: 700 }}>
          {Number(refundInfo.refundPrice).toLocaleString()}원
        </p>
      </Row>
    </div>
  );
}

function AssignInfoSection({
  assigneeMember,
  assignInfo,
}: {
  assigneeMember: string;
  assignInfo: AssignToInfoResDto;
}) {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <Row style={{ width: "100%" }} justifyContent="space-between">
        <p>양도 회원</p>
        <p style={{ color: COLORS.text_7, fontWeight: 700 }}>
          {`${assigneeMember}(${assignInfo.memberPhoneEnd})`}
        </p>
      </Row>
    </div>
  );
}
