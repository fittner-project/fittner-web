import { PropsWithChildren } from "react";

interface ButtonProps {
  href?: string;
  backgroundColor: "primary_1" | "sub_1" | "grey_1";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}

function Button({
  href,
  children,
  backgroundColor,
  fullWidth,
  disabled,
  className,
  onClick,
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

  const handleClick = () => {
    if (href) {
      navigate(href);
    } else {
      onClick?.();
    }
  };

  const currentStyle = disabled
    ? colorStyle.grey_1
    : colorStyle[backgroundColor];

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      style={{
        background: currentStyle.backgroundColor,
        color: currentStyle.color,
        width: fullWidth ? "100%" : "auto",
        borderRadius: "1.6rem",
        height: "6rem",
        fontFeatureSettings: "liga off, clig off",
        fontFamily: "Pretendard",
        fontSize: "2rem",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "2.2rem",
      }}
      className={className}
    >
      {children}
    </button>
  );
}

export default Button;
