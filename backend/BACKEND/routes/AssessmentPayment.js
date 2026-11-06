const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Lazy getter — only instantiates when a request comes in (after env is loaded)
const getRazorpay = () => new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/assessment-payment/create-order
router.post('/create-order', async (req, res) => {
    try {
        const razorpayInstance = getRazorpay();
        const options = {
            amount: 10100, // ₹101 in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        };
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
});

// POST /api/assessment-payment/verify-payment
router.post('/verify-payment', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    try {
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ success: false, message: 'Failed to verify payment' });
    }
});

module.exports = router;
