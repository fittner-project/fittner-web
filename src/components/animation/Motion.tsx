/* eslint-disable react/display-name */
import { motion } from "framer-motion";
import { forwardRef } from "react";

export type BaseMotionProps = {
  enabled?: boolean;
  order?: number;
  /**
   * 초
   */
  duration?: number;
  /**
   * 초
   */
  delay?: number;

  repeat?: number;
  repeatDelay?: number;
};

export const MotionDiv = forwardRef<
  HTMLDivElement,
  Parameters<typeof motion.div>[0] & {
    enabled?: boolean;
    children?: React.ReactNode;
  }
>((props, ref) => {
  //props에 들어있는 enabled로 인해 warn이 발생하여 enabled 삭제.
  const enabled = props.enabled ?? true;
  const prop = { ...props, enabled: undefined, children: undefined };

  return enabled ? (
    <motion.div ref={ref} {...prop} onClick={props.onClick}>
      {props.children}
    </motion.div>
  ) : (
    <div id={props.id} className={props.className}>
      {props.children}
    </div>
  );
});

export const MotionP = (
  props: Parameters<typeof motion.p>[0] & {
    enabled?: boolean;
    children?: React.ReactNode;
  }
) => {
  //props에 들어있는 enabled로 인해 warn이 발생하여 enabled 삭제.
  const enabled = props.enabled ?? true;
  const prop = { ...props, enabled: undefined, children: undefined };

  return enabled ? (
    <motion.p {...prop} onClick={props.onClick}>
      {props.children}
    </motion.p>
  ) : (
    <p id={props.id} className={props.className}>
      {props.children}
    </p>
  );
};

export const MotionSection = (
  props: Parameters<typeof motion.section>[0] & {
    enabled?: boolean;
    children?: React.ReactNode;
  }
) => {
  //props에 들어있는 enabled로 인해 warn이 발생하여 enabled 삭제.
  const enabled = props.enabled ?? true;
  const prop = { ...props, enabled: undefined, children: undefined };

  return enabled ? (
    <motion.section {...prop} onClick={props.onClick}>
      {props.children}
    </motion.section>
  ) : (
    <section id={props.id} className={props.className}>
      {props.children}
    </section>
  );
};
