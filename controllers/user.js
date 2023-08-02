
// // controllers/authController.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const config = require('../config');
// const bcrypt = require('bcrypt')

// exports.register = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const existingUser = await User.findOne({ username });

//     if (existingUser) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     const newUser = new User({ username, password });
//     await newUser.save();

//     res.json({ msg: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
 //     const { username, password } = req.body;

//     const user = await User.findOne({ username }).select('+password');

//     if (!user) {
//       return res.status(400).json({ msg: 'User not found' });
//     }

//     //const isMatch = await user.comparePassword(password);
//     const isMatch = await bcrypt.compare(user.password, this.password)
  
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const payload = { user: { id: user.id } };

//     jwt.sign(payload, config.secret, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };








const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModal = require('../models/user')

const secret = 'your-secret-key';

exports.signin = async (req, res) => {
  const { email, password } = await req.body;
    console.log(email)
    
  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};
