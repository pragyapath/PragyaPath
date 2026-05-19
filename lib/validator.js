/**
 * Strips all HTML tags from a string using regex.
 * @param {string} str 
 * @returns {string}
 */
const stripHtml = (str) => {
    if (typeof str !== 'string') return '';
    return str.replace(/<[^>]*>?/gm, '');
};

/**
 * Validates and sanitizes the inquiry form data.
 * @param {object} body 
 * @returns {object} { valid: boolean, values: object, errors: object }
 */
const validateInquiry = (body) => {
    const errors = {};
    const sanitized = {};

    // Name validation
    const name = (body.name || '').trim();
    if (!name) {
        errors.name = 'Name is required';
    } else if (name.length < 2 || name.length > 100) {
        errors.name = 'Name must be between 2 and 100 characters';
    }
    sanitized.name = stripHtml(name);

    // Email validation (RFC 5321 based regex)
    const email = (body.email || '').trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Invalid email format';
    }
    sanitized.email = stripHtml(email);

    // Message validation
    const message = (body.message || '').trim();
    if (!message) {
        errors.message = 'Message is required';
    } else if (message.length < 10 || message.length > 2000) {
        errors.message = 'Message must be between 10 and 2000 characters';
    }
    sanitized.message = stripHtml(message);

    // Phone validation (optional)
    const phone = (body.phone || '').trim();
    if (phone) {
        const phoneRegex = /^[0-9\s+\-()]{7,20}$/;
        if (!phoneRegex.test(phone)) {
            errors.phone = 'Invalid phone format (7-20 chars, digits, spaces, +, -, ())';
        }
    }
    sanitized.phone = stripHtml(phone);

    return {
        valid: Object.keys(errors).length === 0,
        values: sanitized,
        errors
    };
};

module.exports = {
    stripHtml,
    validateInquiry
};
