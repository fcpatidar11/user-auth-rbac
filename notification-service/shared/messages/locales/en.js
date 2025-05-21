module.exports = {
	"common": {
		"error": "An error has occurred."
	},
	"notification": {
		"templateInvalid": "Invalid template key in email send",
		"emailNotificationSent": "Email notification sent successfully.",
		"emailNotificationFailed": "Email notification failed to send.",
		"smsNotificationSent": "SMS notification sent successfully.",
		"smsNotificationFailed": "SMS notification failed to send.",
		"pushNotificationSent": "Push notification sent successfully.",
		"pushNotificationFailed": "Push notification failed to send.",
		"verified": "Verification successful.",
		"invalidCode": "Invalid or expired code.",
		"verificationFailed": "Verification failed.",
	},
	"validation": {
		"required": {
			"email": "Email is required.",
			"firstName": "First name is required.",
			"lastName": "Last name is required.",
			"phoneNumber": "Phone number is required.",
			"code": "Code is required.",
			"templateName": "Template name is required.",
			"templateVariables": "Template variables are required.",
			"templateVariablePattern": "Template variable pattern is required.",
			"templateVariableValue": "Template variable value is required.",
			"deviceToken": "Device token is required.",
			"title": "Title is required.",
			"body": "Body is required.",
		},
		"string": {
			"email": "Email must be a string.",
			"firstName": "First name must be a string.",
			"lastName": "Last name must be a string.",
			"phoneNumber": "Phone number must be a string.",
			"code": "Code must be a string.",
			"templateName": "Template name must be a string.",
			"templateVariablePattern": "Template variable pattern must be a string.",
			"templateVariableValue": "Template variable value must be a string.",
			"deviceToken": "Device token must be a string.",
			"title": "Title must be a string.",
			"body": "Body must be a string.",
		},
		"array": {
			"templateVariables": "Template variables must be an array.",
		},
		"common": {
			"emailInvalid": "Email format is invalid."
		}
	}
};