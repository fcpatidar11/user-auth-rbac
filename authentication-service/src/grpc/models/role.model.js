const appMessage = require("@messages/app.message");
const serverLogger = require("@loggers/server.logger");
const roleHelper = require("@helpers/role.helper")
const appConstant = require("@constants/app.constant");
const responseFormatter = require("@formatters/grpc.response");
const roleGroupHelper = require("@helpers/roleGroup.helper");

module.exports = {
    createRole: async (call, callback) => {
        try {
            const { group, name, description, assignPermissions } = call.request;

            const existsName = await roleHelper.retrieve({ name });
            const userAccessRolePermissions = call.metadata?.get("auth-user-role-permission-ids") || [];

            if (existsName) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.role.nameAlreadyTaken);
            }

            if (assignPermissions.some(x => !userAccessRolePermissions.includes(x))) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.permission.notFound);
            }

            const data = await roleHelper.create({
                name, description, group,
                permissions: assignPermissions
            });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.role.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.role.create, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.CREATE,
                moduleType: appConstant.LOGGED_MODULES.Role,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Role,
            });
        } catch (error) {
            serverLogger.error(appMessage.role.createError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.role.createError);
        }
    },
    updateRole: async (call, callback) => {
        try {
            const { name, description, group, assignPermissions, removePermissions } = call.request;
            const { roleId } = call.request.reqParams || {};
            const userAccessRolePermissions = call.metadata?.get("auth-user-role-permission-ids") || [];

            const existsName = await roleHelper.retrieve({ name });

            if (existsName && String(existsName._id) != roleId) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.role.nameAlreadyTaken);
            }

            if (assignPermissions.some(x => !userAccessRolePermissions.includes(x))) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.permission.notFound);
            }

            const role = await roleHelper.retrieve({ _id: roleId });
            if (!role) {
                return responseFormatter.handleNotFound(call, callback, appMessage.role.notFound);
            }
            let permissions = role.permissions.map(x => String(x._id));
            permissions = permissions.concat(assignPermissions);
            permissions = permissions.filter(x => !removePermissions.includes(x));

            const data = await roleHelper.update({ _id: roleId }, {
                ...(!role.isSystem && { name }), description, group,
                permissions: [...new Set(permissions)]
            });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.role.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.role.update, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.Role,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Role,
            });
        } catch (error) {
            serverLogger.error(appMessage.role.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.role.updateError);
        }
    },
    updateRoleStatus: async (call, callback) => {
        try {
            const { isActive } = call.request;
            const { roleId } = call.request.reqParams || {};

            const data = await roleHelper.update({ _id: roleId }, { isActive });
            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.role.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.role.status, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.RoleStatus,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Role,
                remarks: isActive ? 'Active' : 'Inactive'
            });
        } catch (error) {
            serverLogger.error(appMessage.role.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.role.statusError);
        }
    },
    fetchRoleById: async (call, callback) => {
        try {
            const { roleId } = call.request.reqParams || {};

            const data = await roleHelper.retrieve({ _id: roleId });
            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.role.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.role.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.role.notFound, null, error);
            return responseFormatter.handleNotFound(call, callback, appMessage.role.notFound);
        }
    },
    fetchRoles: async (call, callback) => {
        try {
            const { groupId } = call.request.reqQueries || {};
            const data = await roleHelper.retrieves({ group: groupId });
            return responseFormatter.handleOk(call, callback, appMessage.role.fetchAll, { data: data || [] }, null);
        } catch (error) {
            serverLogger.error(appMessage.role.notFound, null, error);
            return responseFormatter.handleNotFound(call, callback, appMessage.role.notFound);
        }
    },
    createRoleGroup: async (call, callback) => {
        try {
            const { name, description } = call.request;

            const existsName = await roleGroupHelper.retrieve({ name });

            if (existsName) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.roleGroup.nameAlreadyTaken);
            }

            const data = await roleGroupHelper.create({ name, description });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.roleGroup.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.roleGroup.create, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.CREATE,
                moduleType: appConstant.LOGGED_MODULES.RoleGroup,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.RoleGroup,
            });
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.createError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.roleGroup.createError);
        }
    },
    updateRoleGroup: async (call, callback) => {
        try {
            const { name, description } = call.request;
            const { groupId } = call.request.reqParams || {};

            const existsName = await roleGroupHelper.retrieve({ name });

            if (existsName && String(existsName._id) != groupId) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.roleGroup.nameAlreadyTaken);
            }

            const data = await roleGroupHelper.update({ _id: groupId }, { name, description });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.roleGroup.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.roleGroup.update, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.RoleGroup,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.RoleGroup,
            });
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.roleGroup.updateError);
        }
    },
    updateRoleGroupStatus: async (call, callback) => {
        try {
            const { isActive } = call.request;
            const { groupId } = call.request.reqParams || {};

            const data = await roleGroupHelper.update({ _id: groupId }, { isActive });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.roleGroup.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.roleGroup.status, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.RoleGroupStatus,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.RoleGroup,
                remarks: isActive ? 'Active' : 'Inactive'
            });
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.roleGroup.statusError);
        }
    },
    fetchRoleGroupById: async (call, callback) => {
        try {
            const { groupId } = call.request.reqParams || {};

            const data = await roleGroupHelper.retrieve({ _id: groupId });
            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.roleGroup.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.roleGroup.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.notFound, null, error);
            return responseFormatter.handleNotFound(call, callback, appMessage.roleGroup.notFound);
        }
    },
    fetchRoleGroups: async (call, callback) => {
        try {
            const data = await roleGroupHelper.retrieves({});
            return responseFormatter.handleOk(call, callback, appMessage.roleGroup.fetchAll, { data: data || [] }, null);
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.notFound, null, error);
            return responseFormatter.handleNotFound(call, callback, appMessage.roleGroup.notFound);
        }
    }
}