const express = require("express");
const router = express.Router();
const Mahasiswa = require("../models/Mahasiswa");
const verifyToken = require("../routes/verifyToken");
const response = require("../config/response");

// create (post)
router.post("/", verifyToken, async (req, res) => {
  const mahasiswaPost = new Mahasiswa({
    nama: req.body.nama,
    alamat: req.body.alamat,
  });
  try {
    const mahasiswa = await mahasiswaPost.save();
    // res.json(mahasiswa);
    response(201, mahasiswa, `Data Berhasil Di Tambah`, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// read (get)
router.get("/", async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.find();
    response(200, mahasiswa, "Mendapatkan Semua Data", res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:mahasiswaId", verifyToken, async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findById(req.params.mahasiswaId);
    response(200, mahasiswa, `Berhasil Mendapatkan Data`, res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:mahasiswaId", verifyToken, async (req, res) => {
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
    response(200, mahasiswa, `Data Berhasil Di Update`, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete
router.delete("/:mahasiswaId", verifyToken, async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.deleteOne({
      _id: req.params.mahasiswaId,
    });
    response(200, mahasiswa, `Data Berhasil Di Hapus`, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
