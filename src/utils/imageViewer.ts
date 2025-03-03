export const openImageViewer = ({ imageUrl }: { imageUrl: string }) => {
  const { setIsOpen, setImageUrl } = useImageViewerStore.getState();
  setIsOpen(true);
  setImageUrl(imageUrl);
};

export const closeImageViewer = () => {
  useImageViewerStore.getState().setIsOpen(false);
  window.history.back();
};
