import { useEffect, useState } from 'react';
import axios from '../api/api';
import DonorSelector from './DonorSelector.tsx';
import NewDonorFields from './NewDonorFields.tsx';
import DonationMessageField from './DonationMessageField.tsx';
import SubmitButton from './SubmitButton.tsx';
import { Input } from './ui/input.tsx';

interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function DonationForm() {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState<Donor[]>([]);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [newDonor, setNewDonor] = useState({ email: '', phone: '', address: '' });
  const [message, setMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (name.length > 1 && !selectedDonor) {
      axios
        .get(`/donors?search=${name}`)
        .then((res) => setSearchResults(res.data))
        .catch(() => setSearchResults([]));
    }
  }, [name, selectedDonor]);

  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg('');
        setErrorMsg('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  const handleCreateDonation = async () => {
    setSuccessMsg('');
    setErrorMsg('');

    if (!amount || !name || (!selectedDonor && (!newDonor.email || !newDonor.phone || !newDonor.address))) {
      setErrorMsg('Please fill out all required fields.');
      return;
    }

    try {
      let donorId = selectedDonor?.id;

      if (!donorId) {
        const res = await axios.post('/donors', {
          name,
          email: newDonor.email,
          phone: newDonor.phone,
          address: newDonor.address,
        });
        donorId = res.data.id;
      }

      await axios.post('/donations', {
        amount: Number(amount),
        message,
        donorId,
      });

      setSuccessMsg('Donation submitted successfully.');
      setAmount('');
      setName('');
      setMessage('');
      setSelectedDonor(null);
      setNewDonor({ email: '', phone: '', address: '' });
    } catch (error: any) {
      setErrorMsg('Failed to submit donation.');
    }
  };

  return (
   
      <div className="bg-white h-auto w-full max-w-xl p-8 rounded-3xl shadow-2xl border border-gray-300 ">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-10 tracking-tight text-blue-800 drop-shadow-2xl leading-tight">
          <span className="block mb-2 text-base font-semibold text-blue-500 tracking-widest uppercase">
            Welcome to
          </span>
          Vadtal Canada 
          <span className="block text-lg font-medium text-gray-400 mt-1">
            Simplify &amp; Manage Your Temple Donations
          </span>
        </h1>
        <div className="space-y-4">
          {/* Donation Form */}
          <label className="text-sm font-medium">Donation Amount</label>
          <Input
            type="number"
            placeholder="Enter donation amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-white text-black border border-gray-300"
          />
          <DonorSelector
            name={name}
            setName={setName}
            selectedDonor={selectedDonor}
            setSelectedDonor={setSelectedDonor}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
          {!selectedDonor && name && (
            <NewDonorFields newDonor={newDonor} setNewDonor={setNewDonor} />
          )}
          <DonationMessageField message={message} setMessage={setMessage} />
          <SubmitButton onClick={handleCreateDonation} />
          {successMsg && <p className="text-green-600 mt-4 text-center font-medium">{successMsg}</p>}
          {errorMsg && <p className="text-red-600 mt-4 text-center font-medium">{errorMsg}</p>}
        </div>
      </div>
    
  );
}