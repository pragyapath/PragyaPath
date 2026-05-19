# Implementation Plan: Pragya Path Improvements

## Overview

Incrementally harden and extend the existing Express.js/EJS single-page application. Each task builds on the previous one, starting with the foundational infrastructure (env config, lib modules, Tailwind build) and finishing with wiring everything together in `server.js` and the views.

## Tasks

- [x] 1. Set up environment configuration and project scaffolding
  - Install missing production dependencies: `dotenv`, `helmet`, `express-rate-limit`
  - Install dev dependencies: `tailwindcss`, `jest`, `fast-check`
  - Create `lib/` directory and stub files: `lib/config.js`, `lib/validator.js`, `lib/mailer.js`
  - Create `views/partials/` directory for EJS partials
  - Create `public/css/` directory for Tailwind source and output
  - Add `public/css/output.css` to `.gitignore`
  - Create `.env.example` with all required variables and inline comments
  - _Requirements: 1.1, 1.2, 1.4, 1.5_

- [ ] 2. Implement `lib/config.js` — environment variable loading and validation
  - [x] 2.1 Implement `lib/config.js`
    - Call `require('dotenv').config()` at the top of the module
    - Export `PORT` (default `3001`), `NODE_ENV` (default `development`), and all `EMAIL_*` variables
    - Implement and export `validateEnv()` — checks for missing required variables, logs a descriptive error, and calls `process.exit(1)` if any are absent
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 2.2 Write unit tests for `lib/config.js`
    - Test that `validateEnv()` exits with code 1 when a required variable is missing
    - Test that `validateEnv()` does not exit when all required variables are present
    - _Requirements: 1.3_

- [ ] 3. Implement `lib/validator.js` — inquiry form validation and sanitization
  - [x] 3.1 Implement `stripHtml(str)` in `lib/validator.js`
    - Strip all HTML tags using a regex replace (no external library)
    - Export the function
    - _Requirements: 2.6_

  - [x] 3.2 Implement `validateInquiry(body)` in `lib/validator.js`
    - Validate `name`: required, 2–100 chars
    - Validate `email`: required, valid RFC 5321 format (regex-based)
    - Validate `message`: required, 10–2000 chars
    - Validate `phone`: optional; if present, only digits/spaces/`+`/`-`/`()`, 7–20 chars
    - Return `{ valid: true, values: { sanitized fields } }` on success (apply `stripHtml` to all fields)
    - Return `{ valid: false, errors: { field: message } }` on failure with a non-empty error per failing field
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [ ]* 3.3 Write property test for `validateInquiry` — Property 1
    - **Property 1: Validator correctly classifies all inquiry inputs**
    - Generate fully valid inputs (name 2–100 printable chars, valid email, message 10–2000 chars, optional valid phone) and assert `valid: true`
    - Generate inputs with at least one deliberately invalid field and assert `valid: false` with a non-empty error for each failing field
    - Tag: `// Feature: pragya-path-improvements, Property 1: Validator correctly classifies all inquiry inputs`
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

  - [ ]* 3.4 Write property test for `stripHtml` — Property 2 (idempotency)
    - **Property 2: HTML stripping is idempotent**
    - Generate arbitrary strings and assert `stripHtml(stripHtml(s)) === stripHtml(s)`
    - Tag: `// Feature: pragya-path-improvements, Property 2: HTML stripping is idempotent`
    - **Validates: Requirements 2.6**

  - [ ]* 3.5 Write property test for `stripHtml` — Property 3 (no tags in output)
    - **Property 3: Sanitized values contain no HTML tags**
    - Generate arbitrary strings (including nested/malformed HTML) and assert the output contains no substring matching `/<[^>]+>/`
    - Tag: `// Feature: pragya-path-improvements, Property 3: Sanitized values contain no HTML tags`
    - **Validates: Requirements 2.6**

  - [ ]* 3.6 Write unit tests for `lib/validator.js`
    - Test boundary lengths: name at 1, 2, 100, 101 chars
    - Test invalid email formats (missing `@`, missing domain, etc.)
    - Test message at 9, 10, 2000, 2001 chars
    - Test phone with illegal characters and at boundary lengths
    - Test that all four fields are HTML-stripped in the returned `values`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.6_

- [ ] 4. Checkpoint — Ensure all validator and config tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement `lib/mailer.js` — Nodemailer email notifications
  - [~] 5.1 Implement `sendInquiryNotification(inquiry)` in `lib/mailer.js`
    - Create a Nodemailer transporter using `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` from `lib/config.js`
    - When `NODE_ENV === 'development'`, log the email content to the console instead of sending
    - Format subject as `New Inquiry from <name> – Pragya Path`
    - Format plain-text body with name, email, phone (if present), message, and submission timestamp
    - Wrap `transporter.sendMail` in try/catch; log errors but do not re-throw
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 5.2 Write property test for `lib/mailer.js` — Property 4
    - **Property 4: Email notification contains all required content**
    - Mock `nodemailer.createTransport` to capture the mail options passed to `sendMail`
    - Generate arbitrary valid inquiry objects (with and without `phone`) and assert subject contains `name`, body contains `name`, `email`, `message`, and `date`; when `phone` is present, assert it appears in the body
    - Tag: `// Feature: pragya-path-improvements, Property 4: Email notification contains all required content`
    - **Validates: Requirements 3.3**

  - [ ]* 5.3 Write unit tests for `lib/mailer.js`
    - Test that `sendMail` is called with correct subject and body for a full inquiry
    - Test that phone is omitted from the body when not provided
    - Test that in `development` mode the console is used instead of `sendMail`
    - _Requirements: 3.3, 3.5_

- [ ] 6. Set up Tailwind CSS build step
  - [~] 6.1 Create `tailwind.config.js`
    - Set `content` to `['./views/**/*.ejs', './public/**/*.js']`
    - Extend theme with brand colours (`brand-orange: '#F18931'`, `brand-dark: '#1a1a1a'`, `brand-bg: '#FCFAF7'`, `brand-navy: '#0F2C4A'`) and font families (`serif: Playfair Display`, `sans: Montserrat`)
    - _Requirements: 9.1_

  - [~] 6.2 Create `public/css/input.css`
    - Add `@tailwind base`, `@tailwind components`, `@tailwind utilities` directives
    - _Requirements: 9.2_

  - [~] 6.3 Add `build:css` and `dev:css` scripts to `package.json`
    - `"build:css": "tailwindcss -i ./public/css/input.css -o ./public/css/output.css --minify"`
    - `"dev:css": "tailwindcss -i ./public/css/input.css -o ./public/css/output.css --watch"`
    - _Requirements: 9.3, 9.4_

- [ ] 7. Create EJS partials and new view templates
  - [~] 7.1 Create `views/partials/head.ejs`
    - Include `<meta charset>`, `<meta viewport>`, `<title>`, Google Fonts `<link>`, and `<link rel="stylesheet" href="/css/output.css">`
    - Add SEO meta tags: `<meta name="description">` (≤160 chars), `<meta name="robots" content="index, follow">`, `<meta name="geo.region" content="NP">`, `<meta name="geo.placename" content="Bhaktapur, Nepal">`
    - Add Open Graph tags: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`
    - Add `<link rel="canonical">` pointing to the production URL
    - Do NOT include the CDN Tailwind `<script>` tag or inline `tailwind.config` block
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 9.5, 9.6_

  - [~] 7.2 Create `views/partials/nav.ejs`
    - Extract the existing `<nav>` markup from `index.ejs` into this partial
    - Add a hamburger button (`<button id="menu-toggle">`) visible only below the `lg` breakpoint
    - Add a mobile dropdown `<div id="mobile-menu">` with all nav links (Home, Services, Schedule & Pricing, About Us, Blog, Contact Us, Book a Class), hidden by default, using `brand-navy` background and white text
    - Add a `<script>` block with vanilla JS: toggle `hidden` class on `#mobile-menu` when `#menu-toggle` is clicked; close the menu when any link inside it is clicked
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [~] 7.3 Create `views/success.ejs`
    - Include `views/partials/head.ejs` and `views/partials/nav.ejs`
    - Display a confirmation heading, a thank-you message stating the studio will respond within 24 hours, and a "Back to Home" button linking to `/`
    - Add `<meta http-equiv="refresh" content="10;url=/">` for auto-redirect after 10 seconds
    - Use brand fonts, colours, and logo consistent with the main site
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [~] 7.4 Create `views/error.ejs`
    - Include `views/partials/head.ejs` and `views/partials/nav.ejs`
    - Accept `statusCode`, `message`, and `stack` (optional) template variables
    - Display the status code, a human-readable message, and a "Back to Home" link
    - Render the stack trace only when `NODE_ENV !== 'production'`
    - Use brand fonts, colours (`brand-orange`, `brand-navy`, `brand-bg`), and logo
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.6_

  - [~] 7.5 Refactor `views/index.ejs`
    - Replace the `<head>` block with `<%- include('partials/head') %>`
    - Replace the `<nav>` block with `<%- include('partials/nav') %>`
    - Remove the CDN `<script src="https://cdn.tailwindcss.com">` tag
    - Remove the inline `tailwind.config` script block
    - Add the `phone` input field (optional) between the email and message fields in the inquiry form
    - Add EJS conditionals to display field-level validation error messages next to each field (using `errors` and `values` template variables)
    - _Requirements: 2.5, 2.7, 9.5, 9.6_

- [~] 8. Create static SEO files
  - Create `public/sitemap.xml` listing the home page URL with a `<lastmod>` date
  - Create `public/robots.txt` allowing all crawlers and referencing the sitemap URL
  - _Requirements: 8.5, 8.6_

- [ ] 9. Refactor `server.js` — wire all modules together
  - [~] 9.1 Replace bare startup with config loading and validation
    - Require `lib/config.js` as the first import
    - Call `config.validateEnv()` before `app.listen()`
    - Use `config.PORT` and `config.NODE_ENV` throughout
    - _Requirements: 1.1, 1.2, 1.3_

  - [~] 9.2 Apply security middleware
    - Add `helmet()` as the first middleware (before all routes)
    - Configure `express.urlencoded({ extended: false, limit: '10kb' })` (replacing the current `extended: true` with no limit)
    - Remove the `X-Powered-By` header (Helmet handles this, or call `app.disable('x-powered-by')`)
    - _Requirements: 4.1, 4.4, 4.5_

  - [~] 9.3 Apply rate limiter to `POST /inquiry`
    - Create an `express-rate-limit` instance: `windowMs: 15 * 60 * 1000`, `max: 10`, `standardHeaders: true`, `legacyHeaders: false`
    - Add a custom `handler` that renders `error.ejs` with HTTP 429 and a "Too many requests" message
    - Apply the limiter only to `POST /inquiry`
    - _Requirements: 4.2, 4.3_

  - [~] 9.4 Refactor `POST /inquiry` route handler
    - Call `validateInquiry(req.body)` from `lib/validator.js`
    - If invalid: re-render `index.ejs` with `{ errors, values }` (preserve user input)
    - If valid: save sanitized inquiry to `inquiries.json` (switch from `data.json`), call `sendInquiryNotification`, redirect to `/success`
    - Wrap in try/catch and forward errors to next
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.4_

  - [~] 9.5 Add `GET /success`, `GET /sitemap.xml`, `GET /robots.txt` routes
    - `GET /success`: render `success.ejs`
    - `GET /sitemap.xml`: serve `public/sitemap.xml` with `Content-Type: application/xml`
    - `GET /robots.txt`: serve `public/robots.txt` with `Content-Type: text/plain`
    - Wrap async handlers in try/catch
    - _Requirements: 6.1, 8.5, 8.6_

  - [~] 9.6 Add 404 catch-all and global error-handling middleware
    - Add a catch-all route after all defined routes that renders `error.ejs` with HTTP 404 and "Page Not Found"
    - Add Express error-handling middleware `(err, req, res, next)` that renders `error.ejs` with HTTP 500, passing `stack` only when `NODE_ENV !== 'production'`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [~] 10. Final checkpoint — Ensure all tests pass
  - Run `npm test` and confirm all unit and property tests pass
  - Run `npm run build:css` and confirm `public/css/output.css` is generated
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with a minimum of 100 iterations per property
- Unit tests use Jest
- The Tailwind build (`npm run build:css`) must be run before starting the server so `output.css` exists
- For local development, run `npm run dev:css` in a separate terminal alongside `npm run dev`
- `inquiries.json` replaces `data.json` as the inquiry storage file; `data.json` can be removed after migration
