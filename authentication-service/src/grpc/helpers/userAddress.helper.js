const mongoose = require("mongoose");
const { UserAddress } = require("@database/app.database");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    create: async (insertData) => {
        try {
            return await UserAddress.create({
                ...insertData,
                ...(insertData && insertData.user && { user: new ObjectId(insertData.user) }),
                ...(insertData && insertData.location && {
                    location: {
                        ...insertData.location,
                        ...(!insertData.location.type && { type: "Point" })
                    }
                })
            });
        } catch (error) {
            throw error;
        }
    },
    update: async (filterData, updateData) => {
        try {
            return await UserAddress.findOneAndUpdate({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData.user && { user: new ObjectId(filterData.user) }),
                ...(filterData._id && { _id: new ObjectId(filterData._id) })
            }, {
                $set: {
                    ...Object.fromEntries(
                        Object.entries(updateData).filter(([_, v]) => v != null)
                    ),
                    ...(updateData && updateData.location && {
                        location: {
                            ...updateData.location,
                            ...(!updateData.location.type && { type: "Point" })
                        }
                    })
                }
            }, { new: true });
        } catch (error) {
            throw error;
        }
    },
    retrieve: async (filterData) => {
        try {
            return await UserAddress.findOne({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData.user && { user: new ObjectId(filterData.user) }),
                ...(filterData._id && { _id: new ObjectId(filterData._id) })
            });
        } catch (error) {
            throw error;
        }
    },
    deleteOne: async (filterData) => {
        try {
            return await UserAddress.findOneAndDelete({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData.user && { user: new ObjectId(filterData.user) }),
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
                        ...(filterData.user && { user: new ObjectId(filterData.user) }),
                        ...(filterData._id && { _id: new ObjectId(filterData._id) })
                    }
                }
            ];
            return await UserAddress.aggregate(query);
        } catch (error) {
            throw error;
        }
    }
}