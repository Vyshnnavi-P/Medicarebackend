// models/medicineModel.js
import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  category: { type: String, required: true },
  batchNumber: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  dateReceived: { type: Date, required: true },
  manufacturer: { type: String, required: true },
  status: { type: String, enum: ['In Stock', 'Expired', 'Discontinued'], default: 'In Stock' }
});

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;
