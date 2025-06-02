// components/NewDonorFields.tsx



interface NewDonorFieldsProps {
  newDonor: {
    email: string;
    phone: string;
    address: string;
  };
  setNewDonor: (value: {
    email: string;
    phone: string;
    address: string;
  }) => void;
}

export default function NewDonorFields({ newDonor, setNewDonor }: NewDonorFieldsProps) {
  return (
    <div className="space-y-3">
      <label className="block font-medium">Email</label>
      <input
        type="email"
        placeholder="Enter email"
        value={newDonor.email}
        onChange={(e) => setNewDonor({ ...newDonor, email: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block font-medium">Phone</label>
      <input
        type="tel"
        placeholder="Enter phone number"
        value={newDonor.phone}
        onChange={(e) => setNewDonor({ ...newDonor, phone: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block font-medium">Address</label>
      <input
        type="text"
        placeholder="Enter address"
        value={newDonor.address}
        onChange={(e) => setNewDonor({ ...newDonor, address: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}