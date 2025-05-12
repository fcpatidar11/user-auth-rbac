const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userContactSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "users", required: false },
    contact: { type: String },
    countryCode: { type: String },
    dialCode: { type: String },
    contactType: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userContactSchema.plugin(aggregatePaginate);

module.exports = userContactSchema;
