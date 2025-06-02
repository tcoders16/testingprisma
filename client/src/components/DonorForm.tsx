import { useState } from 'react';
import axios from '../api/api';
import {Input} from './ui/input.tsx';

interface DonorFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function DonorForm() {
  const [form, setForm] = useState<DonorFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await axios.post('/donors', form);
      setSuccessMessage(`Donor ${res.data.name} created!`);
      setForm({ name: '', email: '', phone: '', address: '' }); // clear form
    } catch (err: any) {
      setErrorMessage('Failed to create donor');
      console.error(err);
    }
  };

// Render the form from here!!!


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Create New Donor</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <Input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <Input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <Input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          Add Donor
        </button>
      </form>

      {successMessage && (
        <p className="text-green-600 text-center mt-4">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 text-center mt-4">{errorMessage}</p>
      )}
    </div>
  );
}
  
