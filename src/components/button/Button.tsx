import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  backgroundColor: "primary_1" | "sub_1" | "grey_1";
  fullWidth?: boolean;
  width?: number | string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  href,
  backgroundColor,
  width,
  fullWidth,
  disabled,
  className,
  onClick,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const navigate = useNavigate();
  const colorStyle = {
    primary_1: {
      backgroundColor: "#4C6AFF",
      color: "#fff",
    },
    sub_1: {
      backgroundColor: "#FF8194",
      color: "#fff",
    },
    grey_1: {
      backgroundColor: "#F2F4F6",
      color: "#7F848D",
    },
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href) navigate(href);
    if (onClick) onClick(e);
  };

  const currentStyle = disabled
    ? colorStyle.grey_1
    : colorStyle[backgroundColor];

  return (
    <button
      {...props}
      onClick={handleClick}
      style={{
        background: currentStyle.backgroundColor,
        color: currentStyle.color,
        width: typeof width === "number" ? `${width}rem` : width,
        ...(fullWidth && { width: "100%" }),
        borderRadius: "1.6rem",
        height: "6rem",
        fontFeatureSettings: "liga off, clig off",
        fontFamily: "Pretendard",
        fontSize: "2rem",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "2.2rem",
        transition: "background-color 0.2s ease-in-out",
      }}
      className={className}
    >
      {children}
    </button>
  );
}

export default Button;
