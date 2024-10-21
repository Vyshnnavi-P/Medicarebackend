import Payment from '../models/payment.js';

export const createPayment = async (req, res) => {
  try {
    const { employeeName, accountNumber, selectedStatus, manHours, overTime, totalAmount, } = req.body;

    const payment = new Payment({
      employeeName,
      accountNumber,
      selectedStatus,
      manHours,
      overTime,
      totalAmount,
      
      
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPaymentCount = async (req, res) => {
  try {
      const count = await Payment.countDocuments();
      res.json({ count });
  } catch (error) {
      console.error('Error fetching payment count:', error);
      res.status(500).json({ message: 'Error fetching payment count' });
  }
};
