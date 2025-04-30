// netlify/functions/sendContactEmail.js

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    console.error('Invalid JSON:', err);
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const {
    firstName,
    lastName,
    phone,
    email,
    preferredContact,
    topic,
    message
  } = data;

  // Build your email — you can use data in the subject or body
  const msg = {
    to:      'janallmartin@gmail.com',        
    from:    'janallmartin@gmail.com',   
    subject: `New contact from ${firstName} ${lastName}`,
    html: `
      <h2>New Inquiry</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Preferred Contact:</strong> ${preferredContact}</p>
      <p><strong>Topic:</strong> ${topic}</p>
      <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
    `
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'Email sent' })
    };
  } catch (error) {
    console.error('SendGrid error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email failed to send' })
    };
  }
};