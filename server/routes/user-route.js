const usermodel = require("../models/user-model");
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();

app.post("/", async (req, res) => {
  try {
    const user = new usermodel(req.body);
    let err = user.validateSync();
    if (err) {
      return res.status(400).json({
        err: false,
        resp: 400,
        msg: "Error",
        cont: {
          err,
        },
      });
    }
    const userfind = await usermodel.findOne({
      email: user.email,
    });
    if (userfind) {
      return res.status(200).json({
        err: true,
        resp: 200,
        msg: "The email is registered in another account",
      });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.pass, salt, (err, hash) => {
        if (err) throw err;
        user.pass = hash;
        const newuser = user.save();
        if (newuser.length < 0) {
          return res.status(200).send({
            err: false,
            resp: 200,
            msg: "User not registered",
          });
        } else {
          return res.status(200).send({
            err: true,
            resp: 200,
            msg: "User registered",
          });
        }
      });
    });
  } catch (err) {
    return res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;
    usermodel.findOne({ email }).then((user) => {
      if (user) {
        bcrypt.compare(pass, user.pass).then((match) => {
          if (match) {
            return res.status(200).send({
              estatus: 200,
              err: false,
              msg: `Welcome ${user.name} ${user.firstlastname} ${user.secondlastname}`,
            });
          } else {
            return res.status(200).send({
              estatus: 200,
              err: false,
              msg: "Incorrect email or password",
            });
          }
        });
      } else {
        return res.status(200).send({
          estatus: 200,
          err: false,
          msg: "Incorrect email or password",
        });
      }
    });
  } catch (err) {
    return res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

module.exports = app;
