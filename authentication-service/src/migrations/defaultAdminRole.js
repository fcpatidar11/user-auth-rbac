require('../../moduleAliases');
const appDatabase = require("@database/app.database");
const { DEFAULT_ROLES } = require('@constants/app.constant');
const permissionConstant = require('@constants/permission.constant');

async function defaultAdminRole() {
    try {
        console.log("=== Database Default Admin Role Initialization Started ===");
        const permissionCodes = [
            permissionConstant.user.customer.rbac.revokePermission.update.code,
            permissionConstant.user.subsidiary.rbac.grantPermission.update.code,
            permissionConstant.user.subsidiary.rbac.revokePermission.update.code,
            permissionConstant.user.subsidiary.rbac.role.update.code,
            permissionConstant.user.customer.rbac.grantPermission.update.code,
            permissionConstant.user.customer.rbac.role.update.code,
            permissionConstant.user.partner.rbac.grantPermission.update.code,
            permissionConstant.user.partner.rbac.revokePermission.update.code,
            permissionConstant.user.partner.rbac.role.update.code,
            permissionConstant.entityPermissionGroup.status.code,
            permissionConstant.entityPermissionGroup.views.code,
            permissionConstant.entityPermissionGroup.view.code,
            permissionConstant.permission.group.views.code,
            permissionConstant.permission.group.view.code,
            permissionConstant.permission.views.code,
            permissionConstant.permission.view.code,
            permissionConstant.role.group.views.code,
            permissionConstant.role.group.view.code,
            permissionConstant.role.views.code,
            permissionConstant.role.view.code,
            permissionConstant.user.me.password.change.code,
            permissionConstant.user.me.update.code,
            permissionConstant.user.subsidiary.views.code,
            permissionConstant.user.subsidiary.view.code,
            permissionConstant.user.subsidiary.status.code,
            permissionConstant.user.subsidiary.update.code,
            permissionConstant.user.subsidiary.create.code,
            permissionConstant.user.customer.relationships.subsidiary.code,
            permissionConstant.user.customer.views.code,
            permissionConstant.user.customer.view.code,
            permissionConstant.user.customer.status.code,
            permissionConstant.user.customer.update.code,
            permissionConstant.user.customer.create.code,
            permissionConstant.user.partner.views.code,
            permissionConstant.user.partner.view.code,
            permissionConstant.user.partner.status.code,
            permissionConstant.user.partner.update.code,
            permissionConstant.user.partner.create.code,
            permissionConstant.user.technician.rbac.role.update.code,
            permissionConstant.user.technician.rbac.revokePermission.update.code,
            permissionConstant.user.technician.rbac.grantPermission.update.code,
            permissionConstant.user.technician.activityLogs.views.code,
            permissionConstant.user.technician.views.code,
            permissionConstant.user.technician.view.code,
            permissionConstant.user.technician.status.code,
            permissionConstant.user.technician.update.code,
            permissionConstant.user.technician.create.code,
            permissionConstant.user.partner.address.views.code,
            permissionConstant.user.partner.address.view.code,
            permissionConstant.user.partner.address.delete.code,
            permissionConstant.user.partner.address.update.code,
            permissionConstant.user.partner.address.create.code,
            permissionConstant.user.partner.contact.views.code,
            permissionConstant.user.partner.contact.view.code,
            permissionConstant.user.partner.contact.delete.code,
            permissionConstant.user.partner.contact.update.code,
            permissionConstant.user.partner.contact.create.code,
            permissionConstant.user.customer.address.views.code,
            permissionConstant.user.customer.address.view.code,
            permissionConstant.user.customer.address.delete.code,
            permissionConstant.user.customer.address.update.code,
            permissionConstant.user.customer.address.create.code,
            permissionConstant.user.customer.contact.views.code,
            permissionConstant.user.customer.contact.view.code,
            permissionConstant.user.customer.contact.delete.code,
            permissionConstant.user.customer.contact.update.code,
            permissionConstant.user.customer.contact.create.code,
            permissionConstant.user.technician.address.views.code,
            permissionConstant.user.technician.address.view.code,
            permissionConstant.user.technician.address.delete.code,
            permissionConstant.user.technician.address.update.code,
            permissionConstant.user.technician.address.create.code,
            permissionConstant.user.technician.contact.views.code,
            permissionConstant.user.technician.contact.view.code,
            permissionConstant.user.technician.contact.delete.code,
            permissionConstant.user.technician.contact.update.code,
            permissionConstant.user.technician.contact.create.code,
            permissionConstant.user.subsidiary.address.views.code,
            permissionConstant.user.subsidiary.address.view.code,
            permissionConstant.user.subsidiary.address.delete.code,
            permissionConstant.user.subsidiary.address.update.code,
            permissionConstant.user.subsidiary.address.create.code,
            permissionConstant.user.subsidiary.contact.views.code,
            permissionConstant.user.subsidiary.contact.view.code,
            permissionConstant.user.subsidiary.contact.delete.code,
            permissionConstant.user.subsidiary.contact.update.code,
            permissionConstant.user.subsidiary.contact.create.code,
            permissionConstant.user.me.address.views.code,
            permissionConstant.user.me.address.view.code,
            permissionConstant.user.me.address.delete.code,
            permissionConstant.user.me.address.update.code,
            permissionConstant.user.me.address.create.code,
            permissionConstant.user.me.contact.views.code,
            permissionConstant.user.me.contact.view.code,
            permissionConstant.user.me.contact.delete.code,
            permissionConstant.user.me.contact.update.code,
            permissionConstant.user.me.contact.create.code
        ];
        const permissions = await appDatabase.Permission.find({ code: { $in: permissionCodes } });

        // Step 1: Create/Sync system role group
        let roleGroup = await appDatabase.RoleGroup.findOneAndUpdate({ name: "System Level Default Roles" }, {
            name: "System Level Default Roles",
            description: "This group manages the overall system default system-level roles.",
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }, { upsert: true });

        // Step 2: Create roles with appropriate permissions
        // Create Admin role
        let adminRole = await appDatabase.Role.findOneAndUpdate({ name: DEFAULT_ROLES.ADMIN }, {
            name: DEFAULT_ROLES.ADMIN,
            group: roleGroup._id,
            permissions: permissions.map(y => y._id),
            isSystem: true,
            isActive: true,
            description: "Administrative role with extensive system permission, responsible for day-to-day management of system users, content, and operational settings."
        }, { upsert: true });

        console.log("All Default Admin Role created/sync with their permissions");

    } catch (error) {
        console.error("Error during database Default Admin Role setup:", error);
    } finally {
        process.exit(0);
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    defaultAdminRole();
}

module.exports = defaultAdminRole;