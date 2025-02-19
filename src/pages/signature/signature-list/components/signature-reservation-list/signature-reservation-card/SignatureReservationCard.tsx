import { SignResrvationDto } from "@/api/generated/models";
import styles from "./SignatureReservationCard.module.scss";
import Image from "@/components/image/Image";
import { checkNor, checkSel } from "@/assets/assets";

interface SignatureReservationCardProps {
  signatureReservation: SignResrvationDto;
}

export default function SignatureReservationCard({
  signatureReservation,
}: SignatureReservationCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.color_bar} />
      <div className={styles.content}>
        <div className={styles.top_section}>
          <div className={styles.left_section}>
            <section className={styles.trainee_info}>
              <div className={styles.trainee_info_top}>
                <p className={styles.trainee}>
                  <span className={styles.trainee_name}>김영재</span> 회원님
                </p>
                <div className={styles.trainee_count}>3회차</div>
              </div>
              <p className={styles.time}>오전 11:30 - 오후 1:00</p>
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

        <div className={styles.bottom_section}>
          어깨 부상으로 인해 하체운동 위주로 진행
        </div>
      </div>
    </div>
  );
}
