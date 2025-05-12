const appConstant = require("@constants/app.constant");
const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userActivityLogSchema = new mongoose.Schema({
    performedBy: { type: mongoose.Schema.Types.String, required: true },
    performedFor: { type: mongoose.Schema.Types.String, required: true },
    actionType: { type: mongoose.Schema.Types.String, required: true, enum: Object.values(appConstant.LOGGED_ACTIONS) },
    moduleType: { type: mongoose.Schema.Types.String, required: true, enum: Object.values(appConstant.LOGGED_MODULES) },
    deviceType: { type: mongoose.Schema.Types.String, required: true },
    ipAddress: { type: mongoose.Schema.Types.String, required: false },
    userAgent: { type: mongoose.Schema.Types.String, required: false },
    loggedAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    entityId: { type: mongoose.Schema.Types.String, required: false },
    entityType: { type: mongoose.Schema.Types.String, required: false, enum: Object.values(appConstant.LOGGED_ENTITY_TYPES) },
    metadata: { type: mongoose.Schema.Types.String, required: false },
    requestDetails: { type: mongoose.Schema.Types.String, required: false },
    previousData: { type: mongoose.Schema.Types.String, required: false },
    newData: { type: mongoose.Schema.Types.String, required: false },
    remarks: { type: mongoose.Schema.Types.String, required: false, },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now }
});

userActivityLogSchema.plugin(aggregatePaginate);

userActivityLogSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = userActivityLogSchema;
