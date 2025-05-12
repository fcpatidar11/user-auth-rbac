const express = require("express");
const router = express.Router();
const permissionController = require("@controllers/permission.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.post("/", authMiddleware.extractHeaders, permissionController.createPermission);

router.put("/:permissionId", authMiddleware.extractHeaders, permissionController.updatePermission);

router.get("/", authMiddleware.extractHeaders, permissionController.fetchPermissions);

router.get("/:permissionId", authMiddleware.extractHeaders, permissionController.fetchPermissionById);

router.patch("/:permissionId/status", authMiddleware.extractHeaders, permissionController.updatePermissionStatus);

module.exports = router;