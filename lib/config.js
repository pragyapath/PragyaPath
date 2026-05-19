'use strict';

const dotenv = require('dotenv');
dotenv.config();

const config = {
  PORT:       parseInt(process.env.PORT, 10) || 3000,
  NODE_ENV:   process.env.NODE_ENV || 'development',
  EMAIL_HOST: process.env.EMAIL_HOST || '',
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT, 10) || 587,
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
};

/**
 * Warn about missing email config in dev; hard-fail in production.
 */
const validateEnv = () => {
  const required = ['EMAIL_HOST', 'EMAIL_USER', 'EMAIL_PASS'];
  const missing  = required.filter(k => !process.env[k]);

  if (missing.length > 0) {
    const msg = `Missing env vars: ${missing.join(', ')}`;
    if (config.NODE_ENV === 'production') {
      console.error(`[config] FATAL – ${msg}`);
      process.exit(1);
    } else {
      console.warn(`[config] WARNING – ${msg}`);
      console.warn('[config] Email sending will be skipped in development.');
    }
  }
};

module.exports = { ...config, validateEnv };
