import { closeImageViewer } from "@/utils/imageViewer";
import Image from "../image/Image";
import styles from "./ImageViewer.module.scss";

import { x } from "@/assets/assets";

export default function ImageViewer() {
  const imageUrl = useImageViewerStore((state) => state.imageUrl);
  const setIsOpen = useImageViewerStore((state) => state.setIsOpen);

  useEffect(() => {
    const handlePopState = () => {
      setIsOpen(false);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.close_button_container}>
        <Image
          src={x}
          alt="close"
          className={styles.close_button}
          onClick={() => {
            closeImageViewer();
          }}
        />
      </div>
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
