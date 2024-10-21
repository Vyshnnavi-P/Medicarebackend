// models/appointment.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { date:String,month:String,year:String },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  address: {
    road:String,
    city: String,
    province: String,
  },
  department: { type: String, required: true },
  contactNumber: {type:String, require:true},
  appointmentDate: { type: String, required: true },
  timeSlot: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  
}, {
  timestamps: true //useful to track the creation and modification times of appointment documents
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;