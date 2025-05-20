const appConfig = require("@configs/app.config");
const mongoose = require('mongoose');
const EmailTemplateSchema = require("@lib/database/schemas/emailTemplate.schema");
const SMSTemplateSchema = require("@lib/database/schemas/smsTemplate.schema");


mongoose.connect(appConfig.AUTHENTICATION_SERVICE_DATABASE_URL);

mongoose.connection.on('error', (error) => {
    console.error('❌ MongoDB connection error in authentication service:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('❌ MongoDB disconnected in authentication service');
});

module.exports = {
    EmailTemplate: mongoose.model("email_templates", EmailTemplateSchema),
    SMSTemplate: mongoose.model("sms_templates", SMSTemplateSchema),
}
