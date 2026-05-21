'use strict';

const dotenv = require('dotenv');
dotenv.config();

const config = {
  PORT:       parseInt(process.env.PORT, 10) || 3000,
  NODE_ENV:   process.env.NODE_ENV || 'development',
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  EMAIL_TO:   process.env.EMAIL_TO || 'pragyapath1@gmail.com',
  EMAIL_FROM: process.env.EMAIL_FROM || 'onboarding@resend.dev',
};

/**
 * Warn about missing email config in dev; hard-fail in production.
 */
const validateEnv = () => {
  const missing  = [];
  if (!process.env.RESEND_API_KEY) missing.push('RESEND_API_KEY');

  if (missing.length > 0) {
    const msg = `Missing env vars: ${missing.join(', ')}`;
    console.warn(`[config] WARNING – ${msg}`);
    console.warn('[config] Email sending will fail until these are configured.');
  }
};

module.exports = { ...config, validateEnv };
