

// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');


// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true},
//   password: { type: String },
// });

// userSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) return next();

//     const salt = await bcrypt.genSalt(10);
//     //const hash = await bcrypt.hash(this.password, salt);
//     const hash = bcrypt.genSalt(10,(err,salt)=> bcrypt.hash(`${this.password}`, salt,(err,hash) =>{if(err) throw (err)}))
//     //const hash = bcrypt.genSalt(10,(err,salt) => { bcrypt.hash(${password}, salt , (err, hash) =>{ if(err) throw (err)} 
//     this.password = hash;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, `${this.password}`);
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;





const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});
const User = mongoose.model('User', userSchema);

module.exports = User