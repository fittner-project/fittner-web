export const base64ToFile = async (
  base64Data: string,
  fileName: string
): Promise<File> => {
  const blob = await fetch(base64Data).then((res) => res.blob());
  return new File([blob], fileName, { type: "image/png" });
};
