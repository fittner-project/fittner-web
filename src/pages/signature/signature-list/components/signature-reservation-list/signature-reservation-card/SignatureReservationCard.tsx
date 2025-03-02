import { SignResrvationDto } from "@/api/generated/models";
import styles from "./SignatureReservationCard.module.scss";
import Image from "@/components/image/Image";
import { checkNor, checkSel } from "@/assets/assets";
import PATH from "@/router/path";

interface SignatureReservationCardProps {
  signatureReservation: SignResrvationDto;
}

export default function SignatureReservationCard({
  signatureReservation,
}: SignatureReservationCardProps) {
  const formatTime = (time: string) => `${time.slice(0, 2)}:${time.slice(2)}`;

  return (
    <Link
      to={`${PATH.SIGNATURE.LIST}/${signatureReservation.ticketId}`}
      className={styles.container}
    >
      <div className={styles.color_bar} />
      <div className={styles.content}>
        <div className={styles.top_section}>
          <div className={styles.left_section}>
            <section className={styles.trainee_info}>
              <div className={styles.trainee_info_top}>
                <p className={styles.trainee}>
                  <span className={styles.trainee_name}>
                    {signatureReservation.memberName}
                  </span>{" "}
                  회원님
                </p>
                <div className={styles.trainee_count}>
                  {signatureReservation.reservationUseCnt}회차
                </div>
              </div>
              <p className={styles.time}>
                {formatTime(signatureReservation.reservationStartTime ?? "")} -{" "}
                {formatTime(signatureReservation.reservationEndTime ?? "")}
              </p>
            </section>
          </div>

          <div className={styles.right_section}>
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
        </div>

        {signatureReservation.reservationMemo && (
          <div className={styles.bottom_section}>
            {signatureReservation.reservationMemo}
          </div>
        )}
      </div>
    </Link>
  );
}
