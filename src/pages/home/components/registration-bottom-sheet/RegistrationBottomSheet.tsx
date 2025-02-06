import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./RegistrationBottomSheet.module.scss";
import Image from "@/components/image/Image";
import { register_center, register_user } from "@/assets/assets";
import PATH from "@/router/path";

export default function RegistrationBottomSheet() {
  const navigate = useNavigate();
  return (
    <BottomSheet>
      <div className={styles.container}>
        <div className={styles.title}>
          <div>무엇을 등록하시나요?</div>
        </div>

        <div className={styles.content}>
          <div
            className={styles.content_item}
            onClick={() => navigate(PATH.REGISTER_TRAINEE)}
          >
            <Image width={2.3} height={2.3} src={register_user} alt="user" />
            <div className={styles.content_item_title}>회원 등록</div>
          </div>

          <div
            className={styles.content_item}
            onClick={() => navigate(PATH.FIND_CENTERS)}
          >
            <Image
              width={2.3}
              height={2.3}
              src={register_center}
              alt="center"
            />
            <div className={styles.content_item_title}>센터 등록</div>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
