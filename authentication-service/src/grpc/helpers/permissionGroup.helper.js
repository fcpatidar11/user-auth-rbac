const mongoose = require("mongoose");
const { PermissionGroup } = require("@database/app.database");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    create: async (permissionGroupData) => {
        try {
            return await PermissionGroup.create(permissionGroupData);
        } catch (error) {
            throw error;
        }
    },
    update: async (filterData, updateData) => {
        try {
            return await PermissionGroup.findOneAndUpdate({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) })
            }, {
                $set: updateData
            }, { new: true });
        } catch (error) {
            throw error;
        }
    },
    retrieve: async (filterData) => {
        try {
            return await PermissionGroup.findOne({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) })
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
                }
            ];
            return await PermissionGroup.aggregate(query);
        } catch (error) {
            throw error;
        }
    }
}