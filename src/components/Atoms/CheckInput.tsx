import type { QuestionType } from '@/types/templates';

interface InputProps {
  type: QuestionType;
  className?: string;
  checked?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckInput = ({ type, className, checked = true, value, onChange }: InputProps) => {
  return <input type={type} className={`w-4 h-4 ${className}`} checked={checked} value={value} onChange={onChange} />;
};

export default CheckInput;
