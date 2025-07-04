import { TrainerResultDto } from "@/api/generated/models";
import styles from "./TrainerItem.module.scss";
import classNames from "classnames";
import Image from "@/components/image/Image";
import { chevronRightGrey, userProfile } from "@/assets/assets";
import Flex from "@/components/flex/Flex";
import { uniqueId } from "lodash";

interface TrainerItemProps {
  trainer: TrainerResultDto;
  isSelectType: boolean;
  selectedTrainerId: string | undefined;
  handleClickTrainee: () => void;
}

export default function TrainerItem({
  trainer,
  isSelectType,
  selectedTrainerId,
  handleClickTrainee,
}: TrainerItemProps) {
  return (
    <div
      key={uniqueId()}
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
              [styles.selected]: selectedTrainerId === trainer.trainerName,
            })}
          >
            {selectedTrainerId === trainer.trainerName && (
              <div className={styles.select_circle_check} />
            )}
          </Flex>
        )}
        <div
          className={classNames(styles.trainee_profile, {
            // [styles.male]: trainee.memberGender === "M",
            // [styles.female]: trainee.memberGender === "F",
          })}
        >
          <Image src={userProfile} alt="프로필 이미지" width={3} height={3} />
        </div>
        <div className={styles.trainee_info}>
          <p className={styles.trainee_name}>{trainer.trainerName}</p>
          <div className={styles.trainee_info_detail}>
            {/* <p>{trainee.memberPhone}</p>
            <p>만 {trainee.memberAge}세</p> */}
          </div>
        </div>
      </section>

      <Image src={chevronRightGrey} alt="" width={2.8} height={2.8} />
    </div>
  );
}
