const appConfig = require("@configs/app.config");
const mongoose = require('mongoose');
const userSchema = require("@database/schemas/user.schema");
const roleSchema = require("@database/schemas/role.schema");
const permissionSchema = require("@database/schemas/permission.schema");
const roleGroupSchema = require("@database/schemas/roleGroup.schema");
const permissionGroupSchema = require("@database/schemas/permissionGroup.schema");
const userRelationshipSchema = require("@database/schemas/userRelationship.schema");
const userActivityLogSchema = require("@lib/database/schemas/userActivityLog.schema");
const EntityPermissionGroupSchema = require("@lib/database/schemas/entityPermissionGroup.schema");
const UserAddressSchema = require("@lib/database/schemas/userAddress.schema");
const UserContactSchema = require("@lib/database/schemas/userContact.schema");

mongoose.connect(appConfig.AUTHENTICATION_SERVICE_DATABASE_URL);

mongoose.connection.on('error', (error) => {
    console.error('❌ MongoDB connection error in authentication service:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('❌ MongoDB disconnected in authentication service');
});

module.exports = {
    RoleGroup: mongoose.model("role_groups", roleGroupSchema),
    PermissionGroup: mongoose.model("permission_groups", permissionGroupSchema),
    Role: mongoose.model("roles", roleSchema),
    Permission: mongoose.model("permissions", permissionSchema),
    EntityPermissionGroup: mongoose.model("entity_permission_groups", EntityPermissionGroupSchema),
    User: mongoose.model("users", userSchema),
    UserRelationship: mongoose.model("user_relationships", userRelationshipSchema),
    UserActivityLog: mongoose.model("user_activity_logs", userActivityLogSchema),
    UserAddress: mongoose.model("user_addresses", UserAddressSchema),
    UserContact: mongoose.model("user_contacts", UserContactSchema),
}
