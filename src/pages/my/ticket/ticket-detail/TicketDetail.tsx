import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./TicketDetail.module.scss";
import TraineeDetailInfo from "./components/trainee-detail-info/TraineeDetailInfo";
import { useGetUserTicketTicketId } from "@/api/generated/이용권/이용권";
import TicketDetailInfo from "./components/ticket-detail-info/TicketDetailInfo";
import RefundDetailInfo from "./components/refund-detail-info/RefundDetailInfo";
import AssignmentDetailInfo from "./components/assignment-detail-info/AssignmentDetailInfo";

export default function TicketDetail() {
  const { ticketId } = useParams();
  const { data: ticketData, isLoading } = useGetUserTicketTicketId(
    ticketId as string,
    {
      query: { enabled: !!ticketId },
    }
  );

  const ticket = ticketData?.result;
  const traineeInfo = ticket?.memberInfo;
  const ticketInfo = ticket?.ticketInfo;
  const refundInfo = ticket?.refundInfo;
  const assignmentInfo = ticket?.assignInfo;

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <TraineeDetailInfo traineeInfo={traineeInfo} isLoading={isLoading} />
        <TicketDetailInfo ticketInfo={ticketInfo} isLoading={isLoading} />
        <RefundDetailInfo refundInfo={refundInfo} isLoading={isLoading} />
        <AssignmentDetailInfo
          assignmentInfo={assignmentInfo}
          isLoading={isLoading}
        />
      </div>
    </PaddingContainer>
  );
}
