const express = require("express");
const router = express.Router();
const userAuthorizationGuardController = require("@src/api/controllers/userAuthorizationGuard.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.put("/:userType/:userId/roles", authMiddleware.extractHeaders, userAuthorizationGuardController.updateUserRoles);

router.put("/:userType/:userId/permissions/grant", authMiddleware.extractHeaders, userAuthorizationGuardController.updateUserPermissions);

router.put("/:userType/:userId/permissions/revoke", authMiddleware.extractHeaders, userAuthorizationGuardController.revokeUserPermissions);

module.exports = router;