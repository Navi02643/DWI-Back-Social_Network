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