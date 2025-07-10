import { TrainerResultDto } from "@/api/generated/models";
import styles from "./TrainerItem.module.scss";
import classNames from "classnames";
import Image from "@/components/image/Image";
import { chevronRightGrey, userProfile } from "@/assets/assets";
import Flex from "@/components/flex/Flex";
import { uniqueId } from "lodash";
import useAssignNewTraineeValueStore from "@/pages/assign-new-trainee/stores/assignNewTraineeValue";

interface TrainerItemProps {
  trainer: TrainerResultDto;
  isSelectType: boolean;
}

export default function TrainerItem({
  trainer,
  isSelectType,
}: TrainerItemProps) {
  const setSelectedTrainer = useAssignNewTraineeValueStore(
    (state) => state.setSelectedTrainer
  );
  const selectedTrainer = useAssignNewTraineeValueStore(
    (state) => state.selectedTrainer
  );

  return (
    <div
      key={uniqueId()}
      className={styles.container}
      onClick={() => {
        setSelectedTrainer(trainer);
      }}
    >
      <section className={styles.left_section}>
        {isSelectType && (
          <Flex
            justifyContent="center"
            alignItems="center"
            className={classNames(styles.select_circle, {
              [styles.selected]:
                selectedTrainer?.trainerId === trainer.trainerId,
            })}
          >
            {selectedTrainer?.trainerId === trainer.trainerId && (
              <div className={styles.select_circle_check} />
            )}
          </Flex>
        )}
        <div className={styles.trainer_profile}>
          <Image src={userProfile} alt="프로필 이미지" width={3} height={3} />
        </div>
        <div className={styles.trainer_info}>
          <p className={styles.trainer_name}>{trainer.trainerName}</p>
          <div className={styles.trainer_info_detail}>
            {/* <p>{trainer.memberPhone}</p>
            <p>만 {trainer.memberAge}세</p> */}
          </div>
        </div>
      </section>

      <Image src={chevronRightGrey} alt="" width={2.8} height={2.8} />
    </div>
  );
}
