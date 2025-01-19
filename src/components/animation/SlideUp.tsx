import { ReactNode, useEffect, useState } from "react";

import styles from "./animation.module.scss";
import { BaseMotionProps, MotionDiv } from "./Motion";

const spring = {
  duration: 1,
  ease: "easeOut",
};

const variants = {
  initial: {
    y: 150,
    opacity: 0.5,
  },
  open: {
    y: 0,
    opacity: 1,
    //backgroundColor: "red",
  },
};

export type SlideUpProps = {
  slideUp?: BaseMotionProps & { offsetY?: number; intialOpacity?: number };
};
const withSlideUp = <T extends {}, P extends SlideUpProps>(
  WrappedComponent: React.ComponentType<T> // functional or class component 모두 될 수 있다.
): React.FC<T & P> => {
  const SlideUpComponent = (props: T & P) => {
    const initialOpacity = props.slideUp?.intialOpacity ?? 0.5;
    return (
      <MotionDiv
        className={styles.slide_wrapper}
        enabled={props.slideUp?.enabled}
        transition={{
          // ...spring,
          duration: props.slideUp?.duration ?? 1,
          delay: (props.slideUp?.order ?? 0) * (props.slideUp?.delay ?? 0),
          // type: "spring",
          // damping: 20,
          // mass: 1,
          // stiffness: 80,
        }}
        initial={{
          ...variants.initial,
          y: props.slideUp?.offsetY ?? 100,
          opacity: initialOpacity,
        }}
        //animate={variants.open}
        animate={variants.open}
        viewport={{
          once: true,
        }}
      >
        <WrappedComponent {...props} />
      </MotionDiv>
    );
  };
  return SlideUpComponent;
};

export const SlideUp = ({
  children,
  slideUp,
  enabled,
}: { children: ReactNode; enabled?: boolean } & SlideUpProps) => {
  const initialOpacity = slideUp?.intialOpacity ?? 0.5;
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return; // 애니메이션 중에만 실행

    const preventDefault = (e: TouchEvent) => {
      if (isAnimating) e.preventDefault();
    };

    document.body.addEventListener("touchmove", preventDefault, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener("touchmove", preventDefault);
    };
  }, [isAnimating, slideUp?.duration]);

  return (
    <MotionDiv
      enabled={enabled}
      className={styles.slide_wrapper}
      transition={{
        ...spring,
        duration: slideUp?.duration ?? 1,
        delay: (slideUp?.order ?? 1) * (slideUp?.delay ?? 0),
        ease: "circOut",
      }}
      initial={{
        ...variants.initial,
        y: slideUp?.offsetY ?? 100,
        opacity: initialOpacity,
      }}
      animate={variants.open}
      viewport={{
        once: true,
      }}
      onAnimationComplete={() => setIsAnimating(false)}
    >
      {children}
    </MotionDiv>
  );
};

export default withSlideUp;
