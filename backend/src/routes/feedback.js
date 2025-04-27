const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { userId, email, formType, message } = req.body;

  if (!userId || !email || !formType || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const feedback = await prisma.feedback.create({
      data: { userId, email, formType, message },
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
