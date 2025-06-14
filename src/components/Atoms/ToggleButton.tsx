interface ToggleButtonProps {
  onToggleRequired: () => void;
  required: boolean;
}

const ToggleButton = ({ onToggleRequired, required }: ToggleButtonProps) => {
  return (
    <button
      type="button"
      onClick={onToggleRequired}
      className={`w-10 h-6 rounded-full transition-colors flex items-center cursor-pointer ${required ? 'bg-blue-500' : 'bg-gray-300'}`}
      aria-label="필수 여부 토글"
    >
      <span
        className={`block w-5 h-5 ml-0.5 bg-white rounded-full shadow transform transition-transform ${required ? 'translate-x-4' : ''}`}
      />
    </button>
  );
};

export default ToggleButton;
