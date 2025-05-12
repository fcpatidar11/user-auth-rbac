const express = require("express");
const router = express.Router();
const userAddressController = require("@src/api/controllers/userAddress.controller");
const authMiddleware = require("@middlewares/auth.middleware");

router.post("/me", authMiddleware.extractHeaders, userAddressController.createProfileAddress);

router.put("/me/:addressId", authMiddleware.extractHeaders, userAddressController.updateProfileAddress);

router.delete("/me/:addressId", authMiddleware.extractHeaders, userAddressController.deleteProfileAddress);

router.get("/me/:addressId", authMiddleware.extractHeaders, userAddressController.fetchProfileAddress);

router.get("/me", authMiddleware.extractHeaders, userAddressController.fetchProfileAddresses);

router.post("/:userType/:userId", authMiddleware.extractHeaders, userAddressController.createUserAddress);

router.put("/:userType/:userId/:addressId", authMiddleware.extractHeaders, userAddressController.updateUserAddress);

router.delete("/:userType/:userId/:addressId", authMiddleware.extractHeaders, userAddressController.deleteUserAddress);

router.get("/:userType/:userId/:addressId", authMiddleware.extractHeaders, userAddressController.fetchUserAddress);

router.get("/:userType/:userId", authMiddleware.extractHeaders, userAddressController.fetchUserAddresses);


module.exports = router;