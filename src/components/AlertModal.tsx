import React from 'react';
import Button from './Atoms/Button';

interface AlertModalProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[280px] text-center">
        <div className="mb-4 text-lg">{message}</div>
        <div className="flex justify-center gap-4 mt-4">
          {onCancel && <Button onClick={onCancel}>취소</Button>}
          <Button onClick={onConfirm}>확인</Button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal; 