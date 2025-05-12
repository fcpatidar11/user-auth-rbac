require('../../moduleAliases');
const appDatabase = require("@database/app.database");
const { DEFAULT_ROLES } = require('@constants/app.constant');
const permissionConstant = require('@constants/permission.constant');

async function entityPartnerPermissions() {
    try {
        console.log("=== Database Partner Entity Permission Groups Initialization Started ===");
        const grantPermissionCodes = [
            permissionConstant.user.customer.rbac.revokePermission.update.code,
            permissionConstant.user.subsidiary.rbac.grantPermission.update.code,
            permissionConstant.user.subsidiary.rbac.revokePermission.update.code,
            permissionConstant.user.subsidiary.rbac.role.update.code,
            permissionConstant.user.customer.rbac.grantPermission.update.code,
            permissionConstant.user.customer.rbac.role.update.code,
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
        const revokePermissionCodes = [
            permissionConstant.user.customer.rbac.revokePermission.update.code,
            permissionConstant.user.subsidiary.rbac.grantPermission.update.code,
            permissionConstant.user.subsidiary.rbac.revokePermission.update.code,
            permissionConstant.user.subsidiary.rbac.role.update.code,
            permissionConstant.user.customer.rbac.grantPermission.update.code,
            permissionConstant.user.customer.rbac.role.update.code,
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
        const permissions = await appDatabase.Permission.find({});
        // Create Partner Entity permissions
        await appDatabase.EntityPermissionGroup.findOneAndUpdate({
            name: DEFAULT_ROLES.PARTNER
        }, {
            name: DEFAULT_ROLES.PARTNER,
            grantPermissions: permissions.filter(x => grantPermissionCodes.includes(x.code)).map(y => y._id),
            revokePermissions: permissions.filter(x => revokePermissionCodes.includes(x.code)).map(y => y._id),
            relationshipPermissions: [],
            isActive: true,
            description: DEFAULT_ROLES.PARTNER
        }, { upsert: true });
        console.log("All Partner Entity Permission Groups created/sync with their permissions");
    } catch (error) {
        console.error("Error during database Partner Entity Permission Groups setup:", error);
    } finally {
        process.exit(0);
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    entityPartnerPermissions();
}

module.exports = entityPartnerPermissions;