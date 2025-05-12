const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const permissionGroupSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

permissionGroupSchema.index({ name: 1 }, { unique: true });

permissionGroupSchema.plugin(aggregatePaginate);

permissionGroupSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = permissionGroupSchema;
