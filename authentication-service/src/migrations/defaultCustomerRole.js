require('../../moduleAliases');
const appDatabase = require("@database/app.database");
const { DEFAULT_ROLES } = require('@constants/app.constant');
const permissionConstant = require('@constants/permission.constant');

async function defaultCustomerRole() {
    try {
        console.log("=== Database Default customer role Initialization Started ===");
        const permissionCodes = [
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
        // Create Customer role
        let customerRole = await appDatabase.Role.findOneAndUpdate({ name: DEFAULT_ROLES.CUSTOMER }, {
            name: DEFAULT_ROLES.CUSTOMER,
            group: roleGroup._id,
            permissions: permissions.map(y => y._id),
            isSystem: true,
            isActive: true,
            description: "End-user role with permission limited to specific services, personal information, and relevant system features."
        }, { upsert: true });

        console.log("All default customer role created/sync with their permissions");

    } catch (error) {
        console.error("Error during database default customer role setup:", error);
    } finally {
        process.exit(0);
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    defaultCustomerRole();
}

module.exports = defaultCustomerRole;