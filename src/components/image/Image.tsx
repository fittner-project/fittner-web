interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number | string;
  height?: number | string;
}

function Image({ width, height, onClick, style, ...props }: ImageProps) {
  return (
    <img
      {...props}
      style={{
        width: typeof width === "number" ? `${width}rem` : width,
        height: typeof height === "number" ? `${height}rem` : height,
        ...style,
      }}
    />
  );
}

export default Image;
