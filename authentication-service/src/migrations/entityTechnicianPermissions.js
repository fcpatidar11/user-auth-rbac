require('../../moduleAliases');
const appDatabase = require("@database/app.database");
const { DEFAULT_ROLES } = require('@constants/app.constant');
const permissionConstant = require('@constants/permission.constant');

async function entityTechnicianPermissions() {
    try {
        console.log("=== Database Technician entity Permission Groups Initialization Started ===");
        const grantPermissionCodes = [
            permissionConstant.permission.group.views.code,
            permissionConstant.permission.group.view.code,
            permissionConstant.permission.views.code,
            permissionConstant.permission.view.code,
            permissionConstant.user.me.password.change.code,
            permissionConstant.user.me.update.code,
            permissionConstant.user.customer.view.code,
            permissionConstant.user.customer.address.views.code,
            permissionConstant.user.customer.address.view.code,
            permissionConstant.user.customer.contact.views.code,
            permissionConstant.user.customer.contact.view.code,
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
            permissionConstant.permission.group.views.code,
            permissionConstant.permission.group.view.code,
            permissionConstant.permission.views.code,
            permissionConstant.permission.view.code,
            permissionConstant.user.me.password.change.code,
            permissionConstant.user.me.update.code,
            permissionConstant.user.customer.view.code,
            permissionConstant.user.customer.address.views.code,
            permissionConstant.user.customer.address.view.code,
            permissionConstant.user.customer.contact.views.code,
            permissionConstant.user.customer.contact.view.code,
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
        const permissions = await appDatabase.Permission.find({});
        await appDatabase.EntityPermissionGroup.findOneAndUpdate({
            name: DEFAULT_ROLES.TECHNICIAN
        }, {
            name: DEFAULT_ROLES.TECHNICIAN,
            grantPermissions: permissions.filter(x => grantPermissionCodes.includes(x.code)).map(y => y._id),
            revokePermissions: permissions.filter(x => revokePermissionCodes.includes(x.code)).map(y => y._id),
            relationshipPermissions: [],
            isActive: true,
            description: DEFAULT_ROLES.TECHNICIAN
        }, { upsert: true });
        console.log("All Technician Entity Permission Groups created/sync with their permissions");
    } catch (error) {
        console.error("Error during database Technician Entity Permission Groups setup:", error);
    } finally {
        process.exit(0);
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    entityTechnicianPermissions();
}

module.exports = entityTechnicianPermissions;