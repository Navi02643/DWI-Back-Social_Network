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
      return res.status(200).send({
        err: true,
        resp: 200,
        msg: "El correo ya se registro",
      });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.pass, salt, (err, hash) => {
        if (err) throw err;
        user.pass = hash;
        const newuser = user.save();
        if (newuser.length < 0) {
          return res.status(200).send({
            err: true,
            resp: 200,
            msg: "El usuario no se registro",
          });
        } else {
          return res.status(200).send({
            err: false,
            resp: 200,
            msg: "Usuario registrado",
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
              msg: `Bienvenido ${user.name} ${user.firstlastname} ${user.secondlastname}`,
              userdata: user
            });
          } else {
            return res.status(200).send({
              estatus: 200,
              err: true,
              msg: "Correo o contraseña incorrectos.",
            });
          }
        });
      } else {
        return res.status(200).send({
          estatus: 200,
          err: true,
          msg: "Correo o contraseña incorrectos.",
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

app.put("/", async (req, res) => {
  try {
    const iduser = req.query.iduser;
    const { passant, passnew } = req.body;
    usermodel.findById(iduser).then((user) => {
      if (user) {
        bcrypt.compare(passant, user.pass).then((match) => {
          if (match == true) {
            bcrypt.hash(passnew, 10, (err, hash) => {
              let newpasshash = hash;
              usermodel
                .findByIdAndUpdate(
                  { _id: iduser },
                  { $set: { pass: newpasshash } }
                )
                .then((resmongo) => {
                  if (resmongo) {
                    return res.status(200).send({
                      estatus: "200",
                      err: false,
                      msg: "Se cambio la contraseña",
                    });
                  } else {
                    return res.status(500).send({
                      estatus: "500",
                      err: true,
                      msg: "Error",
                    });
                  }
                });
            });
          } else {
            return res.status(200).send({
              estatus: "200",
              err: true,
              msg: "Las contraseñas no coinciden",
            });
          }
        });
      } else {
        return res.status(200).send({
          estatus: "200",
          err: true,
          msg: "El usuario no existe",
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
