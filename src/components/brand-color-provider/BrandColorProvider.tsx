import { FC, useEffect } from "react";
import { useUserStore } from "@/store/user";

const BrandColorProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const brandColors = useUserStore((state) => state.brandColors);

  useEffect(() => {
    if (brandColors) {
      // Grey Colors
      document.documentElement.style.setProperty(
        "--grey-type-a",
        brandColors.greyTypeA || "#f2f4f6"
      );
      document.documentElement.style.setProperty(
        "--grey-type-b",
        brandColors.greyTypeB || "#b0b8c1"
      );
      document.documentElement.style.setProperty(
        "--grey-type-c",
        brandColors.greyTypeC || "#7f848d"
      );
      document.documentElement.style.setProperty(
        "--grey-type-d",
        brandColors.greyTypeD || "#4d5662"
      );

      // Brand Colors
      document.documentElement.style.setProperty(
        "--primary",
        brandColors.primary || "#4c6aff"
      );
      document.documentElement.style.setProperty(
        "--sub",
        brandColors.sub || "#ff8194"
      );

      // Text Colors
      document.documentElement.style.setProperty(
        "--text-type-a",
        brandColors.textTypeA || "#191f28"
      );
      document.documentElement.style.setProperty(
        "--text-type-b",
        brandColors.textTypeB || "#ffffff"
      );
      document.documentElement.style.setProperty(
        "--text-type-c",
        brandColors.textTypeC || "#b0b8c1"
      );
      document.documentElement.style.setProperty(
        "--text-type-d",
        brandColors.textTypeD || "#7f848d"
      );
      document.documentElement.style.setProperty(
        "--text-type-e",
        brandColors.textTypeE || "#4d5662"
      );
      document.documentElement.style.setProperty(
        "--text-type-f",
        brandColors.textTypeF || "#4c6aff"
      );
      document.documentElement.style.setProperty(
        "--text-type-g",
        brandColors.textTypeG || "#ff8194"
      );
    }
  }, [brandColors]);

  return <>{children}</>;
};

export default BrandColorProvider;
