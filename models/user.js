import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      trim: true,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    joinedAt: { type: Date, default: Date.now },
    joinedTime: { type: Date }, // Last login time
    status:{
      type: String,
      required: true,
    },
    HeartRate:{
      type:String
    },
    bloodGroup:{
      type:String
    },
    weight:{
      type:String
    },
    resetCode: { type: Number, required: false },
  
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  if (this.isNew) {
    const now = new Date();
    this.joinedAt = Date.now();  // Set the joinedAt timestamp to the current date and time
    this.joinedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  next();
});
export default mongoose.model("User", userSchema);

