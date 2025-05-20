import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./Trainee.module.scss";
import Input from "@/components/input/Input";
import { useGetUserMembers } from "@/api/generated/유저/유저";
import { useSearch } from "@/hooks/useSearch";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Skeleton from "@/components/skeleton/Skeleton";
import { openModal } from "@/utils/modal";
import TraineeTicketModal from "./components/trainee-ticket-modal/TraineeTicketModal";
import TraineeItem from "./components/trainee-item/TraineeItem";
import Button from "@/components/button/Button";
import AssignDuplicateTraineeBottomSheet from "./components/assign-duplicate-trainee-bottom-sheet/AssignDuplicateTraineeBottomSheet";
import { openBottomSheet } from "@/utils/bottomSheet";
import PATH from "@/router/path";

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
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const isSelectType = type?.includes("select");
  const [selectedTraineeId, setSelectedTraineeId] = useState<
    string | undefined
  >("");
  const memberId = searchParams.get("member-id");
  const ticketId = searchParams.get("ticket-id");
  const navigate = useNavigate();

  const handleClickTrainee = ({
    memberId,
    memberName,
    hasReservedClass,
  }: {
    memberId: string | undefined;
    memberName: string | undefined;
    hasReservedClass: boolean | undefined;
  }) => {
    if (!isSelectType) {
      openModal({
        component: TraineeTicketModal,
        props: {
          memberId,
          memberName,
          hasReservedClass,
        },
      });
    } else {
      setSelectedTraineeId(memberId);
    }
  };

  const handleClickNextButton = () => {
    if (type === "select-member-assign") {
      if (memberId === selectedTraineeId) {
        openBottomSheet({
          component: AssignDuplicateTraineeBottomSheet,
        });
      } else {
        navigate({
          pathname: PATH.CONFIRM_INFO,
          search: `?type=assign&member-id=${selectedTraineeId}&assignee-member-name=${
            trainees?.find((trainee) => trainee.memberId === selectedTraineeId)
              ?.memberName
          }&ticket-id=${ticketId}`,
        });
      }
    }
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
                <TraineeItem
                  key={trainee.memberId}
                  trainee={trainee}
                  isSelectType={Boolean(isSelectType)}
                  selectedTraineeId={selectedTraineeId}
                  handleClickTrainee={() => {
                    handleClickTrainee({
                      memberId: trainee.memberId,
                      memberName: trainee.memberName,
                      hasReservedClass: trainee.reservation,
                    });
                  }}
                />
              ))}
        </div>

        {isSelectType && (
          <Button
            onClick={handleClickNextButton}
            backgroundColor="primary_1"
            fullWidth
          >
            다음
          </Button>
        )}
      </div>
    </PaddingContainer>
  );
}
