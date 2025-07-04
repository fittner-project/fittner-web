import Button from "@/components/button/Button";
import styles from "./PauseTicket.module.scss";
import { closeBottomSheet, openBottomSheet } from "@/utils/bottomSheet";
import { useForm } from "react-hook-form";
import { openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import { usePostUserTicketSuspendAllow } from "@/api/generated/이용권/이용권";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import Picker from "react-mobile-picker";
import classNames from "classnames";
import dayjs from "dayjs";
import { createDatePickerDates } from "@/utils/datePicker";
import ConfirmPauseTicketBottomSheet from "./components/ConfirmPauseTicketBottomSheet";

export default function PauseTicket() {
  const { ticketId } = useParams();

  const dateOptions = useMemo(() => createDatePickerDates(), []);

  const today = dayjs();
  const [startPickerValue, setStartPickerValue] = useState({
    year: today.format("YYYY"),
    month: today.format("MM"),
    day: today.format("DD"),
  });

  const [endPickerValue, setEndPickerValue] = useState({
    year: today.format("YYYY"),
    month: today.format("MM"),
    day: today.format("DD"),
  });

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const navigate = useNavigate();

  const { register, watch, handleSubmit } = useForm<{ suspendReason: string }>({
    mode: "onChange",
  });
  const { mutate: pauseTicket } = usePostUserTicketSuspendAllow({
    mutation: {
      onSuccess: () => {
        openModal({
          component: SuccessModal,
          props: {
            successMessage: "이용 정지 신청이 \n 완료 되었습니다",
            onCloseComplete: () => {
              navigate(-1);
            },
          },
        });
      },
    },
  });
  const suspendReason = watch("suspendReason");

  const handlePauseTicket = () => {
    if (suspendReason) {
      pauseTicket({
        data: {
          ticketId: ticketId,
          suspendReason: suspendReason,
          ticketSuspendStartDate: `${startPickerValue.year}-${startPickerValue.month}-${startPickerValue.day}`,
          ticketSuspendEndDate: `${endPickerValue.year}-${endPickerValue.month}-${endPickerValue.day}`,
        },
      });
    }
  };

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <div className={styles.content_container}>
          <div className={styles.field}>
            <div className={styles.period_title}>
              <p>정지 시작 일자</p>
              <p>정지 종료 일자</p>
            </div>
            <div className={styles.period}>
              <div
                className={classNames(styles.date_selector, {
                  [styles.active]: showStartPicker,
                })}
                onClick={() => {
                  setShowStartPicker(true);
                  setShowEndPicker(false);
                }}
              >
                {`${startPickerValue.year}.${startPickerValue.month}.${startPickerValue.day}`}
              </div>
              <div className={styles.date_separator}>-</div>
              <div
                className={classNames(styles.date_selector, {
                  [styles.active]: showEndPicker,
                })}
                onClick={() => {
                  setShowStartPicker(false);
                  setShowEndPicker(true);
                }}
              >
                {`${endPickerValue.year}.${endPickerValue.month}.${endPickerValue.day}`}
              </div>
            </div>

            {showStartPicker && (
              <div className={styles.picker_container}>
                <Picker
                  value={startPickerValue}
                  onChange={setStartPickerValue}
                  height={120}
                  itemHeight={40}
                  className={styles.picker}
                >
                  <Picker.Column name="year" className={styles.picker_column}>
                    {dateOptions.years.map((year) => (
                      <Picker.Item
                        key={year}
                        value={year}
                        className={styles.picker_item}
                      >
                        {({ selected }) => (
                          <div
                            className={classNames(styles.year, {
                              [styles.selected]: selected,
                            })}
                          >
                            {year}년
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>
                  <Picker.Column name="month" className={styles.picker_column}>
                    {dateOptions.months.map((month) => (
                      <Picker.Item
                        key={month}
                        value={month}
                        className={styles.picker_item}
                      >
                        {({ selected }) => (
                          <div className={selected ? styles.selected : ""}>
                            {month}월
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>
                  <Picker.Column name="day" className={styles.picker_column}>
                    {dateOptions.days.map((day) => (
                      <Picker.Item
                        key={day}
                        value={day}
                        className={styles.picker_item}
                      >
                        {({ selected }) => (
                          <div
                            className={classNames(styles.day, {
                              [styles.selected]: selected,
                            })}
                          >
                            {day}일
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>
                </Picker>
              </div>
            )}

            {showEndPicker && (
              <div className={styles.picker_container}>
                <Picker
                  value={endPickerValue}
                  onChange={setEndPickerValue}
                  height={120}
                  itemHeight={40}
                  className={styles.picker}
                >
                  <Picker.Column name="year" className={styles.picker_column}>
                    {dateOptions.years.map((year) => (
                      <Picker.Item
                        key={year}
                        value={year}
                        className={styles.picker_item}
                      >
                        {({ selected }) => (
                          <div
                            className={classNames(styles.year, {
                              [styles.selected]: selected,
                            })}
                          >
                            {year}년
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>
                  <Picker.Column name="month" className={styles.picker_column}>
                    {dateOptions.months.map((month) => (
                      <Picker.Item
                        key={month}
                        value={month}
                        className={styles.picker_item}
                      >
                        {({ selected }) => (
                          <div className={selected ? styles.selected : ""}>
                            {month}월
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>
                  <Picker.Column name="day" className={styles.picker_column}>
                    {dateOptions.days.map((day) => (
                      <Picker.Item
                        key={day}
                        value={day}
                        className={styles.picker_item}
                      >
                        {({ selected }) => (
                          <div
                            className={classNames(styles.day, {
                              [styles.selected]: selected,
                            })}
                          >
                            {day}일
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>
                </Picker>
              </div>
            )}
          </div>
          <textarea
            placeholder="정지 사유를 입력해주세요."
            {...register("suspendReason")}
          />
        </div>

        <Button
          fullWidth
          disabled={!suspendReason}
          backgroundColor="primary_1"
          onClick={() => {
            openBottomSheet({
              component: ConfirmPauseTicketBottomSheet,
              props: {
                onSubmit: handleSubmit(handlePauseTicket),
              },
            });
          }}
        >
          정지하기
        </Button>
      </div>
    </PaddingContainer>
  );
}
