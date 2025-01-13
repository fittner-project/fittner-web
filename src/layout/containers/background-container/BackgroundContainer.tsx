import { PropsWithChildren } from "react";

interface BackgroundContainerProps extends PropsWithChildren {
  backgroundColor?: string;
}

function BackgroundContainer({
  children,
  backgroundColor = "#F2F4F6",
}: BackgroundContainerProps) {
  return <div style={{ backgroundColor: backgroundColor }}>{children}</div>;
}

export default BackgroundContainer;
