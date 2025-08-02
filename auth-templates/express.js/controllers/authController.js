const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory "DB"
const users = [];

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = { id: users.length + 1, email, password: hash };
  users.push(user);

  const payload = { user: { id: user.id, email: user.email } };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
    (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    }
  );
}

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const payload = { user: { id: user.id, email: user.email } };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
    (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    }
  );
}
