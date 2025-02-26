import styles from "./SignatureDetailItem.module.scss";
import classNames from "classnames";

import dayjs from "dayjs";
import Image from "@/components/image/Image";
import { SignResrvationForMemberResDto } from "@/api/generated/models";
import { checkNor, checkSel } from "@/assets/assets";

interface SignatureDetailItemProps {
  signatureReservation: SignResrvationForMemberResDto;
}

function SignatureDetailItem({
  signatureReservation,
}: SignatureDetailItemProps) {
  return (
    <div
      className={classNames(styles.container, {
        [styles.waiting]: signatureReservation.reservationStatus === "WAITING",
      })}
    >
      <div className={styles.left_section}>
        <div>
          {signatureReservation.reservationStatus === "NOSHOW" && (
            <p className={styles.noshow}>노쇼</p>
          )}
          {signatureReservation.reservationStatus === "SIGN" && (
            <Image src={checkSel} alt="checkSel" width={2.5} height={2.5} />
          )}
          {signatureReservation.reservationStatus === "WAITING" && (
            <Image src={checkNor} alt="checkNor" width={2.5} height={2.5} />
          )}
        </div>
        <p className={styles.time}>
          {dayjs(signatureReservation.reservationStartDate).format("MM월 DD일")}{" "}
          {`${signatureReservation.reservationStartTime?.slice(0, 2)}:${signatureReservation.reservationStartTime?.slice(2)}`}
          -
          {`${signatureReservation.reservationEndTime?.slice(0, 2)}:${signatureReservation.reservationEndTime?.slice(2)}`}
        </p>
      </div>
      <p className={styles.count}>
        {signatureReservation.reservationUseCnt}회차
      </p>
    </div>
  );
}

export default SignatureDetailItem;
