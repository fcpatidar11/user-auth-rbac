const express = require("express");
const router = express.Router();
const roleController = require("@controllers/role.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.post("/", authMiddleware.extractHeaders, roleController.createRole);

router.put("/:roleId", authMiddleware.extractHeaders, roleController.updateRole);

router.get("/", authMiddleware.extractHeaders, roleController.fetchRoles);

router.get("/:roleId", authMiddleware.extractHeaders, roleController.fetchRoleById);

router.patch("/:roleId/status", authMiddleware.extractHeaders, roleController.updateRoleStatus);

module.exports = router;