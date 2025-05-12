const userContactHelper = require("@src/grpc/helpers/userContact.helper");
const appMessage = require("@messages/app.message");
const serverLogger = require("@loggers/server.logger");
const appConstant = require("@constants/app.constant");
const responseFormatter = require("@formatters/grpc.response");

module.exports = {
    createProfileContact: async (call, callback) => {
        try {
            const { contact, countryCode, dialCode, contactType } = call.request;
            const metadata = call.metadata?.getMap() || {};

            const existsName = await userContactHelper.retrieve({ user: metadata["auth-user-id"], contact, countryCode, dialCode, contactType });

            if (existsName) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.contact.alreadyExists);
            }

            const data = await userContactHelper.create({ user: metadata["auth-user-id"], contact, countryCode, dialCode, contactType });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.contact.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.contact.create, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.CREATE,
                moduleType: appConstant.LOGGED_MODULES.UserContact,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Contact,
            });
        } catch (error) {
            serverLogger.error(appMessage.contact.createError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.contact.createError);
        }
    },
    updateProfileContact: async (call, callback) => {
        try {
            const { contact, countryCode, dialCode, contactType } = call.request;
            const metadata = call.metadata?.getMap() || {};
            const { contactId } = call.request.reqParams || {};

            const existsName = await userContactHelper.retrieve({ user: metadata["auth-user-id"], contact, countryCode, dialCode, contactType });

            if (existsName && String(existsName._id) != contactId) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.contact.alreadyExists);
            }

            const data = await userContactHelper.update({ _id: contactId, user: metadata["auth-user-id"] }, { contact, countryCode, dialCode, contactType });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.contact.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.contact.update, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.UserContact,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Contact,
            });
        } catch (error) {
            serverLogger.error(appMessage.contact.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.contact.updateError);
        }
    },
    deleteProfileContact: async (call, callback) => {
        try {
            const metadata = call.metadata?.getMap() || {};
            const { contactId } = call.request.reqParams || {};

            const data = await userContactHelper.deleteOne({ _id: contactId, user: metadata["auth-user-id"] });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.contact.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.contact.delete, { data: true }, {
                actionType: appConstant.LOGGED_ACTIONS.DELETE,
                moduleType: appConstant.LOGGED_MODULES.UserContact,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Contact,
                remarks: ""
            });
        } catch (error) {
            serverLogger.error(appMessage.contact.deleteError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.contact.deleteError);
        }
    },
    fetchProfileContact: async (call, callback) => {
        try {
            const metadata = call.metadata?.getMap() || {};
            const { contactId } = call.request.reqParams || {};

            const data = await userContactHelper.retrieve({ _id: contactId, user: metadata["auth-user-id"] });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.contact.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.contact.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.contact.notFound);
        }
    },
    fetchProfileContacts: async (call, callback) => {
        try {
            const metadata = call.metadata?.getMap() || {};

            const data = await userContactHelper.retrieves({ user: metadata["auth-user-id"] });

            return responseFormatter.handleOk(call, callback, appMessage.contact.fetchAll, { data: data || [] }, null);
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.contact.notFound);
        }
    },
    createUserContact: async (call, callback) => {
        try {
            const { contact, countryCode, dialCode, contactType } = call.request;
            const { userId } = call.request.reqParams || {};

            const existsName = await userContactHelper.retrieve({ user: userId, contact, countryCode, dialCode, contactType });

            if (existsName) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.contact.alreadyExists);
            }

            const data = await userContactHelper.create({ user: userId, contact, countryCode, dialCode, contactType });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.contact.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.contact.create, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.CREATE,
                moduleType: appConstant.LOGGED_MODULES.UserContact,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Contact,
            });
        } catch (error) {
            serverLogger.error(appMessage.contact.createError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.contact.createError);
        }
    },
    updateUserContact: async (call, callback) => {
        try {
            const { contact, countryCode, dialCode, contactType } = call.request;
            const { userId, contactId } = call.request.reqParams || {};

            const existsName = await userContactHelper.retrieve({ user: userId, contact, countryCode, dialCode, contactType });

            if (existsName && String(existsName._id) != contactId) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.contact.alreadyExists);
            }

            const data = await userContactHelper.update({ _id: contactId, user: userId }, { contact, countryCode, dialCode, contactType });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.contact.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.contact.update, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.UserContact,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Contact,
            });
        } catch (error) {
            serverLogger.error(appMessage.contact.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.contact.updateError);
        }
    },
    deleteUserContact: async (call, callback) => {
        try {
            const { userId, contactId } = call.request.reqParams || {};

            const data = await userContactHelper.deleteOne({ _id: contactId, user: userId });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.contact.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.contact.delete, { data: true }, {
                actionType: appConstant.LOGGED_ACTIONS.DELETE,
                moduleType: appConstant.LOGGED_MODULES.UserContact,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Contact,
                remarks: ""
            });
        } catch (error) {
            serverLogger.error(appMessage.contact.deleteError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.contact.deleteError);
        }
    },
    fetchUserContact: async (call, callback) => {
        try {
            const { userId, contactId } = call.request.reqParams || {};

            const data = await userContactHelper.retrieve({ _id: contactId, user: userId });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.contact.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.contact.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.contact.notFound);
        }
    },
    fetchUserContacts: async (call, callback) => {
        try {
            const { userId } = call.request.reqParams || {};

            const data = await userContactHelper.retrieves({ user: userId });

            return responseFormatter.handleOk(call, callback, appMessage.contact.fetchAll, { data: data || [] }, null);
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.contact.notFound);
        }
    }
};