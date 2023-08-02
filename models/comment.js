// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  author: String,
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
