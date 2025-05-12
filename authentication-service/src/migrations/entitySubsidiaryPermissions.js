require('../../moduleAliases');
const appDatabase = require("@database/app.database");
const { DEFAULT_ROLES } = require('@constants/app.constant');
const permissionConstant = require('@constants/permission.constant');

async function entitySubsidiaryPermissions() {
    try {
        console.log("=== Database Subsidiary Entity Permission Groups Initialization Started ===");
        const grantPermissionCodes = [
            permissionConstant.user.me.password.change.code,
            permissionConstant.user.me.update.code,
            permissionConstant.user.customer.views.code,
            permissionConstant.user.customer.view.code,
            permissionConstant.user.customer.address.views.code,
            permissionConstant.user.customer.address.view.code,
            permissionConstant.user.customer.contact.views.code,
            permissionConstant.user.customer.contact.view.code,
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
            permissionConstant.user.customer.views.code,
            permissionConstant.user.customer.view,
            permissionConstant.user.customer.address.views.code,
            permissionConstant.user.customer.address.view.code,
            permissionConstant.user.customer.contact.views.code,
            permissionConstant.user.customer.contact.view.code,
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
        // Create Subsidiary Entity permissions
        await appDatabase.EntityPermissionGroup.findOneAndUpdate({
            name: DEFAULT_ROLES.SUBSIDIARY
        }, {
            name: DEFAULT_ROLES.SUBSIDIARY,
            grantPermissions: permissions.filter(x => grantPermissionCodes.includes(x.code)).map(y => y._id),
            revokePermissions: permissions.filter(x => revokePermissionCodes.includes(x.code)).map(y => y._id),
            relationshipPermissions: [],
            isActive: true,
            description: DEFAULT_ROLES.SUBSIDIARY
        }, { upsert: true });
        console.log("All Subsidiary Entity Permission Groups created/sync with their permissions");
    } catch (error) {
        console.error("Error during database Subsidiary Entity Permission Groups setup:", error);
    } finally {
        process.exit(0);
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    entitySubsidiaryPermissions();
}

module.exports = entitySubsidiaryPermissions;