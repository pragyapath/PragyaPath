const nodemailer = require('nodemailer');
const config = require('./config');

/**
 * Sends an email notification for a new inquiry.
 * @param {object} inquiry 
 */
const sendInquiryNotification = async (inquiry) => {
    const { name, email, phone, message } = inquiry;
    const timestamp = new Date().toLocaleString();

    const mailOptions = {
        from: `"Pragya Path Website" <${config.EMAIL_USER}>`,
        to: config.EMAIL_USER, // Send to studio owner
        subject: `New Inquiry from ${name} – Pragya Path`,
        text: `
New Inquiry Details:
-------------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Date: ${timestamp}

Message:
${message}
        `.trim()
    };

    if (config.NODE_ENV === 'development') {
        console.log('--- DEVELOPMENT MODE: EMAIL NOT SENT ---');
        console.log('To:', mailOptions.to);
        console.log('Subject:', mailOptions.subject);
        console.log('Body:', mailOptions.text);
        console.log('-----------------------------------------');
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            host: config.EMAIL_HOST,
            port: config.EMAIL_PORT,
            secure: config.EMAIL_PORT == 465, // true for 465, false for other ports
            auth: {
                user: config.EMAIL_USER,
                pass: config.EMAIL_PASS
            }
        });

        await transporter.sendMail(mailOptions);
        console.log(`Inquiry notification email sent for ${name}`);
    } catch (error) {
        console.error('FAILED to send inquiry email:', error);
        // We log but don't re-throw to prevent crashing the form submission
    }
};

module.exports = {
    sendInquiryNotification
};
