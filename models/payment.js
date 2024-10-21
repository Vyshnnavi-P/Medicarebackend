// models/payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  accountNumber: { type: String, required: true, validate: /^[0-9]{10,12}$/ }, // Assuming 10-12 digit account number
  selectedStatus: { 
    type: String, 
    required: true, 
    enum: ['Doctor', 'Employee'] // Keep this as it is
  },
  manHours: { type: String, required: true },
  overTime: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  isCompleted: { type: Boolean, default: false } // New field to track completion status
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
