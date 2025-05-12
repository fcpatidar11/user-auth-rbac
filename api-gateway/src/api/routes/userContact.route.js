const express = require("express");
const router = express.Router();
const userContactController = require("@src/api/controllers/userContact.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.post("/me", authMiddleware.extractHeaders, userContactController.createProfileContact);

router.put("/me/:contactId", authMiddleware.extractHeaders, userContactController.updateProfileContact);

router.delete("/me/:contactId", authMiddleware.extractHeaders, userContactController.deleteProfileContact);

router.get("/me/:contactId", authMiddleware.extractHeaders, userContactController.fetchProfileContact);

router.get("/me", authMiddleware.extractHeaders, userContactController.fetchProfileContacts);

router.post("/:userType/:userId", authMiddleware.extractHeaders, userContactController.createUserContact);

router.put("/:userType/:userId/:contactId", authMiddleware.extractHeaders, userContactController.updateUserContact);

router.delete("/:userType/:userId/:contactId", authMiddleware.extractHeaders, userContactController.deleteUserContact);

router.get("/:userType/:userId/:contactId", authMiddleware.extractHeaders, userContactController.fetchUserContact);

router.get("/:userType/:userId", authMiddleware.extractHeaders, userContactController.fetchUserContacts);

module.exports = router;