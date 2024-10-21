// models/doctor.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email:{
      type:String,
      required:true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    availableDate: {
      type: Date,
      required: true,
    },
    availableTime: {
      type: String,
      required: true,
    },
    availableSlots: {
        type: Map,
        of: [String],
      },
    bookedSlots: {
        type: [String],
        default: [],
      },
    city:{
      type: [String],
        default: [], 
    },
    consultantFee:{
      type: [String],
        default: [],
    },
    description:{
      type: [String],
        default: [],
    },
    experience:{
      type: [String],
        default: [],
    },
    rating:{
      type: [String],
        default: [],
    },
    visingHours:{
      type: [String],
        default: [],
    }

  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);
