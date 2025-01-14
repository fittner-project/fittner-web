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
  const { openModal, setLoading } = useModalStore.getState();

  if (preloadCallback) {
    try {
      setLoading(true);
      await preloadCallback();
    } finally {
      setLoading(false);
    }
  }

  openModal(component, { ...props, children });
};

export const closeModal = ({ onClose }: CloseModalParams = {}) => {
  const { closeModal } = useModalStore.getState();
  onClose?.();
  closeModal();
};
