const express = require("express");
const router = express.Router();
const fileController = require("@controllers/file.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.post("/upload/:type", authMiddleware.extractHeaders, fileController.uploadFiles);

module.exports = router;