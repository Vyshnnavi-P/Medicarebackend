// controllers/reportController.js
import Report from '../models/report.js';

export const createReport = async (req, res) => {
  try {
    const { patientName, doctorName, contactNumber, totalCharge, attachedPdf,email,reportTitle } = req.body;

    const report = new Report({
      patientName,
      doctorName,
      contactNumber,
      totalCharge,
      attachedPdf,
      email,
      reportTitle
    });

    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReportCount = async (req, res) => {
  try {
      const count = await Report.countDocuments();
      res.json({ count });
  } catch (error) {
      console.error('Error fetching user count:', error);
      res.status(500).json({ message: 'Error fetching user count' });
  }
};