require('../../moduleAliases');
const appDatabase = require("@database/app.database");
const { DEFAULT_ROLES } = require('@constants/app.constant');
const permissionConstant = require('@constants/permission.constant');

async function entityCustomerPermissions() {
    try {
        console.log("=== Database customer Entity Permission Groups Initialization Started ===");
        const grantPermissionCodes = [
            permissionConstant.user.me.password.change.code,
            permissionConstant.user.me.update.code,
            permissionConstant.user.subsidiary.views.code,
            permissionConstant.user.subsidiary.view.code,
            permissionConstant.user.subsidiary.address.views.code,
            permissionConstant.user.subsidiary.address.view.code,
            permissionConstant.user.subsidiary.contact.views.code,
            permissionConstant.user.subsidiary.contact.view.code,
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
            permissionConstant.user.me.password.change.code,
            permissionConstant.user.me.update.code,
            permissionConstant.user.subsidiary.views.code,
            permissionConstant.user.subsidiary.view.code,
            permissionConstant.user.subsidiary.address.views.code,
            permissionConstant.user.subsidiary.address.view.code,
            permissionConstant.user.subsidiary.contact.views.code,
            permissionConstant.user.subsidiary.contact.view.code,
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
        const permissionCodes = [
            permissionConstant.user.subsidiary.status.code,
            permissionConstant.user.subsidiary.update.code,
            permissionConstant.user.subsidiary.rbac.grantPermission.code,
            permissionConstant.user.subsidiary.rbac.revokePermission.code,
            permissionConstant.user.subsidiary.rbac.role.update.code,
            permissionConstant.user.subsidiary.views.code,
            permissionConstant.user.subsidiary.view.code,
            permissionConstant.user.subsidiary.address.views.code,
            permissionConstant.user.subsidiary.address.view.code,
            permissionConstant.user.subsidiary.contact.views.code,
            permissionConstant.user.subsidiary.contact.view.code
        ];
        const permissions = await appDatabase.Permission.find({});
        await appDatabase.EntityPermissionGroup.findOneAndUpdate({
            name: DEFAULT_ROLES.CUSTOMER
        }, {
            name: DEFAULT_ROLES.CUSTOMER,
            grantPermissions: permissions.filter(x => grantPermissionCodes.includes(x.code)).map(y => y._id),
            revokePermissions: permissions.filter(x => revokePermissionCodes.includes(x.code)).map(y => y._id),
            relationshipPermissions: [{
                relationship: DEFAULT_ROLES.SUBSIDIARY,
                permissions: permissions.filter(x => permissionCodes.includes(x.code)).map(y => y._id)
            }],
            isActive: true,
            description: DEFAULT_ROLES.CUSTOMER
        }, { upsert: true });
        console.log("All customer Entity Permission Groups created/sync with their permissions");
    } catch (error) {
        console.error("Error during database customer Entity Permission Groups setup:", error);
    } finally {
        process.exit(0);
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    entityCustomerPermissions();
}

module.exports = entityCustomerPermissions;