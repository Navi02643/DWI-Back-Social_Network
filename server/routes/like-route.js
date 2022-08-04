const express = require("express");
const Like = require("../models/like-model");
const app = express();


//Obtener like:
app.get("/", async (req, res) => {
    try {
      const likes = await Like.find({ });
      res.json(likes);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  //Crear like:
app.post("/", async (req, res) => {
    try {
      const like = new Like({
        like: req.body.like,
      });
      const likeSaved = await like.save();
      res.json(likeSaved);
    } catch (error) {
      res.status(500).send(error);
    }
  });