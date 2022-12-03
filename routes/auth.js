const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation } = require("../config/validation");

// register auth
router.post("/v1/register", async (req, res) => {
  // mengvalidasi inputan user harus sesuai yang ditentukan
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).json({
      status: res.statusCode,
      message: error.details[0].message,
    });

  // mengvalidasi email jika email sudah terdaftar
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({
      status: res.statusCode,
      message: "Email Sudah Terdaftar",
    });
  // hash padsword
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    nama: req.body.nama,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const saveUser = await user.save();
    res.json(saveUser);
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: "Gagal Membuat User Baru",
    });
  }
});

// login
router.post("/v1/login", async (req, res) => {
  // cek email di database
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({
      status: res.statusCode,
      message: "Email Anda Salah",
    });

  // cek password
  const validPwd = await bcrypt.compare(req.body.password, user.password);
  if (!validPwd)
    return res.status(400).json({
      status: res.statusCode,
      message: "Password Anda Salah",
    });
  // membuat token jwt
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header("Authorization", token).json({
    token: token,
  });
});
module.exports = router;
