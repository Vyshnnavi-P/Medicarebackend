import mongoose from 'mongoose';

const { Schema } = mongoose;

const patientSchema = new Schema({
  no: { type: Number, required: true },
  name: { type: String, required: true },
  assignedDoctor: { type: String, required: true },
  dateOfAdmit: { type: String, required: true },
  diseases: { type: String, required: true },
  roomNo: { type: String, required: true },
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
