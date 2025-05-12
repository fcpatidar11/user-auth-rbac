const express = require("express");
const router = express.Router();
const userController = require("@controllers/user.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.put("/password/change", authMiddleware.extractHeaders, userController.changePassword);

router.get("/dashboard", authMiddleware.extractHeaders, userController.fetchDashboardOverview);

router.get("/me", authMiddleware.extractHeaders, userController.fetchProfile);

router.put("/me", authMiddleware.extractHeaders, userController.updateProfile);

router.get("/activity/logs", authMiddleware.extractHeaders, userController.fetchUserActivityLogs);

router.get("/activity/logs/me", authMiddleware.extractHeaders, userController.fetchProfileActivityLogs);

router.post("/:userType", authMiddleware.extractHeaders, userController.createUser);

router.put("/:userType/:userId", authMiddleware.extractHeaders, userController.updateUser);

router.patch("/:userType/:userId/status", authMiddleware.extractHeaders, userController.updateUserStatus);

router.post("/:userType/:userId/invitation/resend", authMiddleware.extractHeaders, userController.resendUserInvitation);

router.get("/:userType", authMiddleware.extractHeaders, userController.fetchUsers);

router.get("/:userType/:userId", authMiddleware.extractHeaders, userController.fetchUserById);

module.exports = router;