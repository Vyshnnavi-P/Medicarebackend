// routes/paymentRoutes.js
import express from 'express';
import { createPayment, getPayments, getPaymentCount } from '../controllers/paymentController.js';
import Stripe from 'stripe';
import Payment from '../models/payment.js';

const stripe = new Stripe('sk_test_51QCDT9CTH3SLWt7GlGOZij8ZQcDisksDUpaYAsx1fso4kdKwmazgbIzgg6MkwKPqqE9KY9YbXMSFdPd6xRlMAJsX00gvjv1CMc');

const router = express.Router();

router.post('/add', createPayment);  // Add a new payment
router.get('/getpay', getPayments);        // Get all payments
router.get('/count', getPaymentCount); // Get total payment count

router.post('/create-payment-intent', async (req, res) => {
    try {
      const { amount } = req.body;  // Make sure you are sending the amount from the frontend
      
      if (!amount) {
        return res.status(400).json({ error: 'Missing amount' });
      }
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,   // Ensure this is in the smallest unit of your currency (e.g., cents for USD)
        currency: 'LKR',  // Adjust the currency based on your needs
        automatic_payment_methods: {
          enabled: true,
        },
      });
  
      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error('Error creating payment intent:', error.message);
      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  });

  router.post('/update-status', async (req, res) => {
    try {
      const { paymentId, status } = req.body;
  
      // Find the payment by ID and update its status
      const payment = await Payment.findById(paymentId);
      if (payment) {
        payment.status = status;
        await payment.save();
        res.status(200).json({ message: 'Payment status updated successfully' });
      } else {
        res.status(404).json({ message: 'Payment not found' });
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }

    router.put('/:id', async (req, res) => {
        try {
          const { isCompleted } = req.body; // Extract completion status from the request body
          const paymentId = req.params.id;
      
          const updatedPayment = await Payment.findByIdAndUpdate(paymentId, { isCompleted }, { new: true });
          if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
          }
          res.status(200).json(updatedPayment);
        } catch (error) {
          console.error('Error updating payment completion status:', error);
          res.status(500).json({ message: 'Server error' });
        }
      });
  });

  
  
 

export default router;
