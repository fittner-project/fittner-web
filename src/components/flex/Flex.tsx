/* eslint-disable react/display-name */
import classNames from "classnames";
import { forwardRef } from "react";

import styles from "./Flex.module.scss";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: number | string;
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      justifyContent = "flex-start",
      alignItems = "stretch",
      flexDirection = "row",
      flexWrap = "nowrap",
      gap = 0,
      children,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const combinedStyles = {
      justifyContent,
      alignItems,
      flexDirection,
      flexWrap,
      gap,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={classNames(styles.container, className)}
        style={combinedStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default Flex;
