import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.scss";
import { search } from "@/assets/assets";
import Image from "../image/Image";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputType?: "line" | "default" | "line-search" | "default-search";
  maxLength?: number;
  endAdornment?: React.ReactNode;
}

function Input(
  {
    className,
    inputType = "default",
    maxLength,
    endAdornment,
    ...props
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (maxLength && input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  };

  const inputProps = {
    ...props,
    ref,
    maxLength,
    onInput: handleInput,
  };

  return {
    default: (
      <div className={styles.input_container}>
        <input
          {...inputProps}
          className={`${styles.default_input} ${className}`}
        />
        {endAdornment}
      </div>
    ),
    line: (
      <div className={`${styles.line_input_container} ${className}`}>
        <input {...inputProps} className={styles.line_input} />
        <div className={styles.end_adornment}>{endAdornment}</div>
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
          {...inputProps}
          className={styles.line_input}
          style={{
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
          {...inputProps}
          className={classNames(
            styles.default_input,
            styles.default_search_input
          )}
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
  }[inputType];
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
