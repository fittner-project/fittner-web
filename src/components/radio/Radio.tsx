import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Radio.module.scss";
import classNames from "classnames";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  radioType?: "default"; // 필요한 타입 추가 가능
  label?: string;
}

function Radio(
  { className, radioType = "default", label, ...props }: RadioProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const radioProps = {
    type: "radio",
    ...props,
    ref,
  };

  return {
    default: (
      <label className={classNames(styles.radio_label, className)}>
        <input {...radioProps} className={styles.radio_input} />
        <span className={styles.radio_custom} />
        {label && <span className={styles.label_text}>{label}</span>}
      </label>
    ),
  }[radioType];
}

export default forwardRef<HTMLInputElement, RadioProps>(Radio);
