require('../../moduleAliases');
const appDatabase = require("@database/app.database");
const { DEFAULT_ROLES } = require('@constants/app.constant');

async function entitySuperAdminPermissions() {
    try {
        console.log("=== Database Super Admin Entity Permission Groups Initialization Started ===");
        const grantPermissionCodes = [];
        const revokePermissionCodes = [];
        const permissions = await appDatabase.Permission.find({});
        // Create Super Admin Entity permissions
        await appDatabase.EntityPermissionGroup.findOneAndUpdate({
            name: DEFAULT_ROLES.SUPER_ADMIN
        }, {
            name: DEFAULT_ROLES.SUPER_ADMIN,
            grantPermissions: permissions.filter(x => grantPermissionCodes.includes(x.code)).map(y => y._id),
            revokePermissions: permissions.filter(x => revokePermissionCodes.includes(x.code)).map(y => y._id),
            relationshipPermissions: [],
            isActive: true,
            description: DEFAULT_ROLES.SUPER_ADMIN
        }, { upsert: true });
        console.log("All Super Admin Entity Permission Groups created/sync with their permissions");
    } catch (error) {
        console.error("Error during database Super Admin Entity Permission Groups setup:", error);
    } finally {
        process.exit(0);
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    entitySuperAdminPermissions();
}

module.exports = entitySuperAdminPermissions;