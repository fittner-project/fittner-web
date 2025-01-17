interface OpenBottomSheetParams<T> {
  component: React.ComponentType<T>;
  props?: Partial<T>;
  children?: React.ReactNode;
  preloadCallback?: () => Promise<void>;
}

interface CloseBottomSheetParams {
  onClose?: () => void;
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

export const closeBottomSheet = ({ onClose }: CloseBottomSheetParams = {}) => {
  const { setIsOpen } = useBottomSheetStore.getState();

  setIsOpen(false);
  onClose?.();
};
