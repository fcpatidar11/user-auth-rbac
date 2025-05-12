const express = require("express");
const router = express.Router();
const userRelationshipController = require("@controllers/userRelationship.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.post("/:userType/:parentId/:childId", authMiddleware.extractHeaders, userRelationshipController.addUserRelationship);

router.delete("/:userType/:parentId/:childId", authMiddleware.extractHeaders, userRelationshipController.removeUserRelationship);

router.get("/:userType/:parentId/:childId", authMiddleware.extractHeaders, userRelationshipController.fetchUserRelationship);

router.put("/:userType/:parentId/:childId", authMiddleware.extractHeaders, userRelationshipController.updateUserRelationshipPermissions);

module.exports = router;