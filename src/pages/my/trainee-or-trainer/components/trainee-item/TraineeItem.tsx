import { MemberListResDto } from "@/api/generated/models";
import styles from "./TraineeItem.module.scss";
import classNames from "classnames";
import Image from "@/components/image/Image";
import {
  chevronRightGrey,
  userFemale,
  userMale,
  userProfile,
} from "@/assets/assets";
import Flex from "@/components/flex/Flex";

interface TraineeItemProps {
  trainee: MemberListResDto;
  isSelectType: boolean;
  selectedTraineeId: string | undefined;
  handleClickTrainee: () => void;
}

export default function TraineeItem({
  trainee,
  isSelectType,
  selectedTraineeId,
  handleClickTrainee,
}: TraineeItemProps) {
  return (
    <div
      key={trainee.memberId}
      className={styles.container}
      onClick={() => {
        handleClickTrainee();
      }}
    >
      <section className={styles.left_section}>
        {isSelectType && (
          <Flex
            justifyContent="center"
            alignItems="center"
            className={classNames(styles.select_circle, {
              [styles.selected]: selectedTraineeId === trainee.memberId,
            })}
          >
            {selectedTraineeId === trainee.memberId && (
              <div className={styles.select_circle_check} />
            )}
          </Flex>
        )}
        <div
          className={classNames(styles.trainee_profile, {
            [styles.male]: trainee.memberGender === "M",
            [styles.female]: trainee.memberGender === "F",
          })}
        >
          <Image
            src={
              trainee.memberGender === "M"
                ? userMale
                : trainee.memberGender === "F"
                  ? userFemale
                  : userProfile
            }
            alt="프로필 이미지"
            width={3}
            height={3}
          />
        </div>
        <div className={styles.trainee_info}>
          <p className={styles.trainee_name}>{trainee.memberName}</p>
          <p className={styles.trainee_memo}>
            {trainee.memberMemo ? trainee.memberMemo : "메모 없음"}
          </p>
        </div>
      </section>

      <Image src={chevronRightGrey} alt="" width={2.8} height={2.8} />
    </div>
  );
}
