const mongoose = require("mongoose");
const { UserRelationship } = require("@database/app.database");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    create: async (insertData) => {
        try {
            const data = await UserRelationship.create({
                ...insertData,
                ...(insertData.parentUser && { parentUser: new ObjectId(insertData.parentUser) }),
                ...(insertData.permissions && {
                    permissions: insertData.permissions.map(x => new ObjectId(x))
                })
            });

            return await UserRelationship.findOne({ _id: data._id })
                .populate("parentUser")
                .populate("childUser").populate("permissions").populate({
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
            return await UserRelationship.findOne({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) }),
                ...(filterData.parentUser && { parentUser: new ObjectId(filterData.parentUser) }),
                ...(filterData.childUser && { childUser: new ObjectId(filterData.childUser) }),
            }).populate("parentUser")
                .populate("childUser")
                .populate("permissions").populate({
                    path: "permissions",
                    populate: {
                        path: "group"
                    }
                });
        } catch (error) {
            throw error;
        }
    },
    deleteOne: async (filterData) => {
        try {
            const result = await UserRelationship.deleteOne({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                _id: new ObjectId(filterData._id) // Ensure _id is ObjectId
            });

            return result.deletedCount > 0; // Returns `true` if a document was deleted, otherwise `false`
        } catch (error) {
            throw error;
        }
    },
    update: async (filterData, updateData) => {
        try {
            return await UserRelationship.findOneAndUpdate({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) })
            }, {
                $set: {
                    ...updateData,
                    ...(updateData.permissions && {
                        permissions: updateData.permissions.map(x => new ObjectId(x))
                    })
                }
            }, { new: true, projection: { password: 0 } })
                .populate("parentUser")
                .populate("childUser")
                .populate("permissions").populate({
                    path: "permissions",
                    populate: {
                        path: "group"
                    }
                });
        } catch (error) {
            throw error;
        }
    }
}