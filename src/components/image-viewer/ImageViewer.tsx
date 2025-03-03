import Image from "../image/Image";
import styles from "./ImageViewer.module.scss";

import { x } from "@/assets/assets";

export default function ImageViewer() {
  const imageUrl = useImageViewerStore((state) => state.imageUrl);
  const setIsOpen = useImageViewerStore((state) => state.setIsOpen);

  return (
    <div className={styles.container}>
      <Image
        src={x}
        alt="close"
        style={{ position: "absolute", top: "2rem", right: "2rem" }}
        onClick={() => {
          setIsOpen(false);
        }}
      />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="image"
          style={{ height: "100%", objectFit: "contain" }}
        />
      )}
    </div>
  );
}
