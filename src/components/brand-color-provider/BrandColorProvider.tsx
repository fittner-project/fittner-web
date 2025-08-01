import { FC, useEffect } from "react";
import { useUserStore } from "@/stores/user";

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
        "--primary-a",
        brandColors.primary || "#4c6aff"
      );

      // document.documentElement.style.setProperty(
      //   "--primary-b",
      //   brandColors.primary2 || "#d8e2ff"
      // );

      document.documentElement.style.setProperty(
        "--sub-a",
        brandColors.sub || "#ff8194"
      );

      // document.documentElement.style.setProperty(
      //   "--sub-b",
      //   brandColors.sub2 || "#ffe5eb"
      // );

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
