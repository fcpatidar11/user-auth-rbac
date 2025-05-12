const express = require('express');
const router = express.Router();

// Import route modules
const routes = {
  auth: require('@routes/auth.route'),
  user: require('@routes/user.route'),
  userAuthorizationGuard: require('@src/api/routes/userAuthorizationGuard.route'),
  userContact: require('@routes/userContact.route'),
  userAddress: require('@src/api/routes/userAddress.route'),
  role: require('@routes/role.route'),
  roleGroup: require('@routes/roleGroup.route'),
  permission: require('@routes/permission.route'),
  permissionEntity: require('@routes/permissionEntity.route'),
  permissionGroup: require('@routes/permissionGroup.route'),
  userRelationship: require('@routes/userRelationship.route'),
  file: require('@routes/file.route'),
  activity: require('@routes/activityLog.route')
};

// API version prefix
const API_VERSION = '/v1';

// Register routes
router.use(`${API_VERSION}/`, routes.auth);
router.use(`${API_VERSION}/users`, routes.user);
router.use(`${API_VERSION}/authz`, routes.userAuthorizationGuard);
router.use(`${API_VERSION}/contacts`, routes.userContact);
router.use(`${API_VERSION}/addresses`, routes.userAddress);
router.use(`${API_VERSION}/roles/groups`, routes.role);
router.use(`${API_VERSION}/roles`, routes.role);
router.use(`${API_VERSION}/permissions/entities`, routes.permissionEntity);
router.use(`${API_VERSION}/permissions/groups`, routes.permissionGroup);
router.use(`${API_VERSION}/permissions`, routes.permission);
router.use(`${API_VERSION}/relationships`, routes.userRelationship);
router.use(`${API_VERSION}/files`, routes.file);
router.use(`${API_VERSION}/activity/logs`, routes.activity);

module.exports = router;