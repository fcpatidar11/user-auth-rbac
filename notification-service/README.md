# Notification Service

A robust microservice for handling various types of notifications including email, SMS, and push notifications. The service supports multiple providers for each notification type and includes features like template management and verification codes.

## Features

- **Email Notifications**

  - Template-based email sending
  - Support for multiple email providers:
    - SendGrid
    - SMTP
    - AWS SES
    - OneSignal
  - HTML email support
  - Attachment support

- **SMS Notifications**

  - Template-based SMS sending
  - Support for multiple SMS providers:
    - Twilio
    - AWS SNS
    - OneSignal
    - Nexmo
    - TextMagic
  - OTP/Verification code support

- **Push Notifications**
  - Support for multiple push notification providers:
    - OneSignal (Primary)
    - Firebase Cloud Messaging (FCM)
    - AWS SNS
    - Expo
  - Custom data payload support
  - Platform-specific configurations

## Prerequisites

- Node.js (v14 or higher)
- gRPC
- MongoDB
- Required API keys and credentials for notification providers

## Environment Variables

```env
# Service Configuration
NOTIFICATION_SERVICE_ADDRESS=localhost:50051
NOTIFICATION_SERVICE_DATABASE_URL=mongodb://localhost:27017/notification-service
NOTIFICATION_SERVICE_PROTO_PATH=/path/to/proto-schemas

# Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_EMAIL=your_email@example.com
SMTP_PASSWORD=your_smtp_password
SMTP_FROM_EMAIL=noreply@example.com

# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_ACCOUNT_OTP_SID=your_twilio_otp_sid
TWILIO_PHONE_NUMBER=your_twilio_phone

# Nexmo Configuration
NEXMO_API_KEY=your_nexmo_api_key
NEXMO_API_SECRET=your_nexmo_api_secret
NEXMO_FROM_NUMBER=your_nexmo_number

# TextMagic Configuration
TEXTMAGIC_USERNAME=your_textmagic_username
TEXTMAGIC_API_KEY=your_textmagic_api_key

# Push Notification Configuration
USE_FCM=true
ONESIGNAL_APP_ID=your_onesignal_app_id
ONESIGNAL_API_KEY=your_onesignal_api_key
EXPO_ACCESS_TOKEN=your_expo_access_token
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd notification-service
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the service:

```bash
npm run start:local
```

## API Documentation

### gRPC Services

The service exposes the following gRPC endpoints:

#### Email Notifications

```protobuf
rpc sendEmailNotification(SendEmailNotificationRequest) returns (notificationResponse)
```

#### SMS Notifications

```protobuf
rpc sendSMSNotification(SendSMSNotificationRequest) returns (notificationResponse)
rpc sendVerificationCode(SendVerificationCodeRequest) returns (notificationResponse)
rpc verifyOTPCode(VerifyOTPCodeRequest) returns (notificationResponse)
```

#### Push Notifications

```protobuf
rpc sendPushNotification(SendPushNotificationRequest) returns (notificationResponse)
```

## Usage Examples

### Sending an Email Notification

```javascript
const notificationService = require("./notification-service");

const emailRequest = {
  email: "user@example.com",
  templateName: "welcome_email",
  templateVariables: [{ pattern: "{{name}}", value: "John Doe" }],
};

notificationService.sendEmailNotification(emailRequest);
```

### Sending a Push Notification

```javascript
const notificationService = require("./notification-service");

const pushRequest = {
  deviceToken: "device_token_here",
  title: "Welcome!",
  body: "Welcome to our app",
  user: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  },
};

notificationService.sendPushNotification(pushRequest);
```

### Sending an SMS Notification

```javascript
const notificationService = require("./notification-service");

// Regular SMS notification
const smsRequest = {
  phoneNumber: "+1234567890",
  templateName: "welcome_sms",
  templateVariables: [{ pattern: "{{name}}", value: "John Doe" }],
};

notificationService.sendSMSNotification(smsRequest);

// Sending OTP/Verification Code
const otpRequest = {
  phoneNumber: "+1234567890",
};

notificationService.sendVerificationCode(otpRequest);

// Verifying OTP Code
const verifyRequest = {
  phoneNumber: "+1234567890",
  code: "123456",
};

notificationService.verifyOTPCode(verifyRequest);
```

## Error Handling

The service includes comprehensive error handling:

- Validation errors for required fields
- Provider-specific error handling
- Detailed error logging
- Fallback mechanisms for failed notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.
