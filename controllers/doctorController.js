// controllers/doctorController.js
import Doctor from '../models/doctor.js';

export const addDoctor = async (req, res) => {
  try {
    const { name, email, department, availableDate, availableTime,city,consultantFee,description,experience,rating,visingHours} = req.body;
    const doctor = new Doctor({ name, department,email,availableDate, availableTime,city,consultantFee,description,experience,rating,visingHours});
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const { department } = req.query;
    const doctors = await Doctor.find({ department });
    res.status(200).json(doctors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const doctor = await Doctor.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAvailableSlots = async (req, res) => {
    const { doctorId, date } = req.query;
  
  try {
    const doctor = await Doctor.findById(doctorId).populate('availableTime');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const availableSlots = doctor.availableTime.filter(slot => {
      // You can add additional logic here if necessary to filter by date
      return slot.date === date;
    });

    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
  };

 /* export const getDoctorsByDate = async (req, res) => {
    const { department, date } = req.query;
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);
  
    try {
      const doctors = await Doctor.find({
        department: department,
        availableDate: { $gte: startOfDay, $lte: endOfDay }
      });
  
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };*/

  export const getDoctorsByDate = async (req, res) => {
    try {
      const { availableDate, department } = req.body;
      const date = new Date(availableDate);
      const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));
  
      const doctors = await Doctor.find({
        availableDate: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
        department: department, // Filter by department
      });
  
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching doctors', error });
    }
  };


  export const getDoctorByEmail = async (req, res) => {
    const { email } = req.params;
    try {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching doctor by email', error: err });
    }
  };

  export const printDoctors = async (req, res) => {
    try {
      const doctor = await Doctor.find();
      res.status(200).json(doctor);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };