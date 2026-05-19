const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const config = require('./lib/config');
const validator = require('./lib/validator');
const mailer = require('./lib/mailer');

// Validate environment variables on startup
config.validateEnv();

const app = express();

// 1. Middleware Stack
app.use(compression()); // Gzip compression

// Live Reload for Development (refreshes browser on file change)
if (config.NODE_ENV !== 'production') {
    const livereload = require('livereload');
    const connectLiveReload = require('connect-livereload');
    
    // Setup livereload server
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch([
        path.join(__dirname, 'public'),
        path.join(__dirname, 'views')
    ]);
    
    // Ping browser on Express restart
    liveReloadServer.server.once('connection', () => {
        setTimeout(() => {
            liveReloadServer.refresh('/');
        }, 100);
    });
    
    app.use(connectLiveReload());
}

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src": ["'self'", "data:", "https://images.unsplash.com"],
            "script-src": ["'self'", "'unsafe-inline'", "http://localhost:35729"], // Allow livereload script
            "connect-src": ["'self'", "ws://localhost:35729", "http://localhost:35729"], // Allow livereload websocket
            "frame-src": ["'self'", "https://www.google.com"],
        },
    },
}));
app.disable('x-powered-by');

// 2. Body Parser with limit
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(express.json());

// 3. Static Files
app.use(express.static(path.join(__dirname, 'public')));

// 4. View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Explicitly disable view cache in development so EJS changes reflect immediately
if (config.NODE_ENV !== 'production') {
    app.disable('view cache');
}

// 5. Rate Limiter for Inquiries
const inquiryLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 inquiries per window
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).render('error', {
            statusCode: 429,
            message: 'Too many requests. Please try again after 15 minutes.'
        });
    }
});

// --- ROUTES ---

// Home Page
app.get('/', (req, res) => {
    res.render('index');
});

// Handle Inquiry Form
app.post('/inquiry', inquiryLimiter, async (req, res, next) => {
    try {
        const { valid, values, errors } = validator.validateInquiry(req.body);

        if (!valid) {
            return res.render('index', { errors, values });
        }

        // Save to inquiries.json
        const INQUIRIES_FILE = path.join(__dirname, 'inquiries.json');
        const inquiries = await fs.readJson(INQUIRIES_FILE).catch(() => []);
        inquiries.push({ ...values, date: new Date() });
        await fs.writeJson(INQUIRIES_FILE, inquiries, { spaces: 2 });

        // Send Email Notification
        await mailer.sendInquiryNotification(values);

        res.redirect('/success');
    } catch (err) {
        next(err);
    }
});

// Success Page
app.get('/success', (req, res) => {
    res.render('success');
});

// SEO Files
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nAllow: /\nSitemap: https://pragyapath.com/sitemap.xml');
});

app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pragyapath.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`);
});

// 6. 404 Catch-all
app.use((req, res) => {
    res.status(404).render('error', {
        statusCode: 404,
        message: 'The sanctuary path you are looking for does not exist.'
    });
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).render('error', {
        statusCode,
        message: 'Something went wrong in the sanctuary. Please try again later.',
        stack: config.NODE_ENV !== 'production' ? err.stack : null
    });
});

// --- START SERVER ---
app.listen(config.PORT, () => {
    console.log(`--- PRAGYA PATH SECURE SERVER ---`);
    console.log(`Port: ${config.PORT}`);
    console.log(`Environment: ${config.NODE_ENV}`);
    console.log(`URL: http://localhost:${config.PORT}`);
});
