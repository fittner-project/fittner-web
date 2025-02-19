import { MemberInfo } from "@/api/generated/models";
import TicketDetailContent from "../ticket-detail-container/ticket-detail-content/TicketDetailContent";
import TicketDetailContainer from "../ticket-detail-container/TicketDetailContainer";
import styles from "./TraineeDetailInfo.module.scss";

interface TraineeDetailInfoProps {
  traineeInfo: MemberInfo | undefined;
  isLoading: boolean;
}

export default function TraineeDetailInfo({
  traineeInfo,
  isLoading,
}: TraineeDetailInfoProps) {
  return (
    <div className={styles.container}>
      <TicketDetailContainer isLoading={isLoading} type="trainee-info">
        <TicketDetailContent
          title="이름"
          contentType="text"
          content={traineeInfo?.memberName}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="연락처"
          contentType="text"
          content={traineeInfo?.memberPhone}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="성별"
          contentType="text"
          content={traineeInfo?.memberGender}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="생년월일"
          contentType="text"
          content={traineeInfo?.memberBirth}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="주소"
          contentType="text"
          content={traineeInfo?.memberAddress}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="메모"
          contentType="text"
          content={traineeInfo?.memberMemo}
          isLoading={isLoading}
        />
        <TicketDetailContent
          title="가입경로"
          contentType="text"
          content={traineeInfo?.memberJoinPath}
          isLoading={isLoading}
        />
      </TicketDetailContainer>
    </div>
  );
}
