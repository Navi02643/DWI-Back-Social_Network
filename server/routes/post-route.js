const express = require("express");
const Post = require("../models/post-model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ deleted: false });
    res.json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    });
    const postSaved = await post.save();
    res.json(postSaved);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
