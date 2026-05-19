# Pragya Path — Hatha Yoga & Sound Healing

Website for Pragya Path yoga studio in Bhaktapur, Nepal.

## Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Server     | Node.js + Express                 |
| Templates  | EJS (views/)                      |
| Styles     | Tailwind CSS (compiled to CSS)    |
| Email      | Nodemailer (Gmail SMTP)           |
| Dev runner | Nodemon                           |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in your Gmail credentials (use an [App Password](https://support.google.com/accounts/answer/185833), not your account password).

### 3. Build CSS

```bash
npm run build:css
```

### 4. Run the server

```bash
# Development (auto-restart on file changes)
npm run dev

# Production
npm start
```

Open [http://localhost:3001](http://localhost:3001)

## Development Workflow

Run CSS watcher and server in two terminals:

```bash
# Terminal 1 – CSS watcher
npm run dev:css

# Terminal 2 – Server
npm run dev
```

## Project Structure

```
├── server.js          # Express app entry point
├── lib/
│   ├── config.js      # Env config + validation
│   ├── mailer.js      # Nodemailer email sender
│   ├── validator.js   # Form input validation
│   └── __tests__/     # Jest unit tests
├── views/
│   ├── index.ejs      # Home page
│   ├── success.ejs    # Form success page
│   ├── error.ejs      # Error page
│   └── partials/      # head, nav, footer
├── public/
│   ├── css/
│   │   ├── input.css  # Tailwind source
│   │   └── output.css # Compiled CSS (committed)
│   └── images/
├── .env               # Local secrets (git-ignored)
└── .env.example       # Template for .env
```

## Notes

- Email sending is **skipped in development** — inquiries are logged to the console instead.
- In production, set `NODE_ENV=production` and provide real email credentials.
- Run `npm test` to execute unit tests.
