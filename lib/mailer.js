const { Resend } = require('resend');
const config = require('./config');

// Only initialize Resend if the API key is present so the server doesn't crash on startup
const resend = config.RESEND_API_KEY ? new Resend(config.RESEND_API_KEY) : null;

/**
 * Sends an email notification for a new inquiry.
 * @param {object} inquiry 
 */
const sendInquiryNotification = async (inquiry) => {
    const { name, email, phone, message } = inquiry;
    const timestamp = new Date().toLocaleString();

    // The text version of the email
    const textBody = `
New Inquiry Details:
-------------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Date: ${timestamp}

Message:
${message}
    `.trim();

    // Optionally format as HTML for a nicer reading experience
    const htmlBody = `
      <h3>New Inquiry from ${name}</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Date:</strong> ${timestamp}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `;

    const mailOptions = {
        from: `Pragya Path Website <${config.EMAIL_FROM}>`,
        to: config.EMAIL_TO,
        reply_to: email, // So hitting 'reply' replies to the user who filled the form
        subject: `New Inquiry from ${name} – Pragya Path`,
        text: textBody,
        html: htmlBody
    };

    if (!resend) {
        console.log('--- EMAIL SYSTEM DISABLED (NO RESEND_API_KEY SET) ---');
        console.log('To:', mailOptions.to);
        console.log('Subject:', mailOptions.subject);
        console.log('Body:', mailOptions.text);
        console.log('-----------------------------------------------------');
        return;
    }

    try {
        const { data, error } = await resend.emails.send(mailOptions);
        
        if (error) {
            console.error('Resend API returned an error:', error);
            return;
        }

        console.log(`Inquiry notification email sent for ${name}. ID:`, data?.id);
    } catch (error) {
        console.error('FAILED to send inquiry email via Resend:', error);
        // We log but don't re-throw to prevent crashing the form submission
    }
};

module.exports = {
    sendInquiryNotification
};
