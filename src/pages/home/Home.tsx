import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Image from "@/components/image/Image";

import styles from "./Home.module.scss";
import BackgroundContainer from "@/layout/containers/background-container/BackgroundContainer";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import {
  chevronRight,
  dumbbell,
  main_calendar,
  main_registration,
  main_search,
  main_sign,
} from "@/assets/assets";
import Training from "@/components/training/Training";
import { MotionDiv } from "@/components/animation/Motion";

function Home() {
  const navigate = useNavigate();

  return (
    <BackgroundContainer>
      <PaddingContainer>
        <MotionDiv className={styles.container}>
          <MotionDiv
            className={styles.dumbbell_container}
            transition={{ duration: 0.4, delay: 0.6 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Image
              src={dumbbell}
              width={13.3}
              height={19}
              className={styles.dumbbell}
            />
          </MotionDiv>

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

          <MotionDiv
            className={styles.calendar_container}
            transition={{ duration: 0.4, delay: 0.6 }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className={styles.calendar_title}>
              12월 4주차 <Image src={chevronRight} width={2} height={2} />
            </div>
            <div className={styles.calendar}></div>
          </MotionDiv>

          <MotionDiv
            className={styles.menu_container}
            transition={{ duration: 0.4, delay: 0.6 }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className={styles.my_class}>
              <div className={styles.menu_title}>
                나의 수업
                <Image src={chevronRight} width={2} height={2} />
              </div>
              <div className={styles.menu_desc}>
                나의 수업을 등록해 <br />
                쉽게 관리해요!
              </div>
              <Image src={main_calendar} width={3.5} height={4} />
            </div>

            <div>
              <div className={styles.registration}>
                <Image src={main_registration} width={3.5} height={3.2} />
                <div className={styles.menu_title}>
                  회원 등록
                  <Image src={chevronRight} width={2} height={2} />
                </div>
              </div>

              <div className={styles.sign}>
                <Image src={main_sign} width={4} height={4} />
                <div className={styles.menu_title}>
                  서명 요청
                  <Image src={chevronRight} width={2} height={2} />
                </div>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            className={styles.search}
            transition={{ duration: 0.4, delay: 0.6 }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Image src={main_search} width={4.3} height={4.3} />
            <div className={styles.search_content}>
              <div className={styles.search_title}>회원정보</div>

              <div className={styles.search_desc}>
                내 회원 정보를 확인해보세요!
              </div>
            </div>

            <Image
              src={chevronRight}
              width={2}
              height={2}
              className={styles.search_icon}
            />
          </MotionDiv>
        </MotionDiv>
      </PaddingContainer>
    </BackgroundContainer>
  );
}

export default Home;
