const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userAddressSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "users", required: false },
    streetName: { type: String },
    address: { type: String, default: "Point" },
    city: { type: String },
    country: { type: String },
    subdivision: { type: String },
    addressType: { type: String },
    location: {
        type: { type: String },
        coordinates: [Number, Number]
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userAddressSchema.plugin(aggregatePaginate);
userAddressSchema.index({ location: "2dsphere" });

module.exports = userAddressSchema;
