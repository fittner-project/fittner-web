import { ReactNode } from "react";

import styles from "./animation.module.scss";
import { BaseMotionProps, MotionDiv } from "./Motion";

const spring = {
  duration: 1,
  ease: "easeOut",
};

const variants = {
  initial: {
    x: 150,
    opacity: 0.5,
  },
  open: {
    x: 0,
    opacity: 1,
    //backgroundColor: "red",
  },
};

export type SlideHorizontalProps = {
  slide?: BaseMotionProps & { offsetX?: number; intialOpacity?: number };
};
const withSlideHorizontal = <T extends {}, P extends SlideHorizontalProps>(
  WrappedComponent: React.ComponentType<T> // functional or class component 모두 될 수 있다.
): React.FC<T & P> => {
  const SlideUpComponent = (props: T & P) => {
    const initialOpacity = props.slide?.intialOpacity ?? 0.5;
    return (
      <MotionDiv
        className={styles.slide_wrapper}
        enabled={props.slide?.enabled}
        transition={{
          // ...spring,
          duration: props.slide?.duration ?? 1,
          delay: (props.slide?.order ?? 0) * (props.slide?.delay ?? 0),
          type: "spring",
          damping: 20,
          mass: 1,
          stiffness: 80,
        }}
        initial={{
          ...variants.initial,
          x: props.slide?.offsetX ?? 100,
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

export const SlideHorizontal = ({
  children,
  slide,
  enabled,
}: { children: ReactNode; enabled?: boolean } & SlideHorizontalProps) => {
  const initialOpacity = slide?.intialOpacity ?? 0.5;
  return (
    <MotionDiv
      enabled={enabled}
      className={styles.slide_wrapper}
      transition={{
        ...spring,
        duration: slide?.duration ?? 1,
        delay: (slide?.order ?? 1) * (slide?.delay ?? 0),
        ease: "circOut",
        // type: "spring",
        // damping: 10,
        // bounce: 0,
        // mass: 1,
        // stiffness: 80,
      }}
      initial={{
        ...variants.initial,
        x: slide?.offsetX ?? 100,
        opacity: initialOpacity,
      }}
      //animate={variants.open}
      animate={variants.open}
      viewport={{
        once: true,
      }}
    >
      {children}
    </MotionDiv>
  );
};

export default withSlideHorizontal;
