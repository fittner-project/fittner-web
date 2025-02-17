import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./Trainee.module.scss";
import Input from "@/components/input/Input";
import { useGetUserMembers } from "@/api/generated/유저/유저";
import Image from "@/components/image/Image";
import { chevronRightGrey, userProfile } from "@/assets/assets";

export default function Trainee() {
  const { data: traineeData } = useGetUserMembers();
  const trainees = traineeData?.result;

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <Input
          inputType="default-search"
          placeholder="이름 또는 번호를 검색해주세요"
          style={{ height: "4.8rem" }}
        />

        <div className={styles.trainee_count}>
          <p>전체</p>
          <p>{trainees?.length}명</p>
        </div>

        <div className={styles.scroll_container}>
          {trainees?.map((trainee) => (
            <div key={trainee.memberId} className={styles.trainee_item}>
              <section className={styles.left_section}>
                <div className={styles.trainee_profile}>
                  <Image
                    src={userProfile}
                    alt="프로필 이미지"
                    width={3}
                    height={3}
                  />
                </div>
                <div className={styles.trainee_info}>
                  <p className={styles.trainee_name}>{trainee.memberName}</p>
                  <div className={styles.trainee_info_detail}>
                    <p>{trainee.memberPhone}</p>
                    <p>만 {trainee.memberAge}세</p>
                  </div>
                </div>
              </section>

              <Image src={chevronRightGrey} alt="" width={2.8} height={2.8} />
            </div>
          ))}
        </div>
      </div>
    </PaddingContainer>
  );
}
