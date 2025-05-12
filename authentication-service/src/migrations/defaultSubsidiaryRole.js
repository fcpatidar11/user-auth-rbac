require('../../moduleAliases');
const appDatabase = require("@database/app.database");
const { DEFAULT_ROLES } = require('@constants/app.constant');
const permissionConstant = require('@constants/permission.constant');

async function defaultSubsidiaryRole() {
    try {
        console.log("=== Database Default subsidiary role Initialization Started ===");
        const permissionCodes = [
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
        // Create Subsidiary role
        let subsidiaryRole = await appDatabase.Role.findOneAndUpdate({ name: DEFAULT_ROLES.SUBSIDIARY }, {
            name: DEFAULT_ROLES.SUBSIDIARY,
            group: roleGroup._id,
            isSystem: true,
            isActive: true,
            permissions: permissions.map(y => y._id),
            description: "Role for managing and control permission of resources specific to a subsidiary or branch organization with controlled, compartmentalized permission."
        }, { upsert: true });

        console.log("All default subsidiary role created/sync with their permissions");

    } catch (error) {
        console.error("Error during database default subsidiary role setup:", error);
    } finally {
        process.exit(0);
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    defaultSubsidiaryRole();
}

module.exports = defaultSubsidiaryRole;