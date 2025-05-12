const mongoose = require("mongoose");
const { Permission } = require("@database/app.database");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    create: async (insertData) => {
        try {
            const data = await Permission.create({
                ...insertData,
                ...(insertData.group && { group: new ObjectId(insertData.group) })
            });
            return await Permission.findOne({ _id: data._id }).populate("group");
        } catch (error) {
            throw error;
        }
    },
    update: async (filterData, updateData) => {
        try {
            return await Permission.findOneAndUpdate({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) }),
                ...(filterData.group && { group: new ObjectId(filterData.group) })
            }, {
                $set: {
                    ...updateData,
                    ...(updateData.group && { group: new ObjectId(updateData.group) })
                }
            }, { new: true }).populate("group");
        } catch (error) {
            throw error;
        }
    },
    retrieve: async (filterData) => {
        try {
            return await Permission.findOne({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) }),
                ...(filterData.group && { group: new ObjectId(filterData.group) })
            }).populate("group");
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
                { $unwind: "$group" },
            ];
            return await Permission.aggregate(query);
        } catch (error) {
            throw error;
        }
    }
}