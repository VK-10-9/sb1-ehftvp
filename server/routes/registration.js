import express from 'express';
import { Registration } from '../models/Registration.js';

export const registrationRouter = express.Router();

registrationRouter.post('/', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ 
      success: true, 
      message: 'Registration successful',
      registrationId: registration._id 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Registration failed', 
      error: error.message 
    });
  }
});