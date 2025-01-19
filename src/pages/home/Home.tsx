import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Image from "@/components/image/Image";

import styles from "./Home.module.scss";
import BackgroundContainer from "@/layout/containers/background-container/BackgroundContainer";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import { dumbbell } from "@/assets/assets";
import Training from "@/components/training/Training";
import { MotionDiv } from "@/components/animation/Motion";

function Home() {
  const navigate = useNavigate();

  return (
    <BackgroundContainer>
      <PaddingContainer>
        <MotionDiv className={styles.container}>
          <Image
            src={dumbbell}
            width={13.3}
            height={19}
            className={styles.dumbbell}
          />
          <MotionDiv
            className={styles.class_info}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={styles.day}>12월 22일</div>
            <div className={styles.guide}>
              {true ? (
                <>
                  <span>등록된 수업</span>이 없어요!
                </>
              ) : (
                <>
                  <span>4번째 </span>&nbsp; 수업이에요!
                </>
              )}
            </div>

            <Training />
          </MotionDiv>
        </MotionDiv>
      </PaddingContainer>
    </BackgroundContainer>
  );
}

export default Home;
