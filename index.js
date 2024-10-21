import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import reportRoutes from './routes/reportRoutes.js'; // Import report routes
import paymentRoutes from './routes/paymentRoutes.js';
import pharmacyRoutes from './routes/pharmacyRoutes.js';
import cors from "cors";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// router middlewares
app.use("/api", authRoutes);
app.use('/api', doctorRoutes); 
app.use('/api/doctors', doctorRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', patientRoutes);
app.use('/api', reportRoutes); // Add report routes
app.use('/api/payments', paymentRoutes);
app.use('/api/medicines',pharmacyRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});