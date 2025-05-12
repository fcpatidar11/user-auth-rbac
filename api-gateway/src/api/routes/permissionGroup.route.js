const express = require("express");
const router = express.Router();
const permissionController = require("@controllers/permission.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.post("/", authMiddleware.extractHeaders, permissionController.createPermissionGroup);

router.put("/:groupId", authMiddleware.extractHeaders, permissionController.updatePermissionGroup);

router.get("/", authMiddleware.extractHeaders, permissionController.fetchPermissionGroups);

router.get("/:groupId", authMiddleware.extractHeaders, permissionController.fetchPermissionGroupById);

router.patch("/:groupId/status", authMiddleware.extractHeaders, permissionController.updatePermissionGroupStatus);

module.exports = router;