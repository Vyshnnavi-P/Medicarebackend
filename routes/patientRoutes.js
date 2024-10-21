import express from 'express';
import { createPatient, getPatients,getPatientCount,getLatestPatient} from '../controllers/patientController.js';

const router = express.Router();

router.post('/patients', createPatient);
router.get('/patients/admit', getPatients);
router.get('/patients/count',getPatientCount);
router.get('/patients/latest',getLatestPatient);

// need to add more routes

export default router;
