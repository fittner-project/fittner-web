interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number | string;
  height?: number | string;
}

function Image({ width, height, style, ...props }: ImageProps) {
  return (
    <img
      {...props}
      loading="lazy"
      style={{
        width: typeof width === "number" ? `${width}rem` : width,
        height: typeof height === "number" ? `${height}rem` : height,
        ...style,
      }}
    />
  );
}

export default Image;
