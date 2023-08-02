
// controllers/postController.js
const Post = require('../models/post');
const Comment = require('../models/comment');
const Reply = require("../models/reply")
const User = require("../models/user")

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId, text, author } = req.body;
    const comment = new Comment({ text, author });
    await comment.save();
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment._id } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addReply = async (req, res) => {
  try {
    const { commentId, text, author } = req.body;
    const reply = new Reply({ text, author });
    await reply.save();
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $push: { replies: reply._id } },
      { new: true }
    );
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add controllers for updating likes, fetching posts, comments, etc.




