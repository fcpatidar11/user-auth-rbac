const express = require("express");
const router = express.Router();
const roleController = require("@controllers/role.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.post("/groups/", authMiddleware.extractHeaders, roleController.createRoleGroup);

router.put("/groups/:groupId", authMiddleware.extractHeaders, roleController.updateRoleGroup);

router.get("/groups/", authMiddleware.extractHeaders, roleController.fetchRoleGroups);

router.get("/groups/:groupId", authMiddleware.extractHeaders, roleController.fetchRoleGroupById);

router.patch("/groups/:groupId/status", authMiddleware.extractHeaders, roleController.updateRoleGroupStatus);

module.exports = router;