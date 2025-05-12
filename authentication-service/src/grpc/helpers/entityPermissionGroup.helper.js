const mongoose = require("mongoose");
const { EntityPermissionGroup } = require("@database/app.database");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    create: async (insertData) => {
        try {
            const data = await EntityPermissionGroup.create({
                ...insertData,
                ...(insertData.grantPermissions && {
                    grantPermissions: insertData.grantPermissions.map(x => new ObjectId(x))
                }),
                ...(insertData.revokePermissions && {
                    revokePermissions: insertData.revokePermissions.map(x => new ObjectId(x))
                }),
                ...(insertData.relationshipPermissions && insertData.relationshipPermissions.length && {
                    relationshipPermissions: insertData.relationshipPermissions.map(x => {
                        return {
                            relationship: x.relationship,
                            permissions: x.permissions.map(x => new ObjectId(x))
                        }
                    })
                })
            });
            return await EntityPermissionGroup.findOne({ _id: data._id })
                .populate("grantPermissions")
                .populate("revokePermissions")
                .populate("relationshipPermissions.permissions")
                .populate({
                    path: "grantPermissions",
                    populate: {
                        path: "group"
                    }
                }).populate({
                    path: "revokePermissions",
                    populate: {
                        path: "group"
                    }
                }).populate({
                    path: "relationshipPermissions.permissions",
                    populate: {
                        path: "group"
                    }
                });
        } catch (error) {
            throw error;
        }
    },
    update: async (filterData, updateData) => {
        try {
            return await EntityPermissionGroup.findOneAndUpdate({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) })
            }, {
                $set: {
                    ...updateData,
                    ...(updateData.grantPermissions && {
                        grantPermissions: updateData.grantPermissions.map(x => new ObjectId(x))
                    }),
                    ...(updateData.revokePermissions && {
                        revokePermissions: updateData.revokePermissions.map(x => new ObjectId(x))
                    }),
                    ...(updateData.relationshipPermissions && updateData.relationshipPermissions.length && {
                        relationshipPermissions: updateData.relationshipPermissions.map(x => {
                            return {
                                relationship: x.relationship,
                                permissions: x.permissions.map(x => new ObjectId(x))
                            }
                        })
                    })
                }
            }, { new: true })
                .populate("grantPermissions")
                .populate("revokePermissions")
                .populate("relationshipPermissions.permissions")
                .populate({
                    path: "grantPermissions",
                    populate: {
                        path: "group"
                    }
                }).populate({
                    path: "revokePermissions",
                    populate: {
                        path: "group"
                    }
                }).populate({
                    path: "relationshipPermissions.permissions",
                    populate: {
                        path: "group"
                    }
                });
        } catch (error) {
            throw error;
        }
    },
    retrieve: async (filterData) => {
        try {
            return await EntityPermissionGroup.findOne({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) })
            }).populate("grantPermissions")
                .populate("revokePermissions")
                .populate("relationshipPermissions.permissions")
                .populate({
                    path: "grantPermissions",
                    populate: {
                        path: "group"
                    }
                }).populate({
                    path: "revokePermissions",
                    populate: {
                        path: "group"
                    }
                }).populate({
                    path: "relationshipPermissions.permissions",
                    populate: {
                        path: "group"
                    }
                });
        } catch (error) {
            throw error;
        }
    },
    retrieves: async (filterData) => {
        try {
            const query = [
                {
                    $match: {
                        ...Object.fromEntries(
                            Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                        ),
                        ...(filterData._id && { _id: new ObjectId(filterData._id) })
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
                                        $in: ["$_id", "$$grantPermissions"]
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
                                        $in: ["$_id", "$$revokePermissions"]
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
                    $unwind: {
                        "path": "$relationshipPermissions",
                        "preserveNullAndEmptyArrays": true
                    }
                },
                {
                    $lookup: {
                        from: "permissions",
                        as: "relationshipPermissions.permissions",
                        let: { relationshipPermissions: { $ifNull: ["$relationshipPermissions.permissions", []] } },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ["$_id", "$$relationshipPermissions"]
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
                    $group: {
                        _id: "$_id",
                        root: { $mergeObjects: "$$ROOT" },
                        relationshipPermissions: {
                            $push: {
                                $cond: {
                                    if: { $gt: [{ $size: "$relationshipPermissions.permissions" }, 0] },
                                    then: "$relationshipPermissions",
                                    else: "$$REMOVE"
                                }
                            }
                        }
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: {
                            $mergeObjects: ["$root", "$$ROOT"]
                        }
                    }
                },
                {
                    $project: {
                        root: 0
                    }
                },
                {
                    $addFields: {
                        relationshipPermissions: {
                            $cond: {
                                if: { $isArray: '$relationshipPermissions' },
                                then: "$relationshipPermissions",
                                else: [],
                            }
                        }
                    }
                }
            ];
            return await EntityPermissionGroup.aggregate(query);
        } catch (error) {
            throw error;
        }
    }
}