// components/DonationMessageField.tsx

import { Input } from "./ui/input";

interface DonationMessageFieldProps {
  message: string;
  setMessage: (value: string) => void;
}

export default function DonationMessageField({
  message,
  setMessage,
}: DonationMessageFieldProps) {
  return (
    <div className="w-full">
      <label className="block font-medium mb-1">Donation Message (optional)</label>
      <div className="relative">
        <span className="absolute left-4 top-2 text-gray-400 text-sm pointer-events-none">
          Add a short message if any
        </span>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 pt-7 pb-3 h-24 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-transparent"
        />
      </div>
    </div>
  );
}