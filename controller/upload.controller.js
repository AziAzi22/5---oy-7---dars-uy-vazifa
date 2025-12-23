const upload = require("../utils/multer");
require("dotenv").config();
const PORT = process.env.PORT;

// single upload

const singleUpload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "file not uploaded",
      });
    }
    res.status(201).json({
      filePath: "http://localhost:" + PORT + "/images/" + req.file.filename,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const multiUpload = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "files not uploaded",
      });
    }
    res.status(201).json({
      filePath: req.files.map(
        (img) => "http://localhost:" + PORT + "/images/" + img.filename
      ),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  singleUpload,
  multiUpload,
};