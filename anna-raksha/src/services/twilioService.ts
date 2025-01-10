// src/services/twilioService.ts
import twilio from 'twilio';

// Twilio setup (Use environment variables)
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export const sendSMS = async (to: string, message: string) => {
  try {
    await client.messages.create({
      body: message,
      to,  // The phone number to send SMS to
      from: process.env.TWILIO_PHONE_NUMBER!,  // Your Twilio phone number
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};
