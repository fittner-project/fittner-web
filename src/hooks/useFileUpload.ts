import { FileResDto } from "@/api/generated/models";
import { usePostCommonFileUpload } from "@/api/generated/파일/파일";
import { useState } from "react";

export default function useFileUpload() {
  const [error, setError] = useState<Error | null>(null);
  const { mutateAsync: uploadFile, isPending: isUploadingImage } =
    usePostCommonFileUpload();

  const uploadFiles = async (
    files: File | File[]
  ): Promise<{ result: FileResDto[] }> => {
    try {
      setError(null);
      const fileArray = Array.isArray(files) ? files : [files];

      const { result: response } = await uploadFile({
        data: {
          files: fileArray,
        },
      });

      return { result: response ?? [] };
    } catch (err) {
      const error = err instanceof Error ? err : new Error("파일 업로드 실패");
      setError(error);
      throw error;
    }
  };

  return {
    uploadFiles,
    isUploadingImage,
    error,
  };
}
