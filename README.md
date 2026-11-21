# Pragya Path — Hatha Yoga & Sound Healing

Website for Pragya Path yoga studio in Bhaktapur, Nepal.

## Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Server     | Node.js + Express                 |
| Templates  | EJS (views/)                      |
| Styles     | Tailwind CSS (compiled to CSS)    |
| Email      | Resend                            |
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

Edit `.env` and set `RESEND_API_KEY` (without it, inquiries are logged to the console instead of emailed).

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

## Images

Original photos live in `assets/images/` (not deployed). The site serves
compressed WebP copies from `public/images/`, built by:

```bash
npm run images
```

To add a photo: drop it into `assets/images/gallery/`, run `npm run images`,
then reference `/images/gallery/<name>.webp` (lightbox) and
`/images/gallery/<name>-sm.webp` (grid thumbnail). File names are lower-cased
and spaces become dashes.

The logo source is `assets/brand/logo-original.webp`; the same command
regenerates the navbar mark, footer logo and favicons in `public/images/brand/`.

