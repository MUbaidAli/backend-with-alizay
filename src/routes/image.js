const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image")
const upload = require("../middlewares/upload")

router.post("/upload", upload.single("image"), imageController)

module.exports = router