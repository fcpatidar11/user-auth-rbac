const userHelper = require("@helpers/user.helper");
const appMessage = require("@messages/app.message");
const serverLogger = require("@loggers/server.logger");
const jwtUtil = require("@utils/jwt.util");
const sendEmail = require("@templates/email.template");
const notificationConnector = require("@connectors/notificationConnector");
const roleHelper = require("@helpers/role.helper");
const appConstant = require("@constants/app.constant");
const passwordHash = require("password-hash");
const responseFormatter = require("@formatters/grpc.response");
const { moveFileWithOverwrite } = require("@utils/file.util");
const path = require("path");

module.exports = {
    inviteUser: async (call, callback) => {
        const { firstName, middleName, lastName, userName, email, gender } = call.request;
        const { userType } = call.request.reqParams || {};

        try {
            const [existsEmail, existsUserName, roleInfo] = await Promise.all([
                userHelper.retrieve({ email }),
                userHelper.retrieve({ userName }),
                roleHelper.retrieve({ name: userType })
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
                firstName, middleName, lastName, userName, email, gender,
                roles: [roleId],
                revokePermissions: [],
                grantPermissions: []
            });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            const token = await jwtUtil.generateInvitationVerificationToken({ userId: data._id, email: data.email })
            sendEmail.sendInvitationEmail(data, token, userType);

            return responseFormatter.handleOk(call, callback, appMessage.user.register, { data }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.CREATE,
                moduleType: appConstant.LOGGED_MODULES.User,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.User,
                remarks: userType
            });
        } catch (error) {
            serverLogger.error(appMessage.user.createError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.createError);
        }
    },
    updateUser: async (call, callback) => {
        try {
            const { firstName, middleName, lastName, userName, gender } = call.request;
            const { userId } = call.request.reqParams || {};

            const existsUserName = await userHelper.retrieve({ userName });

            if (existsUserName && String(existsUserName._id) != userId) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.user.userNameAlreadyTaken);
            }

            const data = await userHelper.update({ _id: userId }, { firstName, middleName, lastName, userName, gender });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.user.update, { data }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.User,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.User,
            });
        } catch (error) {
            serverLogger.error(appMessage.user.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.updateError);
        }
    },
    updateUserStatus: async (call, callback) => {
        try {
            const { isActive } = call.request;
            const { userId } = call.request.reqParams || {};

            const data = await userHelper.update({ _id: userId }, { isActive });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.user.status, { data }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.UserStatus,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.User,
                remarks: isActive ? 'Active' : 'Inactive'
            });
        } catch (error) {
            serverLogger.error(appMessage.user.statusError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.statusError);
        }
    },
    updateProfilePassword: async (call, callback) => {
        try {
            const { oldPassword, newPassword } = call.request;
            const metadata = call.metadata?.getMap() || {};

            const userPassword = await userHelper.fetchPassword({ _id: metadata["auth-user-id"] });

            if (!passwordHash.verify(oldPassword, userPassword)) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.user.invalidOldPassword);
            }

            const data = await userHelper.update({ _id: metadata["auth-user-id"] }, { password: passwordHash.generate(newPassword) });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.user.changePassword, { data }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.CHANGE_PASSWORD,
                moduleType: appConstant.LOGGED_MODULES.User,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.User,
            });
        } catch (error) {
            serverLogger.error(appMessage.user.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.updateError);
        }
    },
    fetchUserById: async (call, callback) => {
        try {
            const { userId } = call.request.reqParams || {};

            let data = await userHelper.retrieve({ _id: userId });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            return responseFormatter.handleOk(call, callback, appMessage.user.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.user.notFound, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    },
    fetchUsers: async (call, callback) => {
        try {
            const { userType } = call.request.reqParams || {};
            let { page, limit, sortBy, search, parentUserId, childUserId, relationshipType } = call.request.reqQueries || {};
            const metadata = call.metadata?.getMap() || {};
            const roleNames = call.metadata?.get("auth-user-role-names") || [];
            if (userType == appConstant.DEFAULT_ROLES.CUSTOMER && roleNames.includes(appConstant.DEFAULT_ROLES.SUBSIDIARY)) {
                childUserId = metadata["auth-user-id"];
            } else if (userType == appConstant.DEFAULT_ROLES.SUBSIDIARY && roleNames.includes(appConstant.DEFAULT_ROLES.CUSTOMER)) {
                parentUserId = metadata["auth-user-id"];
            }

            let data = await userHelper.retrieves({}, sortBy, search, userType, { page: Number(page) || 1, limit: Number(limit) || 10 }, { parentUserId, childUserId, relationshipType });

            return responseFormatter.handleOk(call, callback, appMessage.user.fetchAll, {
                data: data.docs, pagination: {
                    totalDocs: data.totalDocs,
                    limit: data.limit,
                    page: data.page,
                    totalPages: data.totalPages,
                    nextPage: data.nextPage,
                    prevPage: data.prevPage,
                    hasPrevPage: data.hasPrevPage,
                    hasNextPage: data.hasNextPage
                }
            });
        } catch (error) {
            serverLogger.error(appMessage.user.notFound, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    },
    fetchProfile: async (call, callback) => {
        try {
            const metadata = call.metadata?.getMap() || {};

            let data = await userHelper.retrieve({ _id: metadata["auth-user-id"] });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            const token = await jwtUtil.generateInvitationVerificationToken({ userId: data._id, email: data.email })

            try {
                const payload = {
                    templateKey: appConstant.EMAIL_TEMPLATES.INVITATION_EMAIL,
                    user: data,
                    token,
                    role: "admin"
                };

                const grpcResponse = await notificationConnector.sendEmailNotificationConnector(payload);
                console.log("Email notification sent:", grpcResponse);
                if (grpcResponse.code !== 0) {
                    serverLogger.error("Email notification failed via gRPC", null, grpcResponse);
                    return responseFormatter.handleInternal(
                        call,
                        callback,
                        grpcResponse.details
                    );
                }
            } catch (error) {
                serverLogger.error("Failed to send email notification", null, error);
                return responseFormatter.handleInternal(call, callback, 'Failed to send email');
            }
            return responseFormatter.handleOk(call, callback, appMessage.user.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.user.notFound, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    },
    testEmailSend: async (call, callback) => {
        try {
            const metadata = call.metadata?.getMap() || {};

            let data = await userHelper.retrieve({ _id: metadata["auth-user-id"] });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }

            const token = await jwtUtil.generateInvitationVerificationToken({ userId: data._id, email: data.email })

            try {
                const payload = {
                    user: data,
                    templateName: "Welcome Email",
                    templateVariables: [
                        {
                            pattern: '####USER_NAME####',
                            value: data.firstName
                        },
                        {
                            pattern: '####PROJECT_NAME####',
                            value: "EncoreSky"
                        }
                    ]
                };

                const grpcResponse = await notificationConnector.sendEmailNotificationConnector(payload);
                if (grpcResponse.code !== 0) {
                    serverLogger.error("Email notification failed via gRPC", null, grpcResponse);
                    return responseFormatter.handleInternal(
                        call,
                        callback,
                        grpcResponse.details
                    );
                }

                const smsPayload = {
                    phoneNumber: "+917566001435",
                    templateName: "Welcome SMS",
                    templateVariables: [
                        {
                            pattern: '####USER_NAME####',
                            value: data.firstName
                        }
                    ]
                };
                const simpleSMS = await notificationConnector.sendSMSNotificationConnector(smsPayload);
                // const sendOTP = await notificationConnector.sendSMSVerificationCodeConnector({ phoneNumber: "+917566001435" });
                // const verifyOTP = await notificationConnector.verifyOTPCodeConnector({ phoneNumber: "+917566001435", code: '810553' });

                const pushNotiPayload = {
                    deviceToken: "flPr9wtRQkuBn0sNmT_RgM:APA91bHQNy14Fg7QEVu2VYfwGbJDvlh1I7YZm1QsTrgRTASBWHu5ZJA2RzuRD6N4ZBFDev3SPPzzpCzOGDVEEI71jOTFnJuG3iOGxnDivx9_oi8PopOQyfo",
                    title: "Welcome to EncoreSky",
                    body: "Welcome to EncoreSky family",
                    user: data
                };
                const simplePushNoti = await notificationConnector.sendPushNotificationConnector(pushNotiPayload);

            } catch (error) {
                serverLogger.error("Failed to send email notification", null, error);
                return responseFormatter.handleInternal(call, callback, 'Failed to send email');
            }
            return responseFormatter.handleOk(call, callback, appMessage.user.fetch, { data }, null);
        } catch (error) {
            serverLogger.error(appMessage.user.notFound, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    },
    fetchProfileActivityLogs: async (call, callback) => {
        try {
            const metadata = call.metadata?.getMap() || {};

            const { page, limit, sortBy, search, performedBy, actionType, actionModule } = call.request.reqQueries || {};

            const filterData = {
                ...(actionType && { actionType }),
                ...(actionModule && { actionModule }),
                ...(performedBy && { performedBy }),
                ...({ performedFor: metadata["auth-user-id"] })
            }
            let data = await userHelper.retrieveActivityLogs(filterData, sortBy, search, { page: Number(page) || 1, limit: Number(limit) || 10 });

            return responseFormatter.handleOk(call, callback, appMessage.user.fetchAll, {
                data: data.docs, pagination: {
                    totalDocs: data.totalDocs,
                    limit: data.limit,
                    page: data.page,
                    totalPages: data.totalPages,
                    nextPage: data.nextPage,
                    prevPage: data.prevPage,
                    hasPrevPage: data.hasPrevPage,
                    hasNextPage: data.hasNextPage
                }
            });
        } catch (error) {
            serverLogger.error(appMessage.user.notFound, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    },
    fetchUserActivityLogs: async (call, callback) => {
        try {
            const { page, limit, sortBy, search, performedBy, performedFor, actionType, actionModule } = call.request.reqQueries || {};
            const filterData = {
                ...(actionType && { actionType }),
                ...(actionModule && { actionModule }),
                ...(performedBy && { performedBy }),
                ...(performedFor && { performedFor })
            }

            let data = await userHelper.retrieveActivityLogs(filterData, sortBy, search, { page: Number(page) || 1, limit: Number(limit) || 10 });

            return responseFormatter.handleOk(call, callback, appMessage.user.fetchAll, {
                data: data.docs, pagination: {
                    totalDocs: data.totalDocs,
                    limit: data.limit,
                    page: data.page,
                    totalPages: data.totalPages,
                    nextPage: data.nextPage,
                    prevPage: data.prevPage,
                    hasPrevPage: data.hasPrevPage,
                    hasNextPage: data.hasNextPage
                }
            }
            );
        } catch (error) {
            serverLogger.error(appMessage.user.notFound, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    },
    updateProfile: async (call, callback) => {
        try {
            const { firstName, middleName, lastName, userName, gender, profileImage } = call.request;
            const metadata = call.metadata?.getMap() || {};

            const existsUserName = await userHelper.retrieve({ userName });

            if (existsUserName && String(existsUserName._id) != metadata["auth-user-id"]) {
                return responseFormatter.handleAlreadyExists(call, callback, appMessage.user.userNameAlreadyTaken);
            }

            let updatedProfileUrl = "";
            if (profileImage) {
                updatedProfileUrl = await moveFileWithOverwrite(
                    profileImage,
                    `users/${String(existsUserName._id)}/profile${path.extname(profileImage)}`,
                    existsUserName.profileImage || ""
                )
            }

            const data = await userHelper.update({ _id: metadata["auth-user-id"] }, { firstName, middleName, lastName, userName, gender, ...(profileImage && updatedProfileUrl && { profileImage: updatedProfileUrl }) });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }
            return responseFormatter.handleOk(call, callback, appMessage.user.update, { data }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.User,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.User,
            });
        } catch (error) {
            serverLogger.error(appMessage.user.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.updateError);
        }
    },
    resendUserInvitation: async (call, callback) => {
        try {
            const { userId, userType } = call.request.reqParams || {};

            let data = await userHelper.retrieve({ _id: userId });

            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            } else if (data.isEmailVerified) {
                return responseFormatter.handleCancelled(call, callback, appMessage.user.alreadyInvitationAccepted);
            }

            const token = await jwtUtil.generateInvitationVerificationToken({ userId: data._id, email: data.email })
            sendEmail.sendInvitationEmail(data, token, userType || "");
            return responseFormatter.handleOk(call, callback, appMessage.user.invitationSent, { data }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.RESEND_INVITATION,
                moduleType: appConstant.LOGGED_MODULES.User,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.User,
            });
        } catch (error) {
            serverLogger.error(appMessage.user.createError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.createError);
        }
    }
};