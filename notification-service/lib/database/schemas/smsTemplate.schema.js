const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const smsTemplateSchema = new mongoose.Schema({
    templateName: { type: String, default: "" },
    message: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

smsTemplateSchema.plugin(aggregatePaginate);
smsTemplateSchema.index({ location: "2dsphere" });

module.exports = smsTemplateSchema;
