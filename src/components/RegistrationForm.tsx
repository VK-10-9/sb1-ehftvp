import React, { useState } from 'react';
import axios from 'axios';
import { FormField } from './FormField';
import { EventSelection } from './EventSelection';

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    contactNo: '',
    email: '',
    collegeName: '',
    branch: '',
    semester: '',
    events: [] as string[],
    accommodation: '',
    checkInTime: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEventsChange = (selectedEvents: string[]) => {
    setFormData(prev => ({ ...prev, events: selectedEvents }));
  };

  const calculateTotal = (events: string[]) => {
    const count = events.length;
    if (count === 0) return 0;
    if (count === 1) return 400;
    if (count === 2) return 700;
    if (count === 3) return 900;
    return 900 + (count - 3) * 300;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const totalAmount = calculateTotal(formData.events);
      const response = await axios.post('http://localhost:5000/api/registration', {
        ...formData,
        totalAmount
      });

      setSubmitStatus({
        type: 'success',
        message: `Registration successful! Your registration ID is: ${response.data.registrationId}`
      });
      
      // Reset form
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        contactNo: '',
        email: '',
        collegeName: '',
        branch: '',
        semester: '',
        events: [],
        accommodation: '',
        checkInTime: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Registration failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Event Registration</h2>
        
        {submitStatus.type && (
          <div className={`mb-4 p-4 rounded ${
            submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <FormField
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
            <FormField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gender *</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  className="form-radio"
                  required
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>

          <FormField
            label="Contact No."
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
          />

          <FormField
            label="Email ID"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email to receive Reference Code"
          />

          <FormField
            label="College Name"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
            placeholder="Do not use (') in the college name"
          />

          <FormField
            label="Branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            placeholder="Name of the department"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Semester *</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">-- Choose Semester --</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>

          <EventSelection 
            selectedEvents={formData.events}
            onEventsChange={handleEventsChange}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Check In Time *</label>
            <select
              name="checkInTime"
              value={formData.checkInTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">-- Check In Time --</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={`${i}:00`}>
                  {i.toString().padStart(2, '0')}:00
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}