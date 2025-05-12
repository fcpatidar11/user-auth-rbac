const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const EntityPermissionGroup = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    grantPermissions: [{ type: mongoose.Types.ObjectId, ref: "permissions", required: true }],
    revokePermissions: [{ type: mongoose.Types.ObjectId, ref: "permissions", required: true }],
    relationshipPermissions: [{
        relationship: { type: String, required: true },
        permissions: [{ type: mongoose.Types.ObjectId, ref: "permissions", required: true }]
    }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

EntityPermissionGroup.index({ name: 1 }, { unique: true });

EntityPermissionGroup.plugin(aggregatePaginate);

EntityPermissionGroup.pre('save', function (next) {
    this.updatedAt = Date.now();
    if (this.permissions && this.permissions.length > 0) {
        const uniquePermissions = [...new Set(this.permissions.map(p => p.toString()))];
        this.permissions = uniquePermissions.map(p => new mongoose.Types.ObjectId(p));
    }
    next();
});

module.exports = EntityPermissionGroup;
