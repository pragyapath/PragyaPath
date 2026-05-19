# Requirements Document

## Introduction

Pragya Path is a Hatha Yoga & Sound Healing studio website located in Bhaktapur, Nepal. The current site is a single-page Express.js/EJS application with a contact inquiry form. This document captures requirements to make the project fully production-ready — covering server-side validation, email notifications, security hardening, SEO, mobile navigation, a Tailwind CSS build step, styled error/success pages, and proper error handling. Admin panel and booking system are explicitly out of scope.

---

## Glossary

- **Server**: The Express.js Node.js application defined in `server.js`
- **Inquiry_Form**: The HTML form in `index.ejs` that collects visitor name, email, and message
- **Mailer**: The Nodemailer-based email notification module
- **Validator**: The server-side input validation and sanitization layer
- **Rate_Limiter**: The middleware that restricts the number of requests per IP within a time window
- **Helmet**: The `helmet` npm package that sets secure HTTP response headers
- **Env_Config**: The environment variable configuration loaded from a `.env` file via `dotenv`
- **Tailwind_CLI**: The Tailwind CSS command-line build tool that compiles a static CSS file
- **Success_Page**: The EJS-rendered page shown after a successful inquiry submission
- **Error_Page**: The EJS-rendered page shown when a 404 or 500 error occurs
- **SEO_Meta**: The set of HTML `<meta>` and Open Graph tags in the page `<head>`
- **Mobile_Nav**: The hamburger-menu-based navigation shown on screens narrower than the `lg` Tailwind breakpoint

---

## Requirements

### Requirement 1: Environment Configuration

**User Story:** As a developer, I want all sensitive values and environment-specific settings stored in a `.env` file, so that credentials are never hard-coded and the app can be configured per environment without code changes.

#### Acceptance Criteria

1. THE Server SHALL load configuration from a `.env` file using the `dotenv` package before any other module initialisation.
2. THE Env_Config SHALL expose the following variables: `PORT`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO`, and `NODE_ENV`.
3. IF a required environment variable is missing at startup, THEN THE Server SHALL log a descriptive error message and exit with a non-zero status code.
4. THE Server SHALL default `PORT` to `3001` and `NODE_ENV` to `development` when those variables are absent.
5. THE Env_Config SHALL provide a `.env.example` file listing all required variables with placeholder values and inline comments.

---

### Requirement 2: Server-Side Input Validation and Sanitization

**User Story:** As a studio owner, I want all inquiry form submissions validated and sanitized on the server, so that malformed or malicious data is never stored or forwarded.

#### Acceptance Criteria

1. WHEN an inquiry is submitted, THE Validator SHALL verify that `name` is a non-empty string of 2–100 characters.
2. WHEN an inquiry is submitted, THE Validator SHALL verify that `email` matches a valid RFC 5321 email format.
3. WHEN an inquiry is submitted, THE Validator SHALL verify that `message` is a non-empty string of 10–2000 characters.
4. WHEN an inquiry is submitted, THE Validator SHALL verify that `phone`, if provided, contains only digits, spaces, `+`, `-`, and `()`, and is between 7 and 20 characters.
5. IF any validation rule fails, THEN THE Server SHALL re-render the Inquiry_Form with the original field values preserved and a descriptive, field-level error message displayed next to each invalid field.
6. WHEN an inquiry passes all validation rules, THE Validator SHALL strip all HTML tags from `name`, `email`, `phone`, and `message` before storage or forwarding.
7. THE Inquiry_Form SHALL include a `phone` field (optional) between the email and message fields.

---

### Requirement 3: Email Notifications via Nodemailer

**User Story:** As a studio owner, I want to receive an email notification whenever a visitor submits an inquiry, so that I can respond promptly without checking the JSON file manually.

#### Acceptance Criteria

1. WHEN a valid inquiry is saved, THE Mailer SHALL send an email to the address specified in `EMAIL_TO`.
2. THE Mailer SHALL use the SMTP credentials from `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, and `EMAIL_PASS` provided by Env_Config.
3. THE Mailer SHALL format the notification email with a subject of `New Inquiry from <name> – Pragya Path` and a plain-text body containing the submitter's name, email, phone (if provided), message, and submission timestamp.
4. IF the email send fails, THEN THE Mailer SHALL log the error and THE Server SHALL still redirect the visitor to the Success_Page — the inquiry SHALL already be persisted to storage.
5. WHERE `NODE_ENV` is `development`, THE Mailer SHALL log the email content to the console instead of sending it, so that no real emails are dispatched during local development.

---

### Requirement 4: Security Hardening

**User Story:** As a developer, I want the application to follow web security best practices, so that common attack vectors are mitigated before the site goes live.

#### Acceptance Criteria

1. THE Server SHALL apply the `helmet` middleware to all routes, setting secure HTTP headers including `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, and `Strict-Transport-Security`.
2. THE Rate_Limiter SHALL restrict each IP address to a maximum of 10 POST requests to `/inquiry` within any 15-minute window.
3. IF a visitor exceeds the rate limit, THEN THE Server SHALL respond with HTTP status 429 and render a styled error message informing the visitor to try again later.
4. THE Server SHALL set `express.urlencoded` with `extended: false` and enforce a maximum request body size of 10 KB.
5. THE Server SHALL remove the `X-Powered-By: Express` header from all responses.

---

### Requirement 5: Proper Error Handling

**User Story:** As a visitor, I want to see a helpful, branded page when something goes wrong, so that I am not confronted with raw error output or a blank screen.

#### Acceptance Criteria

1. WHEN a request is made to a route that does not exist, THE Server SHALL respond with HTTP status 404 and render the Error_Page with a "Page Not Found" message and a link back to the home page.
2. WHEN an unhandled server error occurs, THE Server SHALL respond with HTTP status 500 and render the Error_Page with a "Something went wrong" message and a link back to the home page.
3. WHERE `NODE_ENV` is `production`, THE Error_Page SHALL NOT display stack traces or internal error details.
4. WHERE `NODE_ENV` is `development`, THE Error_Page SHALL display the error stack trace to aid debugging.
5. THE Server SHALL wrap all async route handlers in a try/catch block and forward errors to the Express error-handling middleware.
6. THE Error_Page SHALL use the same brand fonts, colours (`brand-orange`, `brand-navy`, `brand-bg`), and logo as the main site.

---

### Requirement 6: Styled Success Page

**User Story:** As a visitor, I want to see a branded confirmation page after submitting an inquiry, so that I feel confident my message was received.

#### Acceptance Criteria

1. WHEN an inquiry is successfully saved, THE Server SHALL redirect the visitor to `/success` and render the Success_Page as an EJS template.
2. THE Success_Page SHALL display a confirmation heading, a brief message thanking the visitor and stating that the studio will respond within 24 hours, and a "Back to Home" button linking to `/`.
3. THE Success_Page SHALL use the same brand fonts, colours, and logo as the main site.
4. THE Success_Page SHALL include a `<meta http-equiv="refresh" content="10;url=/">` tag so the visitor is automatically redirected to the home page after 10 seconds.

---

### Requirement 7: Mobile Navigation

**User Story:** As a mobile visitor, I want a usable navigation menu on small screens, so that I can access all sections of the site without needing a desktop browser.

#### Acceptance Criteria

1. WHEN the viewport width is below the Tailwind `lg` breakpoint (1024 px), THE Mobile_Nav SHALL display a hamburger icon button in the top-right corner of the navbar.
2. WHEN the hamburger button is tapped, THE Mobile_Nav SHALL reveal a full-width dropdown menu containing all navigation links: Home, Services, Schedule & Pricing, About Us, Blog, Contact Us, and Book a Class.
3. WHEN a navigation link in the dropdown is tapped, THE Mobile_Nav SHALL close the dropdown and scroll to the target section.
4. WHEN the hamburger button is tapped while the dropdown is open, THE Mobile_Nav SHALL close the dropdown.
5. THE Mobile_Nav SHALL be implemented using vanilla JavaScript with no additional libraries.
6. THE Mobile_Nav dropdown SHALL use the `brand-navy` background colour and white text, consistent with the desktop navbar style.

---

### Requirement 8: SEO Basics

**User Story:** As a studio owner, I want the website to have proper SEO meta tags, so that it appears correctly in search engine results and social media link previews.

#### Acceptance Criteria

1. THE SEO_Meta SHALL include a `<meta name="description">` tag with a concise description of Pragya Path (maximum 160 characters).
2. THE SEO_Meta SHALL include Open Graph tags: `og:title`, `og:description`, `og:type`, `og:url`, and `og:image`.
3. THE SEO_Meta SHALL include a `<link rel="canonical">` tag pointing to the production URL.
4. THE SEO_Meta SHALL include `<meta name="robots" content="index, follow">`.
5. THE Server SHALL serve a `sitemap.xml` file at `/sitemap.xml` listing the home page URL with a `<lastmod>` date.
6. THE Server SHALL serve a `robots.txt` file at `/robots.txt` that allows all crawlers and references the sitemap URL.
7. THE SEO_Meta SHALL include `<meta name="geo.region" content="NP">` and `<meta name="geo.placename" content="Bhaktapur, Nepal">` for local SEO.

---

### Requirement 9: Tailwind CSS Build Step

**User Story:** As a developer, I want Tailwind CSS compiled to a static file at build time, so that the production site loads faster and does not depend on the CDN runtime script.

#### Acceptance Criteria

1. THE Tailwind_CLI SHALL be configured via a `tailwind.config.js` file that includes all content paths (`views/**/*.ejs`, `public/**/*.js`) and preserves the existing custom theme (brand colours and font families).
2. THE Tailwind_CLI SHALL compile `public/css/input.css` (containing `@tailwind base`, `@tailwind components`, `@tailwind utilities`) into `public/css/output.css`.
3. THE `package.json` SHALL include a `"build:css"` script that runs `tailwindcss -i ./public/css/input.css -o ./public/css/output.css --minify`.
4. THE `package.json` SHALL include a `"dev:css"` script that runs the Tailwind CLI in `--watch` mode alongside `nodemon`.
5. THE `index.ejs` SHALL reference `public/css/output.css` via a `<link>` tag and SHALL NOT include the CDN `<script src="https://cdn.tailwindcss.com">` tag.
6. THE `index.ejs` SHALL NOT contain an inline `tailwind.config` script block after the build step is in place.
7. THE `public/css/output.css` file SHALL be listed in `.gitignore` as a build artefact.
