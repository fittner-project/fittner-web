import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./ConfirmInfo.module.scss";
import Button from "@/components/button/Button";
import TicketInfoBottomSection from "./components/ticket_info_bottom_section/TicketInfoBottomSection";
import {
  useGetUserTicketAssignInfo,
  useGetUserTicketRefundInfo,
  usePostUserTicketAssignOldMember,
} from "@/api/generated/이용권/이용권";
import dayjs from "dayjs";
import { openModal } from "@/utils/modal";
import ConfirmRefundModal from "./components/confirm-refund-modal/ConfirmRefundModal";
import Skeleton from "@/components/skeleton/Skeleton";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";

export default function ConfirmInfo() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type");
  const ticketId = searchParams.get("ticket-id");
  const memberId = searchParams.get("member-id");
  const assigneeMemberName = searchParams.get("assignee-member-name");
  const { data: refundInfoData, isLoading: isRefundInfoLoading } =
    useGetUserTicketRefundInfo(
      { ticketId: ticketId ?? "" },
      { query: { enabled: !!ticketId && type === "refund" } }
    );
  const { data: assignInfoData, isLoading: isAssignInfoLoading } =
    useGetUserTicketAssignInfo(
      { ticketId: ticketId ?? "", memberId: memberId ?? "" },
      { query: { enabled: !!ticketId && !!memberId && type === "assign" } }
    );

  const { mutate: assignOldMember } = usePostUserTicketAssignOldMember({
    mutation: {
      onSuccess: () => {
        openModal({
          component: SuccessModal,
          props: {
            onCloseComplete: () => {
              navigate(-2);
            },
            successMessage: "기존 회원 양도가 \n 완료 되었습니다",
          },
        });
      },
    },
  });

  const refundInfo = refundInfoData?.result;
  const assignInfo = assignInfoData?.result;
  const isLoading = isRefundInfoLoading || isAssignInfoLoading;

  const renderTitleText = () => {
    let titleText = "";
    if (type === "refund") {
      titleText = `환불 진행을 위해
       내역을 확인해주세요`;
    }

    if (type === "assign") {
      titleText = `기존 회원 양도 신청을 위해
       내역을 확인해주세요`;
    }

    return titleText;
  };

  const renderButtonText = () => {
    let buttonText = "";

    if (type === "refund") {
      buttonText = "환불 신청";
    }

    if (type === "assign") {
      buttonText = "양도 신청";
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

    if (type === "assign") {
      assignOldMember({
        data: { memberId: memberId ?? "", originalTicketId: ticketId ?? "" },
      });
    }
  };

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <p className={styles.title}>{renderTitleText()}</p>
        <div className={styles.content_section}>
          {isLoading ? (
            <Skeleton
              backgroundColor="skeleton_2"
              height={3.6}
              width={15}
              borderRadius={1}
            />
          ) : (
            <p className={styles.trainee_name}>
              {traineeNameMap[type as keyof typeof traineeNameMap]} 회원님
            </p>
          )}

          <div className={styles.ticket_info_section}>
            <div className={styles.ticket_info_top_section}>
              {isLoading ? (
                <Skeleton
                  backgroundColor="skeleton_2"
                  height={2.2}
                  width={18}
                  borderRadius={1}
                />
              ) : (
                <p className={styles.ticket_name}>
                  {ticketNameMap[type as keyof typeof ticketNameMap]}
                </p>
              )}
              {isLoading ? (
                <Skeleton
                  backgroundColor="skeleton_2"
                  height={2.2}
                  width={19}
                  borderRadius={1}
                  style={{ marginTop: "0.9rem" }}
                />
              ) : (
                <p className={styles.ticket_period}>
                  {ticketPeriodMap[type as keyof typeof ticketPeriodMap]}
                </p>
              )}
            </div>
            <TicketInfoBottomSection
              type={type as "refund" | "assign"}
              isLoading={isLoading}
              ticketTotalCnt={Number(
                ticketTotalCntMap[type as keyof typeof ticketTotalCntMap]
              )}
              ticketRemainCnt={Number(
                ticketRemainCntMap[type as keyof typeof ticketRemainCntMap]
              )}
              refundInfo={refundInfo}
              assignInfo={assignInfo}
              assigneeMemberName={assigneeMemberName ?? ""}
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
