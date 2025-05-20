const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const emailTemplateSchema = new mongoose.Schema({
    templateName: { type: String, default: "" },
    sendFrom: { type: String, required: true },
    subject: { type: String, required: true },
    templateBody: { type: String, required: true },
    template: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    markers: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

emailTemplateSchema.plugin(aggregatePaginate);
emailTemplateSchema.index({ location: "2dsphere" });

module.exports = emailTemplateSchema;
