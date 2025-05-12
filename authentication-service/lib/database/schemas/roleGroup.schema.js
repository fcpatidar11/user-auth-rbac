const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const roleGroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

roleGroupSchema.index({ name: 1 }, { unique: true });

roleGroupSchema.plugin(aggregatePaginate);

roleGroupSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = roleGroupSchema;
