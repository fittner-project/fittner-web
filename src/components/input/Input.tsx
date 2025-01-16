import { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import { search } from "@/assets/assets";
import Image from "../image/Image";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: "line" | "default" | "line-search" | "default-search";
  fullWidth?: boolean;
}

function Input({
  className,
  type = "default",
  fullWidth,
  ...props
}: InputProps) {
  return {
    default: (
      <input
        {...props}
        className={`${styles.default_input} ${className}`}
        style={{ ...(fullWidth && { width: "100%" }) }}
      />
    ),
    line: (
      <div className={`${styles.line_input_container} ${className}`}>
        <input
          {...props}
          className={styles.line_input}
          style={{ ...(fullWidth && { width: "100%" }) }}
        />
      </div>
    ),
    "line-search": (
      <div
        className={classNames(
          styles.line_input_container,
          styles.search_container,
          className
        )}
      >
        <input
          {...props}
          className={styles.line_input}
          style={{
            ...(fullWidth && { width: "100%" }),
            paddingRight: "3.9rem",
          }}
        />
        <Image
          width={2.4}
          height={2.4}
          src={search}
          alt="search"
          className={styles.search_icon}
        />
      </div>
    ),
    "default-search": (
      <div
        className={classNames(
          styles.default_input_container,
          styles.search_container,
          className
        )}
      >
        <input
          {...props}
          className={classNames(
            styles.default_input,
            styles.default_search_input
          )}
          style={{
            ...(fullWidth && { width: "100%" }),
          }}
        />
        <Image
          width={1.9}
          height={1.9}
          src={search}
          alt="search"
          className={styles.default_search_icon}
        />
      </div>
    ),
  }[type];
}

export default Input;
