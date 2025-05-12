const appMessage = require("@messages/app.message");
const serverLogger = require("@loggers/server.logger");
const appConstant = require("@constants/app.constant");
const userRelationshipHelper = require("@helpers/userRelationship.helper");
const responseFormatter = require("@formatters/grpc.response");
const userHelper = require("../helpers/user.helper");
const entityPermissionGroupHelper = require("@src/grpc/helpers/entityPermissionGroup.helper");

module.exports = {
    addUserRelationship: async (call, callback) => {
        try {
            const { assignPermissions } = call.request;
            const reqParams = call.request.reqParams || {};
            const { parentId, childId } = call.request.reqParams || {};
            const childUser = await userHelper.retrieve({ _id: childId });
            if (!childUser) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            if (!childUser?.roles?.some(x => x.name === appConstant.USER_TYPES.SUBSIDIARY)) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.user.notFound);
            }

            const userTypeAccessPermission = await entityPermissionGroupHelper.retrieve({ name: reqParams.userType });
            let userTypeAccessRelationshipPermissions = [];
            if (userTypeAccessPermission && userTypeAccessPermission.relationshipPermissions) {
                const relationshipData = userTypeAccessPermission.relationshipPermissions.find(x => x.relationship === appConstant.USER_TYPES.SUBSIDIARY);
                if (relationshipData && relationshipData.permissions) {
                    userTypeAccessRelationshipPermissions = relationshipData.permissions.map(x => String(x._id));
                }
            }

            if (assignPermissions.some(x => !userTypeAccessRelationshipPermissions.includes(x))) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.permission.notFound);
            }

            // Check if the relationship already exists
            const existingRelation = await userRelationshipHelper.retrieve({ parentUser: parentId, childUser: childId });

            if (existingRelation) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.user.userRelationshipAlreadyExists);
            }

            const data = await userRelationshipHelper.create({ parentUser: parentId, childUser: childId, permissions: assignPermissions });
            return responseFormatter.handleOk(call, callback, appMessage.user.AddUserRelationship, { data }, {
                performedFor: parentId,
                actionType: appConstant.LOGGED_ACTIONS.CREATE,
                moduleType: appConstant.LOGGED_MODULES.UserRelationship,
                entityId: childId,
                entityType: appConstant.LOGGED_ENTITY_TYPES.UserRelationship,
            });
        } catch (error) {
            serverLogger.error(appMessage.userRole.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.addUserRelationshipError);
        }
    },
    removeUserRelationship: async (call, callback) => {
        try {
            const { parentId, childId } = call.request.reqParams || {};

            const existingRelation = await userRelationshipHelper.retrieve({ parentUser: parentId, childUser: childId });

            if (!existingRelation) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.relationshipNotFound);
            }
            const deleted = await userRelationshipHelper.deleteOne({ _id: existingRelation._id });

            if (!deleted) {
                return responseFormatter.handleInternal(call, callback, appMessage.user.removeRelationshipError);
            }

            return responseFormatter.handleOk(call, callback, appMessage.user.removedUserRelationship, { data: true }, {
                performedFor: parentId,
                actionType: appConstant.LOGGED_ACTIONS.DELETE,
                moduleType: appConstant.LOGGED_MODULES.UserRelationship,
                entityId: childId,
                entityType: appConstant.LOGGED_ENTITY_TYPES.UserRelationship,
            });
        } catch (error) {
            serverLogger.error(appMessage.user.removeRelationshipError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.removeRelationshipError);
        }
    },
    updateUserRelationshipPermissions: async (call, callback) => {
        try {
            const { assignPermissions, removePermissions } = call.request;
            const reqParams = call.request.reqParams || {};
            const { parentId, childId } = call.request.reqParams || {};
            const userTypeAccessPermission = await entityPermissionGroupHelper.retrieve({ name: reqParams.userType });
            let userTypeAccessRelationshipPermissions = [];
            if (userTypeAccessPermission && userTypeAccessPermission.relationshipPermissions) {
                const relationshipData = userTypeAccessPermission.relationshipPermissions.find(x => x.relationship === appConstant.USER_TYPES.SUBSIDIARY);
                if (relationshipData && relationshipData.permissions) {
                    userTypeAccessRelationshipPermissions = relationshipData.permissions.map(x => String(x._id));
                }
            }

            if (assignPermissions.some(x => !userTypeAccessRelationshipPermissions.includes(x))) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.permission.notFound);
            }

            let data = await userRelationshipHelper.retrieve({ parentUser: parentId, childUser: childId });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.relationshipNotFound);
            }

            let permissions = data?.permissions || [];
            const updatePermissions = permissions.map(x => String(x._id)).filter(x => !removePermissions.includes(x)).concat(assignPermissions);
            data = await userRelationshipHelper.update({ _id: data._id }, {
                permissions: [...new Set(updatePermissions)]
            });

            return responseFormatter.handleOk(call, callback, appMessage.user.updateUserRelationshipPermission, { data }, {
                performedFor: parentId,
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.UserRelationship,
                entityId: childId,
                entityType: appConstant.LOGGED_ENTITY_TYPES.UserRelationship,
            });
        } catch (error) {
            serverLogger.error(appMessage.user.updateUserRelationshipPermissionError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.updateUserRelationshipPermissionError);
        }
    },
    fetchUserRelationship: async (call, callback) => {
        try {
            const { parentId, childId } = call.request.reqParams || {};

            let data = await userRelationshipHelper.retrieve({ parentUser: parentId, childUser: childId });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.relationshipNotFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.user.fetch, { data }, null);

        } catch (error) {
            serverLogger.error(appMessage.common.error, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.common.error);
        }
    }
};