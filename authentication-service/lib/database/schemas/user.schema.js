const appConstant = require("@constants/app.constant");
const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, default: "" },
    lastName: { type: String, required: true },
    userName: { type: String, default: "" },
    email: { type: String, required: true },
    password: { type: String, default: "" },
    gender: {
        type: String,
        enum: Object.values(appConstant.GENDER_TYPES),
        default: appConstant.GENDER_TYPES.MALE
    },
    profileImage: { type: String, default: "" },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    grantPermissions: [{ type: mongoose.Types.ObjectId, ref: "permissions", required: false }],
    roles: [{ type: mongoose.Types.ObjectId, ref: "roles", required: true }],
    revokePermissions: [{ type: mongoose.Types.ObjectId, ref: "permissions", required: false }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ userName: 1 }, { unique: true });

userSchema.plugin(aggregatePaginate);

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    if (this.grantPermissions && this.grantPermissions.length > 0) {
        const uniqueGrantPermissions = [...new Set(this.grantPermissions.map(p => p.toString()))];
        this.grantPermissions = uniqueGrantPermissions.map(p => new mongoose.Types.ObjectId(p));
    }
    if (this.roles && this.roles.length > 0) {
        const uniqueRoles = [...new Set(this.roles.map(p => p.toString()))];
        this.roles = uniqueRoles.map(p => new mongoose.Types.ObjectId(p));
    }
    if (this.revokePermissions && this.revokePermissions.length > 0) {
        const uniqueRevokePermissions = [...new Set(this.revokePermissions.map(p => p.toString()))];
        this.revokePermissions = uniqueRevokePermissions.map(p => new mongoose.Types.ObjectId(p));
    }
    next();
});

module.exports = userSchema;
