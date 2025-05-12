const mongoose = require("mongoose");
const { RoleGroup } = require("@database/app.database");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    create: async (insertData) => {
        try {
            return await RoleGroup.create(insertData);
        } catch (error) {
            throw error;
        }
    },
    update: async (filterData, updateData) => {
        try {
            return await RoleGroup.findOneAndUpdate({
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
            return await RoleGroup.findOne({
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
            return await RoleGroup.aggregate(query);
        } catch (error) {
            throw error;
        }
    }
}