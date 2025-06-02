// components/SubmitButton.tsx



interface SubmitButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

export default function SubmitButton({
  onClick,
  label = 'Submit',
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-white font-medium py-3 rounded-md transition 
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
      `}
    >
      {label}
    </button>
  );
}