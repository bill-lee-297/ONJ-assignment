import Button from '@/components/Atoms/Button';

interface AlertModalProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const AlertModal = ({ open, message, onConfirm, onCancel }: AlertModalProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg text-center py-4 min-w-[400px]">
        <div className="text-xl text-gray-800 border-b border-gray-200 py-8 px-10">{message}</div>
        <div className="flex justify-end gap-2 mt-4 px-4">
          {onCancel && <Button variant="secondary" onClick={onCancel}>취소</Button>}
          <Button onClick={onConfirm}>확인</Button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
