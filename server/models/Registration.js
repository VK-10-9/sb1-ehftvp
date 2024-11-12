import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true },
  collegeName: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  events: [{ type: String, required: true }],
  accommodation: String,
  checkInTime: String,
  totalAmount: { type: Number, required: true },
  registrationDate: { type: Date, default: Date.now }
});

export const Registration = mongoose.model('Registration', registrationSchema);