const express = require("express");
const router = express.Router();
const authController = require("@controllers/auth.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.post("/login", authMiddleware.extractHeaders, authController.login);

router.post("/password/forgot", authMiddleware.extractHeaders, authController.forgotPassword);

router.post("/password/reset", authMiddleware.extractHeaders, authController.resetPassword);

router.post("/invitation/accept", authMiddleware.extractHeaders, authController.acceptUserInvitation);

router.post("/invitation/info", authMiddleware.extractHeaders, authController.fetchUserInvitation);

module.exports = router;