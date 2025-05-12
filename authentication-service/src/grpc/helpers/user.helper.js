const mongoose = require("mongoose");
const { User, UserActivityLog } = require("@database/app.database");
const escapeStringRegexp = require("regex-escape");
const appConstant = require("@constants/app.constant");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    create: async (userData) => {
        try {
            const data = await User.create({
                ...userData,
                ...(userData.roles && {
                    roles: userData.roles.map(x => new ObjectId(x))
                }),
                ...(userData.grantPermissions && {
                    grantPermissions: userData.grantPermissions.map(x => new ObjectId(x))
                }),
                ...(userData.revokePermissions && {
                    revokePermissions: userData.revokePermissions.map(x => new ObjectId(x))
                })
            });

            return await User.findOne({ _id: data._id })
                .populate("grantPermissions")
                .populate("roles")
                .populate("revokePermissions")
                .populate([{
                    path: "grantPermissions",
                    populate: {
                        path: "group"
                    }
                }])
                .populate([{
                    path: "roles",
                    populate: [{
                        path: "group"
                    }, {
                        path: "permissions",
                        populate: {
                            path: "group"
                        }
                    }]
                }])
                .populate([{
                    path: "revokePermissions",
                    populate: {
                        path: "group"
                    }
                }]);
        } catch (error) {
            throw error;
        }
    },
    update: async (filterData, updateData) => {
        try {
            return await User.findOneAndUpdate({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) })
            }, {
                $set: {
                    ...updateData,
                    ...(updateData.roles && {
                        roles: updateData.roles.map(x => new ObjectId(x))
                    }),
                    ...(updateData.revokePermissions && {
                        revokePermissions: updateData.revokePermissions.map(x => new ObjectId(x))
                    }),
                    ...(updateData.grantPermissions && {
                        grantPermissions: updateData.grantPermissions.map(x => new ObjectId(x))
                    })
                }
            }, { new: true, projection: { password: 0 } })
                .populate("grantPermissions")
                .populate("roles")
                .populate("revokePermissions")
                .populate([{
                    path: "grantPermissions",
                    populate: {
                        path: "group"
                    }
                }])
                .populate([{
                    path: "roles",
                    populate: [{
                        path: "group"
                    }, {
                        path: "permissions",
                        populate: {
                            path: "group"
                        }
                    }]
                }])
                .populate([{
                    path: "revokePermissions",
                    populate: {
                        path: "group"
                    }
                }]);
        } catch (error) {
            throw error;
        }
    },
    retrieve: async (filterData) => {
        try {
            return await User.findOne({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) })
            }, { projection: { password: 0 } })
                .populate("grantPermissions")
                .populate("roles")
                .populate("revokePermissions")
                .populate([{
                    path: "grantPermissions",
                    populate: {
                        path: "group"
                    }
                }])
                .populate([{
                    path: "roles",
                    populate: [{
                        path: "group"
                    }, {
                        path: "permissions",
                        populate: {
                            path: "group"
                        }
                    }]
                }])
                .populate([{
                    path: "revokePermissions",
                    populate: {
                        path: "group"
                    }
                }]);
        } catch (error) {
            throw error;
        }
    },
    fetchPassword: async (filterData) => {
        try {
            const data = await User.findOne({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) })
            }, { projection: { password: 0 } });
            return data?.password;
        } catch (error) {
            throw error;
        }
    },
    retrieves: async (filterData, sortBy, search, userType, paginate, relationshipFilters) => {
        try {
            let sort = { createdAt: -1 };
            if (Object.keys(appConstant.USERS_SORTING).includes(sortBy)) {
                sort = appConstant.USERS_SORTING[sortBy];
            }
            const { parentUserId, childUserId, relationshipType } = relationshipFilters;

            let query = [
                {
                    $addFields: {
                        fullName: {
                            $cond: {
                                if: { $eq: ["$middleName", ""] },
                                then: { $concat: ["$firstName", " ", "$lastName"] },
                                else: { $concat: ["$firstName", " ", "$middleName", " ", "$lastName"] }
                            }
                        }
                    }
                },
                {
                    $match: {
                        ...Object.fromEntries(
                            Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                        ),
                        ...(filterData._id && { _id: new ObjectId(filterData._id) }),
                        ...(search && {
                            $or: [
                                { userName: { $regex: new RegExp(escapeStringRegexp(decodeURIComponent(search)), "i") } },
                                { email: { $regex: new RegExp(escapeStringRegexp(decodeURIComponent(search)), "i") } },
                                { fullName: { $regex: new RegExp(escapeStringRegexp(decodeURIComponent(search)), "i") } }
                            ]
                        })
                    }
                },
                {
                    $lookup: {
                        from: "permissions",
                        as: "grantPermissions",
                        let: { grantPermissions: { $ifNull: ["$grantPermissions", []] } },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $in: ["$_id", "$$grantPermissions"] }
                                        ]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    from: "permission_groups",
                                    as: "group",
                                    let: { group: "$group" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$group"],
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            { $unwind: "$group" }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "permissions",
                        as: "revokePermissions",
                        let: { revokePermissions: { $ifNull: ["$revokePermissions", []] } },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $in: ["$_id", "$$revokePermissions"] }
                                        ]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    from: "permission_groups",
                                    as: "group",
                                    let: { group: "$group" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$group"],
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            { $unwind: "$group" }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "roles",
                        as: "roles",
                        let: {
                            roles: { $ifNull: ["$roles", []] }
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $in: ["$_id", "$$roles"] }
                                        ]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    from: "permissions",
                                    as: "permissions",
                                    let: { permissions: "$permissions" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $in: ["$_id", "$$permissions"],
                                                }
                                            }
                                        },
                                        {
                                            $lookup: {
                                                from: "permission_groups",
                                                as: "group",
                                                let: { group: "$group" },
                                                pipeline: [
                                                    {
                                                        $match: {
                                                            $expr: {
                                                                $eq: ["$_id", "$$group"],
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        { $unwind: "$group" }
                                    ]
                                }
                            },
                            {
                                $lookup: {
                                    from: "role_groups",
                                    as: "group",
                                    let: { group: "$group" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$group"],
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            { $unwind: "$group" }
                        ]
                    }
                }
            ];
            if (userType) {
                query.push({
                    $addFields: {
                        roleNames: {
                            $map: {
                                input: "$roles",
                                as: "role",
                                in: "$$role.name"
                            }
                        }
                    }
                });
                query.push({
                    $match: {
                        $expr: { $in: [userType, "$roleNames"] }
                    }
                });
            }
            if (parentUserId || childUserId) {
                query.push({
                    $lookup: {
                        from: "user_relationships",
                        as: "userRelationship",
                        let: { userId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: [
                                                    "$childUser",
                                                    childUserId ? { "$toObjectId": childUserId } : "$$userId"
                                                ]
                                            },
                                            {
                                                $eq: [
                                                    "$parentUser",
                                                    parentUserId ? { "$toObjectId": parentUserId } : "$$userId"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    from: "permissions",
                                    as: "permissions",
                                    let: { permissions: "$permissions" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $in: ["$_id", "$$permissions"],
                                                }
                                            }
                                        },
                                        {
                                            $lookup: {
                                                from: "permission_groups",
                                                as: "group",
                                                let: { group: "$group" },
                                                pipeline: [
                                                    {
                                                        $match: {
                                                            $expr: {
                                                                $eq: ["$_id", "$$group"],
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        { $unwind: "$group" }
                                    ]
                                }
                            }
                        ]
                    }
                });
                if (relationshipType) {
                    query.push({
                        $unwind: {
                            "path": "$userRelationship",
                            "preserveNullAndEmptyArrays": true
                        }
                    });
                    query.push({
                        $addFields: {
                            isAssignedUser: {
                                $cond: {
                                    if: { $eq: [{ $type: '$userRelationship' }, 'object'] },
                                    then: true,
                                    else: false,
                                }
                            }
                        }
                    });
                    query.push({ $match: { isAssignedUser: appConstant.RELATIONSHIP_TYPES.ASSIGN == relationshipType ? true : false } });
                } else {
                    query.push({ $unwind: "$userRelationship" });
                }
            }
            query.push({ $sort: sort });
            return await User.aggregatePaginate(
                User.aggregate(query, { projection: { password: 0 } }),
                paginate
            );
        } catch (error) {
            throw error;
        }
    },
    retrieveActivityLogs: async (filterData, sortBy, search, paginate) => {
        try {
            let sort = { createdAt: -1 };
            if (Object.keys(appConstant.LOGGED_SORTING).includes(sortBy)) {
                sort = appConstant.LOGGED_SORTING[sortBy];
            }

            let query = [
                {
                    $match: {
                        ...Object.fromEntries(
                            Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                        ),
                        ...(search && {
                            $or: [
                                { ipAddress: { $regex: new RegExp(escapeStringRegexp(decodeURIComponent(search)), "i") } },
                                { deviceType: { $regex: new RegExp(escapeStringRegexp(decodeURIComponent(search)), "i") } },
                                { userAgent: { $regex: new RegExp(escapeStringRegexp(decodeURIComponent(search)), "i") } }
                            ]
                        })
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        as: "performedBy",
                        let: { performedBy: "$performedBy" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: [
                                            "$_id",
                                            { "$toObjectId": "$$performedBy" }
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                },
                { $unwind: "$performedBy" },
                {
                    $lookup: {
                        from: "users",
                        as: "performedFor",
                        let: { performedFor: "$performedFor" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: [
                                            "$_id",
                                            { "$toObjectId": "$$performedFor" }
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                },
                { $unwind: "$performedFor" }
            ];

            query.push({ $sort: sort });
            return await UserActivityLog.aggregatePaginate(
                UserActivityLog.aggregate(query, { projection: { password: 0 } }),
                paginate
            );
        } catch (error) {
            throw error;
        }
    },
    dashboardOverview: async (requestData) => {
        const { userId, isSuperAdmin, isAdmin, isPartner, isCustomer, isSubsidiary, isTechnician } = requestData;

        let query = [
            {
                $lookup: {
                    from: "roles",
                    as: "roles",
                    let: { roles: "$roles" },
                    pipeline: [
                        {
                            $match: { $expr: { $in: ["$_id", "$$roles"] } }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    roleNames: {
                        $map: {
                            input: "$roles",
                            as: "role",
                            in: "$$role.name"
                        }
                    }
                }
            },
            {
                $facet: {
                    roleCounts: [
                        {
                            $group: {
                                _id: null,
                                totalSuperAdmins: { $sum: { $cond: [{ $in: [appConstant.DEFAULT_ROLES.SUPER_ADMIN, "$roleNames"] }, 1, 0] } },
                                totalAdmins: { $sum: { $cond: [{ $in: [appConstant.DEFAULT_ROLES.ADMIN, "$roleNames"] }, 1, 0] } },
                                totalPartners: { $sum: { $cond: [{ $in: [appConstant.DEFAULT_ROLES.PARTNER, "$roleNames"] }, 1, 0] } },
                                totalCustomers: { $sum: { $cond: [{ $in: [appConstant.DEFAULT_ROLES.CUSTOMER, "$roleNames"] }, 1, 0] } },
                                totalSubsidiaries: { $sum: { $cond: [{ $in: [appConstant.DEFAULT_ROLES.SUBSIDIARY, "$roleNames"] }, 1, 0] } }
                            }
                        }
                    ],
                    otherData: [
                        {
                            $lookup: {
                                from: "user_relationships",
                                as: "linkCustomers",
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$parentUser", { "$toObjectId": userId }] } } },
                                    {
                                        $lookup: {
                                            from: "roles",
                                            as: "roles",
                                            let: { roles: "$roles" },
                                            pipeline: [
                                                {
                                                    $match: { $expr: { $in: ["$_id", "$$roles"] } }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        $addFields: {
                                            roleNames: {
                                                $map: {
                                                    input: "$roles",
                                                    as: "role",
                                                    in: "$$role.name"
                                                }
                                            }
                                        }
                                    },
                                    { $match: { $expr: { $in: [appConstant.DEFAULT_ROLES.CUSTOMER, "$roleNames"] } } }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: "user_relationships",
                                as: "linkSubsidiaries",
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$childUser", { "$toObjectId": userId }] } } },
                                    {
                                        $lookup: {
                                            from: "roles",
                                            as: "roles",
                                            let: { roles: "$roles" },
                                            pipeline: [
                                                {
                                                    $match: { $expr: { $in: ["$_id", "$$roles"] } }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        $addFields: {
                                            roleNames: {
                                                $map: {
                                                    input: "$roles",
                                                    as: "role",
                                                    in: "$$role.name"
                                                }
                                            }
                                        }
                                    },
                                    { $match: { $expr: { $in: [appConstant.DEFAULT_ROLES.SUBSIDIARY, "$roleNames"] } } }
                                ]
                            }
                        },
                        {
                            $addFields: {
                                totalLinkSubsidiaries: { $ifNull: [{ $size: "$linkSubsidiaries" }, 0] },
                                totalLinkCustomers: { $ifNull: [{ $size: "$linkCustomers" }, 0] },
                                isSubsidiaryOverview: { $literal: isSubsidiary },
                                isSuperAdminOverview: { $literal: isSuperAdmin },
                                isAdminOverview: { $literal: isAdmin },
                                isPartnerOverview: { $literal: isPartner },
                                isCustomerOverview: { $literal: isCustomer },
                                isTechnicianOverview: { $literal: isTechnician }
                            }
                        }
                    ]
                }
            },
            {
                $unwind: "$roleCounts"
            },
            {
                $unwind: "$otherData"
            },
            {
                $lookup: {
                    from: "roles",
                    as: "allRoles",
                    pipeline: []  // Fetch all roles
                }
            },
            {
                $addFields: {
                    totalRoles: { $size: "$allRoles" }
                }
            },
            {
                $addFields: {
                    superAdminOverview: {
                        $cond: [
                            { $eq: ["$otherData.isSuperAdminOverview", true] },
                            {
                                totalSuperAdmins: "$roleCounts.totalSuperAdmins",
                                totalAdmins: "$roleCounts.totalAdmins",
                                totalPartners: "$roleCounts.totalPartners",
                                totalCustomers: "$roleCounts.totalCustomers",
                                totalSubsidiaries: "$roleCounts.totalSubsidiaries",
                                totalRoles: "$totalRoles",
                                totalJobs: 0,
                                totalProcessJobs: 0,
                                totalCompletedJobs: 0,
                                totalDraftJobs: 0
                            },
                            null
                        ]
                    },
                    adminOverview: {
                        $cond: [
                            { $eq: ["$otherData.isAdminOverview", true] },
                            {
                                totalPartners: "$roleCounts.totalPartners",
                                totalCustomers: "$roleCounts.totalCustomers",
                                totalSubsidiaries: "$roleCounts.totalSubsidiaries",
                                totalJobs: 0,
                                totalProcessJobs: 0,
                                totalCompletedJobs: 0,
                                totalDraftJobs: 0
                            },
                            null
                        ]
                    },
                    partnerOverview: {
                        $cond: [
                            { $eq: ["$otherData.isPartnerOverview", true] },
                            {
                                totalCustomers: "$roleCounts.totalCustomers",
                                totalSubsidiaries: "$roleCounts.totalSubsidiaries",
                                totalJobs: 0,
                                totalProcessJobs: 0,
                                totalCompletedJobs: 0,
                                totalDraftJobs: 0
                            },
                            null
                        ]
                    },
                    technicianOverview: {
                        $cond: [
                            { $eq: ["$otherData.isTechnicianOverview", true] },
                            {
                                totalJobs: 0,
                                totalProcessJobs: 0,
                                totalCompletedJobs: 0
                            },
                            null
                        ]
                    },
                    customerOverview: {
                        $cond: [
                            { $eq: ["$otherData.isCustomerOverview", true] },
                            {
                                totalLinkSubsidiaries: "$otherData.totalLinkSubsidiaries",
                                totalJobs: 0,
                                totalProcessJobs: 0,
                                totalCompletedJobs: 0
                            },
                            null
                        ]
                    },
                    subsidiaryOverview: {
                        $cond: [
                            { $eq: ["$otherData.isSubsidiaryOverview", true] },
                            {
                                totalLinkCustomers: "$otherData.totalLinkCustomers"
                            },
                            null
                        ]
                    }
                }
            }
        ];

        const data = await User.aggregate(query);
        return data.length ? data[0] : null;
    }

}