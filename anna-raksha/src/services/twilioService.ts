// src/services/twilioService.ts
import twilio from 'twilio';

const client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

// Send SMS using Twilio
export const sendSMS = (phoneNumber: string, message: string) => {
  client.messages.create({
    body: message,
    from: 'YOUR_TWILIO_PHONE_NUMBER',
    to: phoneNumber,
  });
};
