import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./Trainee.module.scss";
import Input from "@/components/input/Input";
import { useGetUserMembers } from "@/api/generated/유저/유저";
import Image from "@/components/image/Image";
import { chevronRightGrey, userProfile } from "@/assets/assets";
import { useSearch } from "@/hooks/useSearch";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Skeleton from "@/components/skeleton/Skeleton";
import { openModal } from "@/utils/modal";
import TraineeTicketModal from "./components/trainee-ticket-modal/TraineeTicketModal";

export default function Trainee() {
  const { data: traineeData, isLoading } = useGetUserMembers();
  const trainees = traineeData?.result;
  const { register, watch } = useForm();
  const { filteredData } = useSearch({
    searchValue: watch("searchValue"),
    data: trainees,
    searchFields: ["memberName", "memberPhone"],
  });
  const searchValue = watch("searchValue");

  const handleClickTrainee = ({
    memberId,
    memberName,
    hasReservedClass,
  }: {
    memberId: string;
    memberName: string;
    hasReservedClass: boolean | undefined;
  }) => {
    openModal({
      component: TraineeTicketModal,
      props: {
        memberId,
        memberName,
        hasReservedClass,
      },
    });
  };

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <Input
          inputType="default-search"
          placeholder="이름 또는 번호를 검색해주세요"
          style={{ height: "4.8rem" }}
          {...register("searchValue")}
        />
        {isLoading ? (
          <Skeleton
            width={10}
            height={2.2}
            borderRadius={1}
            style={{ marginTop: "2.6rem", marginBottom: "0.9rem" }}
          />
        ) : (
          <div className={styles.trainee_count}>
            {!searchValue && <p>전체</p>}
            <p>{filteredData?.length}명</p>
          </div>
        )}

        <div
          className={classNames(styles.scroll_container, {
            [styles.loading_finish]: !isLoading,
          })}
        >
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={index}
                  style={{
                    height: "9.5rem",
                    margin: "0 -1.8rem",
                    padding: "2rem 1.8rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.4rem",
                    }}
                  >
                    <Skeleton
                      width={5.3}
                      height={5.3}
                      borderRadius={1000}
                      backgroundColor="skeleton_2"
                    />
                    <div>
                      <Skeleton
                        width={10}
                        height={2.2}
                        borderRadius={1}
                        backgroundColor="skeleton_2"
                      />
                      <Skeleton
                        width={17}
                        height={2.2}
                        borderRadius={1}
                        backgroundColor="skeleton_2"
                        style={{ marginTop: "0.6rem" }}
                      />
                    </div>
                  </div>
                  <Skeleton
                    width={2.8}
                    height={2.8}
                    borderRadius={1}
                    backgroundColor="skeleton_2"
                  />
                </Skeleton>
              ))
            : filteredData?.map((trainee) => (
                <div
                  key={trainee.memberId}
                  className={styles.trainee_item}
                  onClick={() => {
                    if (trainee.memberId && trainee.memberName) {
                      handleClickTrainee({
                        memberId: trainee.memberId,
                        memberName: trainee.memberName,
                        hasReservedClass: trainee.reservation,
                      });
                    }
                  }}
                >
                  <section className={styles.left_section}>
                    <div
                      className={classNames(styles.trainee_profile, {
                        [styles.male]: trainee.memberGender === "M",
                        [styles.female]: trainee.memberGender === "F",
                      })}
                    >
                      <Image
                        src={userProfile}
                        alt="프로필 이미지"
                        width={3}
                        height={3}
                      />
                    </div>
                    <div className={styles.trainee_info}>
                      <p className={styles.trainee_name}>
                        {trainee.memberName}
                      </p>
                      <div className={styles.trainee_info_detail}>
                        <p>{trainee.memberPhone}</p>
                        <p>만 {trainee.memberAge}세</p>
                      </div>
                    </div>
                  </section>

                  <Image
                    src={chevronRightGrey}
                    alt=""
                    width={2.8}
                    height={2.8}
                  />
                </div>
              ))}
        </div>
      </div>
    </PaddingContainer>
  );
}
