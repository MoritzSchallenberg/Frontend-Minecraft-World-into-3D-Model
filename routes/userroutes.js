const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Registrierung
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, passwordHash });
  await newUser.save();
  res.status(201).json({ message: 'Benutzer erstellt' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Benutzer nicht gefunden' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Falsches Passwort' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

module.exports = router;


router.put('/me', authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        billingAddress: req.body.billingAddress
      },
      { new: true, runValidators: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Aktualisieren.");
  }
});