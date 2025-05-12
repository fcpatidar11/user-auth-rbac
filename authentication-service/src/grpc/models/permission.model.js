const appMessage = require("@messages/app.message");
const serverLogger = require("@loggers/server.logger");
const permissionHelper = require("@helpers/permission.helper")
const entityPermissionGroupHelper = require("@src/grpc/helpers/entityPermissionGroup.helper");
const permissionGroupHelper = require("@helpers/permissionGroup.helper");
const appConstant = require("@constants/app.constant");
const responseFormatter = require("@formatters/grpc.response");

module.exports = {
    createPermission: async (call, callback) => {
        try {
            const { code, name, description, group } = call.request;

            const [existsCode, existsName] = await Promise.all([
                permissionHelper.retrieve({ code }),
                permissionHelper.retrieve({ name })
            ]);

            if (existsCode) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.permission.codeAlreadyExists);
            }
            if (existsName) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.permission.nameAlreadyTaken);
            }

            const data = await permissionHelper.create({ code, name, description, group });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.permission.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.permission.create, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.CREATE,
                moduleType: appConstant.LOGGED_MODULES.Permission,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Permission
            });
        } catch (error) {
            serverLogger.error(appMessage.permission.createError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.permission.createError);
        }
    },
    updatePermission: async (call, callback) => {
        try {
            const { code, name, description, group } = call.request;
            const { permissionId } = call.request.reqParams || {};

            const [existsCode, existsName] = await Promise.all([
                permissionHelper.retrieve({ code }),
                permissionHelper.retrieve({ name })
            ]);

            if (existsCode && String(existsCode._id) != permissionId) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.permission.codeAlreadyExists);
            }
            if (existsName && String(existsName._id) != permissionId) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.permission.nameAlreadyTaken);
            }

            const data = await permissionHelper.update({ _id: permissionId }, { code, name, description, group });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.permission.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.permission.update, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.Permission,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Permission
            });
        } catch (error) {
            serverLogger.error(appMessage.permission.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.permission.updateError);
        }
    },
    updatePermissionStatus: async (call, callback) => {
        try {
            const { isActive } = call.request;
            const { permissionId } = call.request.reqParams || {};

            const data = await permissionHelper.update({ _id: permissionId }, { isActive });
            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.permission.notFound);
            }
            return responseFormatter.handleOk(call, callback, appMessage.permission.status, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.PermissionStatus,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Permission,
                remarks: isActive ? 'Active' : 'Inactive'
            });
        } catch (error) {
            serverLogger.error(appMessage.permission.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.permission.statusError);
        }
    },
    fetchPermissionById: async (call, callback) => {
        try {
            const { permissionId } = call.request.reqParams || {};

            const data = await permissionHelper.retrieve({ _id: permissionId });
            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.permission.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.permission.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.permission.notFound, null, error);
            return responseFormatter.handleNotFound(call, callback, appMessage.permission.notFound);
        }
    },
    fetchPermissionByCode: async (call, callback) => {
        try {
            const { code } = call.request.reqQueries || {};

            const data = await permissionHelper.retrieve({ code: code });
            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.permission.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.permission.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.permission.notFound, null, error);
            return responseFormatter.handleNotFound(call, callback, appMessage.permission.notFound);
        }
    },
    fetchPermissions: async (call, callback) => {
        try {
            const { permissionId } = call.request.reqQueries || {};
            const data = await permissionHelper.retrieves({ group: permissionId });
            return responseFormatter.handleOk(call, callback, appMessage.permission.fetchAll, { data: data || [] }, null);
        } catch (error) {
            serverLogger.error(appMessage.permission.notFound, null, error);
            return responseFormatter.handleNotFound(call, callback, appMessage.permission.notFound);
        }
    },
    createEntityPermissionGroup: async (call, callback) => {
        try {
            const { name, description, grantPermissions, revokePermissions, relationshipPermissions } = call.request;

            const existsName = await entityPermissionGroupHelper.retrieve({ name });

            if (existsName) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.entityPermissionGroup.nameAlreadyTaken);
            }

            const data = await entityPermissionGroupHelper.create({
                name, description,
                grantPermissions: [...new Set(grantPermissions)],
                revokePermissions: [...new Set(revokePermissions)],
                ...(relationshipPermissions && relationshipPermissions.length && {
                    relationshipPermissions: relationshipPermissions.map(x => {
                        return {
                            relationship: x.relationship,
                            permissions: [...new Set(x.permissions)]
                        }
                    })
                })
            });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.entityPermissionGroup.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.entityPermissionGroup.create, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.CREATE,
                moduleType: appConstant.LOGGED_MODULES.EntityPermissionGroup,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.EntityPermissionGroup,
            });
        } catch (error) {
            serverLogger.error(appMessage.entityPermissionGroup.createError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.entityPermissionGroup.createError);
        }
    },
    updateEntityPermissionGroup: async (call, callback) => {
        try {
            const { name, description, grantPermissions, revokePermissions, relationshipPermissions } = call.request;
            const { entityId } = call.request.reqParams || {};

            const existsName = await entityPermissionGroupHelper.retrieve({ name });

            if (existsName && String(existsName._id) != entityId) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.entityPermissionGroup.nameAlreadyTaken);
            }

            const entityPermissionGroup = await entityPermissionGroupHelper.retrieve({ _id: entityId });
            if (!entityPermissionGroup) {
                return responseFormatter.handleNotFound(call, callback, appMessage.entityPermissionGroup.notFound);
            }

            const data = await entityPermissionGroupHelper.update({ _id: entityId }, {
                ...(!entityPermissionGroup.isSystem && { name }), description,
                grantPermissions: [...new Set(grantPermissions)],
                revokePermissions: [...new Set(revokePermissions)],
                ...(relationshipPermissions && relationshipPermissions.length && {
                    relationshipPermissions: relationshipPermissions.map(x => {
                        return {
                            relationship: x.relationship,
                            permissions: [...new Set(x.permissions)]
                        }
                    })
                })
            });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.entityPermissionGroup.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.entityPermissionGroup.update, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.EntityPermissionGroup,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.EntityPermissionGroup,
            });
        } catch (error) {
            serverLogger.error(appMessage.entityPermissionGroup.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.entityPermissionGroup.updateError);
        }
    },
    updateEntityPermissionGroupStatus: async (call, callback) => {
        try {
            const { isActive } = call.request;
            const { entityId } = call.request.reqParams || {};

            const data = await entityPermissionGroupHelper.update({ _id: entityId }, { isActive });
            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.entityPermissionGroup.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.entityPermissionGroup.status, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.EntityPermissionGroupStatus,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.EntityPermissionGroup,
                remarks: isActive ? 'Active' : 'Inactive'
            });
        } catch (error) {
            serverLogger.error(appMessage.entityPermissionGroup.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.entityPermissionGroup.statusError);
        }
    },
    fetchEntityPermissionGroupById: async (call, callback) => {
        try {
            const { entityId } = call.request.reqParams || {};

            const data = await entityPermissionGroupHelper.retrieve({ _id: entityId });
            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.entityPermissionGroup.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.entityPermissionGroup.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.entityPermissionGroup.notFound, null, error);
            return responseFormatter.handleNotFound(call, callback, appMessage.entityPermissionGroup.notFound);
        }
    },
    fetchEntityPermissionGroupByName: async (call, callback) => {
        try {
            const { name } = call.request.reqQueries || {};
            const data = await entityPermissionGroupHelper.retrieve({ name: name });
            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.entityPermissionGroup.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.entityPermissionGroup.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.entityPermissionGroup.notFound, null, error);
            return responseFormatter.handleNotFound(call, callback, appMessage.entityPermissionGroup.notFound);
        }
    },
    fetchEntityPermissionGroups: async (call, callback) => {
        try {
            const { name } = call.request.reqQueries || {};
            const data = await entityPermissionGroupHelper.retrieves({ name: name });
            return responseFormatter.handleOk(call, callback, appMessage.entityPermissionGroup.fetchAll, { data: data || [] }, null);
        } catch (error) {
            serverLogger.error(appMessage.entityPermissionGroup.notFound, null, error);
            return responseFormatter.handleNotFound(call, callback, appMessage.entityPermissionGroup.notFound);
        }
    },
    createPermissionGroup: async (call, callback) => {
        try {
            const { name, description } = call.request;

            const existsName = await permissionGroupHelper.retrieve({ name });

            if (existsName) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.permissionGroup.nameAlreadyTaken);
            }

            const data = await permissionGroupHelper.create({ name, description });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.permissionGroup.notFound);
            }
            return responseFormatter.handleOk(call, callback, appMessage.permissionGroup.create, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.CREATE,
                moduleType: appConstant.LOGGED_MODULES.PermissionGroup,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.PermissionGroup
            });
        } catch (error) {
            serverLogger.error(appMessage.permissionGroup.createError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.permissionGroup.createError);
        }
    },
    updatePermissionGroup: async (call, callback) => {
        try {
            const { name, description } = call.request;
            const { groupId } = call.request.reqParams || {};

            const existsName = await permissionGroupHelper.retrieve({ name });

            if (existsName && String(existsName._id) != groupId) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.permissionGroup.nameAlreadyTaken);
            }

            const data = await permissionGroupHelper.update({ _id: groupId }, { name, description });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.permissionGroup.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.permissionGroup.update, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.PermissionGroup,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.PermissionGroup
            });
        } catch (error) {
            serverLogger.error(appMessage.permissionGroup.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.permissionGroup.updateError);
        }
    },
    updatePermissionGroupStatus: async (call, callback) => {
        try {
            const { isActive } = call.request;
            const { groupId } = call.request.reqParams || {};

            const data = await permissionGroupHelper.update({ _id: groupId }, { isActive });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.permissionGroup.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.permissionGroup.status, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.PermissionGroupStatus,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.PermissionGroup,
                remarks: isActive ? 'Active' : 'Inactive'
            });
        } catch (error) {
            serverLogger.error(appMessage.permissionGroup.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.permissionGroup.statusError);
        }
    },
    fetchPermissionGroupById: async (call, callback) => {
        try {
            const { groupId } = call.request.reqParams || {};
            const data = await permissionGroupHelper.retrieve({ _id: groupId });
            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.permissionGroup.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.permissionGroup.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.permissionGroup.notFound, null, error);
            return responseFormatter.handleNotFound(call, callback, appMessage.permissionGroup.notFound);
        }
    },
    fetchPermissionGroups: async (call, callback) => {
        try {
            const data = await permissionGroupHelper.retrieves({});
            return responseFormatter.handleOk(call, callback, appMessage.permissionGroup.fetchAll, { data: data || [] }, null);
        } catch (error) {
            serverLogger.error(appMessage.permissionGroup.notFound, null, error);
            return responseFormatter.handleNotFound(call, callback, appMessage.permissionGroup.notFound);
        }
    }
}