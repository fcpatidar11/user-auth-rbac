const userAddressHelper = require("@src/grpc/helpers/userAddress.helper");
const appMessage = require("@messages/app.message");
const serverLogger = require("@loggers/server.logger");
const appConstant = require("@constants/app.constant");
const responseFormatter = require("@formatters/grpc.response");

module.exports = {
    createProfileAddress: async (call, callback) => {
        try {
            const { streetName, address, country, subdivision, addressType, location } = call.request;
            const metadata = call.metadata?.getMap() || {};

            const existsName = await userAddressHelper.retrieve({ user: metadata["auth-user-id"], addressType });

            if (existsName) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.address.alreadyExists);
            }

            const data = await userAddressHelper.create({ user: metadata["auth-user-id"], streetName, address, country, subdivision, addressType, location });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.address.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.address.create, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.CREATE,
                moduleType: appConstant.LOGGED_MODULES.UserAddress,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Address,
            });
        } catch (error) {
            serverLogger.error(appMessage.address.createError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.address.createError);
        }
    },
    updateProfileAddress: async (call, callback) => {
        try {
            const { streetName, address, country, subdivision, addressType, location } = call.request;
            const metadata = call.metadata?.getMap() || {};
            const { addressId } = call.request.reqParams || {};

            const existsName = await userAddressHelper.retrieve({ user: metadata["auth-user-id"], addressType });

            if (existsName && String(existsName._id) != addressId) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.address.alreadyExists);
            }

            const data = await userAddressHelper.update({ _id: addressId, user: metadata["auth-user-id"] }, { streetName, address, country, subdivision, addressType, location });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.address.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.address.update, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.UserAddress,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Address,
            });
        } catch (error) {
            serverLogger.error(appMessage.address.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.address.updateError);
        }
    },
    deleteProfileAddress: async (call, callback) => {
        try {
            const metadata = call.metadata?.getMap() || {};
            const { addressId } = call.request.reqParams || {};

            const data = await userAddressHelper.deleteOne({ _id: addressId, user: metadata["auth-user-id"] });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.address.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.address.delete, { data: true }, {
                actionType: appConstant.LOGGED_ACTIONS.DELETE,
                moduleType: appConstant.LOGGED_MODULES.UserAddress,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Address,
                remarks: ""
            });
        } catch (error) {
            serverLogger.error(appMessage.address.deleteError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.address.deleteError);
        }
    },
    fetchProfileAddress: async (call, callback) => {
        try {
            const { addressId } = call.request.reqParams || {};
            const metadata = call.metadata?.getMap() || {};

            const data = await userAddressHelper.retrieve({ _id: addressId, user: metadata["auth-user-id"] });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.address.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.address.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.address.notFound);
        }
    },
    fetchProfileAddresses: async (call, callback) => {
        try {
            const metadata = call.metadata?.getMap() || {};
            const data = await userAddressHelper.retrieves({ user: metadata["auth-user-id"] });

            return responseFormatter.handleOk(call, callback, appMessage.address.fetchAll, { data: data || [] }, null);
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.address.notFound);
        }
    },
    createAddress: async (call, callback) => {
        try {
            const { streetName, address, country, subdivision, addressType, location } = call.request;
            const { userId } = call.request.reqParams || {};

            const existsName = await userAddressHelper.retrieve({ user: userId, addressType });

            if (existsName) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.address.alreadyExists);
            }

            const data = await userAddressHelper.create({ user: userId, streetName, address, country, subdivision, addressType, location });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.address.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.address.create, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.CREATE,
                moduleType: appConstant.LOGGED_MODULES.UserAddress,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Address,
            });
        } catch (error) {
            serverLogger.error(appMessage.address.createError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.address.createError);
        }
    },
    updateAddress: async (call, callback) => {
        try {
            const { streetName, address, country, subdivision, addressType, location } = call.request;
            const { userId, addressId } = call.request.reqParams || {};

            const existsName = await userAddressHelper.retrieve({ user: userId, addressType });

            if (existsName && String(existsName._id) != addressId) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.address.alreadyExists);
            }

            const data = await userAddressHelper.update({ _id: addressId, user: userId }, { streetName, address, country, subdivision, addressType, location });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.address.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.address.update, { data }, {
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.UserAddress,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Address,
            });
        } catch (error) {
            serverLogger.error(appMessage.address.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.address.updateError);
        }
    },
    deleteAddress: async (call, callback) => {
        try {
            const { userId, addressId } = call.request.reqParams || {};

            const data = await userAddressHelper.deleteOne({ _id: addressId, user: userId });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.address.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.address.delete, { data: true }, {
                actionType: appConstant.LOGGED_ACTIONS.DELETE,
                moduleType: appConstant.LOGGED_MODULES.UserAddress,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.Address,
                remarks: ""
            });
        } catch (error) {
            serverLogger.error(appMessage.address.deleteError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.address.deleteError);
        }
    },
    fetchAddress: async (call, callback) => {
        try {
            const { userId, addressId } = call.request.reqParams || {};

            const data = await userAddressHelper.retrieve({ _id: addressId, user: userId });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.address.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.address.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.address.notFound);
        }
    },
    fetchAddresses: async (call, callback) => {
        try {
            const { userId } = call.request.reqParams || {};

            const data = await userAddressHelper.retrieves({ user: userId });

            return responseFormatter.handleOk(call, callback, appMessage.address.fetchAll, { data: data || [] }, null);
        } catch (error) {
            serverLogger.error(appMessage.roleGroup.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.address.notFound);
        }
    }
};