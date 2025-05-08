import { ClipLoader } from "react-spinners";

export default function LoadingIndicator() {
  const brandColors = useUserStore((state) => state.brandColors);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 9999,
      }}
    >
      <ClipLoader color={brandColors.primary} size={50} />
    </div>
  );
}
