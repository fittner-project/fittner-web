interface OpenModalParams<T> {
  component: React.ComponentType<T>;
  props?: Partial<T>;
  children?: React.ReactNode;
  preloadCallback?: () => Promise<void>;
}

interface CloseModalParams {
  onClose?: () => void;
}

export const openModal = async <T>({
  component,
  props,
  children,
  preloadCallback,
}: OpenModalParams<T>) => {
  const { openModal: openModalWithStore, setIsLoading } =
    useModalStore.getState();

  if (preloadCallback) {
    try {
      setIsLoading(true);
      await preloadCallback();
    } finally {
      setIsLoading(false);
    }
  }

  openModalWithStore(component, { ...props, children });
};

export const closeModal = ({ onClose }: CloseModalParams = {}) => {
  const { closeModal: closeModalWithStore } = useModalStore.getState();
  onClose?.();
  closeModalWithStore();
};
