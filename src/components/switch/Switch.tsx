interface SwitchProps {
  isSwitchOn: boolean;
  onChange: () => void;
}

export default function Switch({ isSwitchOn = false, onChange }: SwitchProps) {
  return (
    <div
      onClick={onChange}
      style={{
        width: "5rem",
        height: "3rem",
        backgroundColor: isSwitchOn ? "#4C6AFF" : "#78788029",
        borderRadius: "10rem",
        padding: "0.2rem",
        transition: "background-color 0.2s ease",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "2.6rem",
          height: "2.6rem",
          backgroundColor: "white",
          borderRadius: "50%",
          position: "absolute",
          left: isSwitchOn ? "calc(100% - 2.8rem)" : "0.2rem",
          transition: "left 0.2s ease",
        }}
      />
    </div>
  );
}
