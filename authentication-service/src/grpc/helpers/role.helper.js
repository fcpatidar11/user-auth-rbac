const mongoose = require("mongoose");
const { Role } = require("@database/app.database");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    create: async (insertData) => {
        try {
            const data = await Role.create({
                ...insertData,
                ...(insertData.group && { group: new ObjectId(insertData.group) }),
                ...(insertData.permissions && {
                    permissions: insertData.permissions.map(x => new ObjectId(x))
                })
            });
            return await Role.findOne({ _id: data._id }).populate("group").populate("permissions").populate({
                path: "permissions",
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
            return await Role.findOneAndUpdate({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) }),
                ...(filterData.group && { group: new ObjectId(filterData.group) })
            }, {
                $set: {
                    ...updateData,
                    ...(updateData.group && { group: new ObjectId(updateData.group) }),
                    ...(updateData.permissions && {
                        permissions: updateData.permissions.map(x => new ObjectId(x))
                    })
                }
            }, { new: true }).populate("group").populate("permissions").populate({
                path: "permissions",
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
            return await Role.findOne({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) }),
                ...(filterData.group && { group: new ObjectId(filterData.group) })
            }).populate("group").populate("permissions").populate({
                path: "permissions",
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
                        ...(filterData._id && { _id: new ObjectId(filterData._id) }),
                        ...(filterData.group && { group: new ObjectId(filterData.group) })
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
                { $unwind: "$group" },
                {
                    $lookup: {
                        from: "permissions",
                        as: "permissions",
                        let: { permissions: "$permissions" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ["$_id", "$$permissions"]
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
            ];
            return await Role.aggregate(query);
        } catch (error) {
            throw error;
        }
    }
}