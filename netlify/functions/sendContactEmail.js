// netlify/functions/sendContactEmail.js
import fetch from 'node-fetch';

export async function handler(event) {
 

  // after:
const {
    firstName,
    lastName,
    phone,
    email,
    preferredContact,
    topic,
    message
  } = JSON.parse(event.body);

  // call the Netlify Emails endpoint for your template
  await fetch(
    `${process.env.URL}/.netlify/functions/emails/contact-confirmation`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'netlify-emails-secret': process.env.NETLIFY_EMAILS_SECRET,
      },
      body: JSON.stringify({
        from:    'janallmartin@gmail.com',     // must be a verified sender in SendGrid
        to:      email,
        subject: 'Thanks for contacting me!',
        parameters: { firstName, message }
      }),
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ msg: 'Email sent' }),
  };
}
