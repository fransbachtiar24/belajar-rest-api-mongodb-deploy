const express = require("express");
const router = express.Router();
const Mahasiswa = require("../models/Mahasiswa");
const verifyToken = require("../routes/verifyToken");

// create (post)
router.post("/", async (req, res) => {
  const mahasiswaPost = new Mahasiswa({
    nama: req.body.nama,
    alamat: req.body.alamat,
  });
  try {
    const mahasiswa = await mahasiswaPost.save();
    // res.json(mahasiswa);
    res.status(201).json(mahasiswa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// read (get)
router.get("/", verifyToken, async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.find();
    res.json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:mahasiswaId", async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findById(req.params.mahasiswaId);
    res.json(mahasiswa);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:mahasiswaId", async (req, res) => {
  // tampung inputan untuk value yang akan di edit

  const data = {
    nama: req.body.nama,
    alamat: req.body.alamat,
  };

  try {
    const mahasiswa = await Mahasiswa.updateOne(
      { _id: req.params.mahasiswaId },
      data
    );
    // response
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete
router.delete("/:mahasiswaId", async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.deleteOne({
      _id: req.params.mahasiswaId,
    });
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
