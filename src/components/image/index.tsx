import styles from "./index.module.scss";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

function Image({ src, alt, width, height }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={styles.image}
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
      }}
    />
  );
}

export default Image;
