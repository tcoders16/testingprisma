// components/DonorSelector.tsx

import { useEffect } from 'react';
import axios from '../api/api';
import {Input} from './ui/input.tsx';

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface DonorSelectorProps {
  name: string;
  setName: (val: string) => void;
  selectedDonor: Donor | null;
  setSelectedDonor: (donor: Donor | null) => void;
  setSearchResults: (results: Donor[]) => void;
  searchResults: Donor[];
}

export default function DonorSelector({
  name,
  setName,
  selectedDonor,
  setSelectedDonor,
  searchResults,
  setSearchResults,
}: DonorSelectorProps) {
  // Fetch donors dynamically based on input
  useEffect(() => {
    if (name.length > 1 && !selectedDonor) {
      axios
        .get(`/donors?search=${name}`)
        .then((res) => {
          // Sort: most relevant matches first
          const sorted = res.data.sort((a: Donor, b: Donor) =>
            a.name.toLowerCase().indexOf(name.toLowerCase()) -
            b.name.toLowerCase().indexOf(name.toLowerCase())
          );
          setSearchResults(sorted);
        })
        .catch(() => setSearchResults([]));
    }
  }, [name, selectedDonor, setSearchResults]);

  return (
    <div>
      {/* Donor name input */}
      <label className="block mb-1 font-medium">Donor Name</label>

      <Input
        // label='Donor Name'
        type="text"
        placeholder="Type donor's name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setSelectedDonor(null);
        }}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Matching results */}
      {searchResults.length > 0 && !selectedDonor && (
        <div className="bg-white border border-gray-300 rounded-md mt-2 shadow-sm">
          {searchResults.map((donor) => (
            <div
              key={donor.id}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
              onClick={() => setSelectedDonor(donor)}
            >
              <div className="font-semibold">{donor.name}</div>
              <div className="text-sm text-gray-500">{donor.email} • {donor.phone}</div>
            </div>
          ))}
          <div
            className="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
            onClick={() => setSelectedDonor(null)}
          >
            + Create New Donor
          </div>
        </div>
      )}
    </div>
  );
}