const express = require("express");
const router = express.Router();
const userController = require("@controllers/user.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.get("/me", authMiddleware.extractHeaders, userController.fetchProfileActivityLogs);

router.get("/", authMiddleware.extractHeaders, userController.fetchUserActivityLogs);

module.exports = router;
