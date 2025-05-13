const userHelper = require("@helpers/user.helper");
const appMessage = require("@messages/app.message");
const serverLogger = require("@loggers/server.logger");
const jwtUtil = require("@utils/jwt.util");
const sendEmail = require("@templates/email.template");
const appConstant = require("@constants/app.constant");
const passwordHash = require("password-hash");
const responseFormatter = require("@formatters/grpc.response");
const roleHelper = require("@helpers/role.helper");

module.exports = {
    acceptUserInvitation: async (call, callback) => {
        try {
            const { password } = call.request;
            const metadata = call.metadata?.getMap() || {};

            let data = await userHelper.retrieve({ _id: metadata["request-user-id"] });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            if (data?.isEmailVerified) {
                return responseFormatter.handleCancelled(call, callback, appMessage.user.alreadyInvitationAccepted);
            }

            data = await userHelper.update({ _id: metadata["request-user-id"] }, { isEmailVerified: true, password: passwordHash.generate(password) });

            return responseFormatter.handleOk(call, callback, appMessage.user.invitationAccepted, { data }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.EMAIL_VERIFY,
                moduleType: appConstant.LOGGED_MODULES.Authentication,
            });
        } catch (error) {
            serverLogger.error(appMessage.user.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.updateError);
        }
    },
    fetchUserInvitation: async (call, callback) => {
        try {
            const metadata = call.metadata?.getMap() || {};

            let data = await userHelper.retrieve({ _id: metadata["request-user-id"] });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.invitationNotFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.user.invitationInfo, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.user.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.updateError);
        }
    },
    resetPassword: async (call, callback) => {
        try {
            const { password } = call.request;
            const metadata = call.metadata?.getMap() || {};

            let data = await userHelper.retrieve({ _id: metadata["request-user-id"] });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            data = await userHelper.update({ _id: metadata["request-user-id"] }, { password: passwordHash.generate(password) });

            if (!data) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.user.updateError);
            }

            sendEmail.sendResetPasswordConfirmation(data);
            return responseFormatter.handleOk(call, callback, appMessage.user.resetPassword, { data: true }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.RESET_PASSWORD,
                moduleType: appConstant.LOGGED_MODULES.Authentication,
            });
        } catch (error) {
            serverLogger.error(appMessage.user.notFound, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    },
    login: async (call, callback) => {
        try {
            const { email, password } = call.request;

            let data = await userHelper.retrieve({ email });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            let userPassword = await userHelper.fetchPassword({ email });
            if (!passwordHash.verify(password, userPassword)) {
                return responseFormatter.handleUnauthenticated(call, callback, appMessage.user.invalidPassword);
            }

            if (!data.isEmailVerified) {
                return responseFormatter.handleUnauthenticated(call, callback, appMessage.user.emailNotVerified);
            }

            if (!data.isActive) {
                return responseFormatter.handleUnauthenticated(call, callback, appMessage.user.blocked);
            }
            const token = await jwtUtil.generateAuthToken({ userId: data._id, email: data.email });
            return responseFormatter.handleOk(call, callback, appMessage.user.login, { data, token }, {
                performedBy: data._id,
                actionType: appConstant.LOGGED_ACTIONS.LOGIN,
                moduleType: appConstant.LOGGED_MODULES.Authentication
            });
        } catch (error) {
            serverLogger.error(appMessage.user.notFound, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    },
    forgotPassword: async (call, callback) => {
        try {
            const { email } = call.request;

            let data = await userHelper.retrieve({ email });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            const token = await jwtUtil.generateResetPasswordToken({ userId: data._id, email: data.email });
            sendEmail.sendForgotPasswordEmail(data, token);
            return responseFormatter.handleOk(call, callback, appMessage.user.forgotPassword, { data: true }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.FORGOT_PASSWORD,
                moduleType: appConstant.LOGGED_MODULES.Authentication,
            });
        } catch (error) {
            serverLogger.error(appMessage.user.notFound, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    },
    fetchDashboardOverview: async (call, callback) => {
        try {
            const metadata = call.metadata?.getMap() || {};
            const roleNames = call.metadata?.get("auth-user-role-names") || [];

            let data = await userHelper.dashboardOverview({
                userId: metadata["auth-user-id"],
                isSuperAdmin: roleNames.includes(appConstant.DEFAULT_ROLES.SUPER_ADMIN),
                isAdmin: roleNames.includes(appConstant.DEFAULT_ROLES.ADMIN),
                isPartner: roleNames.includes(appConstant.DEFAULT_ROLES.PARTNER),
                isCustomer: roleNames.includes(appConstant.DEFAULT_ROLES.CUSTOMER),
                isSubsidiary: roleNames.includes(appConstant.DEFAULT_ROLES.SUBSIDIARY),
                isTechnician: roleNames.includes(appConstant.DEFAULT_ROLES.TECHNICIAN)
            });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.common.success, { data }, null);

        } catch (error) {
            serverLogger.error(appMessage.common.error, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.common.error);
        }
    },
    signup: async (call, callback) => {
        const { firstName, middleName, lastName, userName, email, password, gender, role } = call.request;
        const { userType = "USER" } = role || {};
        try {
            const [existsEmail, existsUserName, roleInfo] = await Promise.all([
                userHelper.retrieve({ email }),
                userHelper.retrieve({ userName }),
                roleHelper.retrieve({ name: role })
            ]);
            if (!roleInfo) {
                return responseFormatter.handleNotFound(call, callback, appMessage.role.notFound);
            }

            const roleId = String(roleInfo._id);

            if (existsEmail) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.user.emailAlreadyExists);
            }
            if (existsUserName) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.user.userNameAlreadyTaken);
            }

            const data = await userHelper.create({
                firstName, 
                middleName, 
                lastName, 
                userName, 
                email, 
                gender,
                password: passwordHash.generate(password),
                isEmailVerified: true, // Set to true as this is self-signup
                roles: [roleId],
                revokePermissions: [],
                grantPermissions: []
            });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            const token = await jwtUtil.generateAuthToken({ userId: data._id, email: data.email });

            return responseFormatter.handleOk(call, callback, appMessage.user.register, { data, token }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.CREATE,
                moduleType: appConstant.LOGGED_MODULES.User,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.User,
                remarks: userType
            });
        } catch (error) {
            serverLogger.error(appMessage.user.registerError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.registerError);
        }
    }
};