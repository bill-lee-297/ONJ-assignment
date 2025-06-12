import { useOverlay } from '@toss/use-overlay';
import AlertModal from '@/components/AlertModal';

interface ShowAlertOptions {
  cancel?: boolean;
}

export function useAlert() {
  const overlay = useOverlay();

  const showAlert = (message: string, options?: ShowAlertOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <AlertModal
          open={isOpen}
          message={message}
          onConfirm={() => {
            close();
            resolve(true);
          }}
          onCancel={options?.cancel ? () => {
            close();
            resolve(false);
          } : undefined}
        />
      ));
    });
  };

  return showAlert;
} 