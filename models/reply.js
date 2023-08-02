// models/Reply.js
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  text: String,
  author: String,
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;