const express = require("express");
const router = express.Router();
const permissionController = require("@controllers/permission.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.post("/", authMiddleware.extractHeaders, permissionController.createEntityPermissionGroup);

router.put("/:entityId", authMiddleware.extractHeaders, permissionController.updateEntityPermissionGroup);

router.get("/", authMiddleware.extractHeaders, permissionController.fetchEntityPermissionGroups);

router.get("/:entityId", authMiddleware.extractHeaders, permissionController.fetchEntityPermissionGroupById);

router.patch("/:entityId/status", authMiddleware.extractHeaders, permissionController.updateEntityPermissionGroupStatus);

module.exports = router;