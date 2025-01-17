interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
}

function Image({
  src,
  alt = "",
  width,
  height,
  onClick,
  className,
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
      }}
      onClick={onClick}
    />
  );
}

export default Image;
