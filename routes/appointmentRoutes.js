import express from 'express';
import { createAppointment,getAppointments,getAppointmentCount,deleteAppointment,getAppointmentsByDoctorId } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/appointments', createAppointment);
router.get('/', getAppointments);
router.get('/appointments/count',getAppointmentCount)
router.delete('/appointments/delete/:id', deleteAppointment);
router.get('/appointments/doctor/:doctorId',getAppointmentsByDoctorId);



export default router;