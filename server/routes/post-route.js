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
      ubication: req.body.ubication,
      date: req.body.date,
      // image: req.body.image
    });
    const postSaved = await post.save();
    res.json(postSaved);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      ubication: req.body.ubication,
      date: req.body.date,
      // image: req.body.image
      updatedAt: Date.now(),
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/complete/:id", async (req, res) => {
  try {
    const currentPost = await Post.findById(req.params.id);
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      completed: !currentPost.completed,
      updatedAt: Date.now(),
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

 
router.patch("/delete/:id", async (req, res) => {
  try {
    const postDeleted = await Post.findByIdAndUpdate(req.params.id, {
      deleted: true,
      deletedAt: Date.now(),
    });
    res.json(postDeleted);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.deleteOne({ _id: req.params.id });
    res.json(deletedPost);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
