import { useParams } from "react-router-dom";

export default function SignUpTermDetail() {
  const { termUrl } = useParams();

  return (
    <iframe
      key={termUrl}
      src={termUrl}
      allowFullScreen
      frameBorder={0}
      style={{
        width: "100%",
        height: "calc(100dvh - 5.8rem)",
        display: "block",
      }}
    />
  );
}
