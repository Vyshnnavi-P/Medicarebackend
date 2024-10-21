import express from 'express';
import { addDoctor, getDoctors, updateDoctor, deleteDoctor, getAvailableSlots, getDoctorsByDate,getDoctorByEmail, printDoctors } from '../controllers/doctorController.js';
import { requireSignin, isAdmin } from '../middlewares/auth.js';
import Doctor from '../models/doctor.js'; // Import Doctor model

const router = express.Router(); // Create a router instance

// Routes for doctor management
router.post('/doctors', addDoctor);
router.get('/doctors', getDoctors);
router.put('/doctors/:id', requireSignin, isAdmin, updateDoctor);
router.delete('/doctors/:id', deleteDoctor);
router.get('/doctors/:doctorId/slots', getAvailableSlots);
router.post('/doctors/by-date', getDoctorsByDate);
router.get('/doctors/email/:email', getDoctorByEmail);
router.get('/print/doctors',printDoctors);


// Route to get a specific doctor by ID
router.get('/doctors/:doctorId', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.doctorId); // Use doctorId parameter
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        console.error('Error fetching doctor details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



export default router;
