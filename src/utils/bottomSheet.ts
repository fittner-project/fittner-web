interface OpenBottomSheetParams<T> {
  component: React.ComponentType<T>;
  props?: Partial<T>;
  children?: React.ReactNode;
  preloadCallback?: () => Promise<void>;
}

interface CloseBottomSheetParams {
  onCloseComplete?: () => void;
}

export const openBottomSheet = async <T>({
  component,
  props,
  children,
  preloadCallback,
}: OpenBottomSheetParams<T>) => {
  const { openBottomSheet: openBottomSheetWithStore, setIsLoading } =
    useBottomSheetStore.getState();

  if (preloadCallback) {
    try {
      setIsLoading(true);
      await preloadCallback();
    } finally {
      setIsLoading(false);
    }
  }

  openBottomSheetWithStore(component, { ...props, children } as T);
};

export const closeBottomSheet = ({
  onCloseComplete,
}: CloseBottomSheetParams = {}) => {
  const { closeBottomSheet: closeBottomSheetWithStore } =
    useBottomSheetStore.getState();
  onCloseComplete?.();
  closeBottomSheetWithStore();
};
