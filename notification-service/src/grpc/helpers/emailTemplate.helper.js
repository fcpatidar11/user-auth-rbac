const mongoose = require("mongoose");
const { EmailTemplate } = require("@database/app.database");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    retrieve: async (filterData) => {
        try {
            return await EmailTemplate.findOne({
                ...Object.fromEntries(
                    Object.entries(filterData).filter(([_, v]) => v != null && v !== '')
                ),
                ...(filterData._id && { _id: new ObjectId(filterData._id) }),
                ...(filterData.group && { group: new ObjectId(filterData.group) }),
                isActive: true
            })
        } catch (error) {
            throw error;
        }
    }
}