import styles from "./AssignmentDetailInfo.module.scss";
import TicketDetailContainer from "../ticket-detail-container/TicketDetailContainer";
import TicketDetailContent from "../ticket-detail-container/ticket-detail-content/TicketDetailContent";
import { AssignInfo } from "@/api/generated/models";
import dayjs from "dayjs";

interface AssignmentDetailInfoProps {
  assignmentInfo: AssignInfo | undefined;
  isLoading: boolean;
}

export default function AssignmentDetailInfo({
  assignmentInfo,
  isLoading,
}: AssignmentDetailInfoProps) {
  if (assignmentInfo === null) return;

  return (
    <div className={styles.container}>
      <TicketDetailContainer isLoading={isLoading} type="assignment-info">
        <TicketDetailContent
          title="센터명"
          contentType="text"
          content={assignmentInfo?.assignCenterName}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="트레이너"
          contentType="text"
          content={assignmentInfo?.assignTrainerName}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="양도일자"
          contentType="text"
          content={dayjs(assignmentInfo?.assignDate).format("YYYY.MM.DD")}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="양도횟수"
          contentType="text"
          content={`${assignmentInfo?.assignCnt}회`}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="양도자"
          contentType="text"
          content={assignmentInfo?.assignMemberName}
          isLoading={isLoading}
        />
      </TicketDetailContainer>
    </div>
  );
}
