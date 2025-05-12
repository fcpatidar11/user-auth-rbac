const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    group: { type: mongoose.Types.ObjectId, ref: "role_groups", required: true },
    permissions: [{ type: mongoose.Types.ObjectId, ref: "permissions", required: true }],
    isSystem: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

roleSchema.index({ name: 1 }, { unique: true });

roleSchema.plugin(aggregatePaginate);

roleSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    if (this.permissions && this.permissions.length > 0) {
        const uniquePermissions = [...new Set(this.permissions.map(p => p.toString()))];
        this.permissions = uniquePermissions.map(p => new mongoose.Types.ObjectId(p));
    }
    next();
});

module.exports = roleSchema;
