const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userRelationship = new mongoose.Schema({
    parentUser: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    childUser: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    isActive: { type: Boolean, default: true },
    permissions: [{ type: mongoose.Types.ObjectId, ref: "permissions", required: false }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userRelationship.plugin(aggregatePaginate);

userRelationship.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

userRelationship.index({ parentUser: 1, childUser: 1 }, { unique: true })

module.exports = userRelationship;
