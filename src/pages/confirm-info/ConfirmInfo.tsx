import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./ConfirmInfo.module.scss";
import Button from "@/components/button/Button";
import TicketInfoBottomSection from "./components/ticket_info_bottom_section/TicketInfoBottomSection";
import {
  useGetUserTicketAssignInfo,
  useGetUserTicketRefundInfo,
} from "@/api/generated/이용권/이용권";
import dayjs from "dayjs";
import { openModal } from "@/utils/modal";
import ConfirmRefundModal from "./components/confirm-refund-modal/ConfirmRefundModal";

export default function ConfirmInfo() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const ticketId = searchParams.get("ticketId");
  const memberId = searchParams.get("memberId");
  const { data: refundInfoData } = useGetUserTicketRefundInfo(
    { ticketId: ticketId ?? "" },
    { query: { enabled: !!ticketId && type === "refund" } }
  );
  const { data: assignInfoData } = useGetUserTicketAssignInfo(
    { ticketId: ticketId ?? "", memberId: memberId ?? "" },
    { query: { enabled: !!ticketId && !!memberId && type === "assign" } }
  );
  const refundInfo = refundInfoData?.result;
  const assignInfo = assignInfoData?.result;

  const renderTitleText = () => {
    let titleText = "";
    if (type === "refund") {
      titleText = `환불 진행을 위해
       내역을 확인해주세요`;
    }

    return titleText;
  };

  const renderButtonText = () => {
    let buttonText = "";

    if (type === "refund") {
      buttonText = "환불 신청";
    }

    return buttonText;
  };

  const traineeNameMap = {
    refund: refundInfo?.memberName,
    assign: assignInfo?.memberName,
  };

  const ticketNameMap = {
    refund: refundInfo?.ticketName,
    assign: assignInfo?.ticketName,
  };

  const ticketTotalCntMap = {
    refund: refundInfo?.ticketTotalCnt,
    assign: assignInfo?.totalCnt,
  };

  const ticketRemainCntMap = {
    refund: refundInfo?.ticketRemainingCnt,
    assign: assignInfo?.remainingCnt,
  };

  const ticketPeriodMap = {
    refund: `${dayjs(refundInfo?.ticketStartDate).format("YYYY.MM.DD")} ~ ${dayjs(refundInfo?.ticketEndDate).format("YYYY.MM.DD")}`,
    assign: `${dayjs(assignInfo?.ticketStartDate).format("YYYY.MM.DD")} ~ ${dayjs(assignInfo?.ticketEndDate).format("YYYY.MM.DD")}`,
  };

  const handleClickButton = () => {
    if (type === "refund") {
      openModal({
        component: ConfirmRefundModal,
        props: {
          memberName: refundInfo?.memberName,
          ticketId: ticketId ?? "",
        },
      });
    }
  };

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <p className={styles.title}>{renderTitleText()}</p>
        <div className={styles.content_section}>
          <p className={styles.trainee_name}>
            {traineeNameMap[type as keyof typeof traineeNameMap]} 회원님
          </p>

          <div className={styles.ticket_info_section}>
            <div className={styles.ticket_info_top_section}>
              <p className={styles.ticket_name}>
                {ticketNameMap[type as keyof typeof ticketNameMap]}
              </p>
              <p className={styles.ticket_period}>
                {ticketPeriodMap[type as keyof typeof ticketPeriodMap]}
              </p>
            </div>
            <TicketInfoBottomSection
              ticketTotalCnt={Number(
                ticketTotalCntMap[type as keyof typeof ticketTotalCntMap]
              )}
              ticketRemainCnt={Number(
                ticketRemainCntMap[type as keyof typeof ticketRemainCntMap]
              )}
              refundInfo={type === "refund" && refundInfo ? refundInfo : null}
              assignInfo={type === "assign" && assignInfo ? assignInfo : null}
            />
          </div>
        </div>

        <Button
          backgroundColor="primary_1"
          fullWidth
          onClick={handleClickButton}
        >
          {renderButtonText()}
        </Button>
      </div>
    </PaddingContainer>
  );
}
