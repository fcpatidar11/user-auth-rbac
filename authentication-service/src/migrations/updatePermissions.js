require('../../moduleAliases');
const appDatabase = require("@database/app.database");
const permissionConstant = require("@constants/permission.constant");
const permissionGroupConstant = require("@constants/permissionGroup.constant");

function traversePermissions(prefix, obj, groupPermissionMap) {
    return Object.entries(obj).flatMap(([key, value]) => {
        const newPrefix = prefix ? `${prefix}:${key}` : key;
        if (value.code) {
            return [{
                name: value.name,
                code: value.code,
                description: value.description,
                group: groupPermissionMap[value.groupCode]._id
            }];
        }
        return traversePermissions(newPrefix, value, groupPermissionMap);
    });
}

async function updatePermissions() {
    try {
        console.log("=== Database Permissions Initialization Started ===");
        const timestamp = new Date().toISOString();
        
        // Step 1: Update permission groups
        await appDatabase.PermissionGroup.deleteMany({ code: { $nin: Object.values(permissionGroupConstant).map(x => x.code) } });
        const permissionGroups = await Promise.all(Object.values(permissionGroupConstant).map(async(x) => {
            return await appDatabase.PermissionGroup.findOneAndUpdate({ code: x.code }, {
                name: x.name,
                code: x.code,
                description: x.description,
                createdAt: timestamp,
                updatedAt: timestamp,
            }, { upsert: true, new: true });
        }));
        
        // Step 2: Create mapping between group names and their IDs
        const groupPermissionMap = Object.fromEntries(permissionGroups.map(group => [group.code, group]));
        
        // Step 3: Generate permissions from constants
        const permissionsValues = traversePermissions('', permissionConstant, groupPermissionMap);
        const permissionCodes = permissionsValues.map(x => x.code);
        
        // Step 4: Remove permissions no longer in constants
        const deletePermissions = await appDatabase.Permission.find({ code: { $nin: permissionCodes } });
        const deletePermissionIds = deletePermissions.map(x => x._id);
        
        if (deletePermissionIds.length > 0) {
            await appDatabase.User.updateMany(
                { grantPermissions: { $in: deletePermissionIds } },
                { $pullAll: { grantPermissions: deletePermissionIds } }
            );
            
            await appDatabase.User.updateMany(
                { revokePermissions: { $in: deletePermissionIds } },
                { $pullAll: { revokePermissions: deletePermissionIds } }
            );
            
            await appDatabase.Role.updateMany(
                { permissions: { $in: deletePermissionIds } },
                { $pullAll: { permissions: deletePermissionIds } }
            );
            
            await appDatabase.Permission.deleteMany({ _id: { $in: deletePermissionIds } });
        }
        
        // Step 5: Insert or update permissions
        const permissions = await Promise.all(permissionsValues.map(async(permission) => {
            return await appDatabase.Permission.findOneAndUpdate(
                { code: permission.code },
                {
                    ...permission,
                    createdAt: timestamp,
                    updatedAt: timestamp,
                    isActive: true
                },
                { upsert: true, new: true }
            );
        }));
        
        console.log(`Synchronized ${permissions.length} permissions`);
    } catch (error) {
        console.error("Error during database permissions setup:", error);
    } finally {
        process.exit(0);
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    updatePermissions();
}

module.exports = updatePermissions;