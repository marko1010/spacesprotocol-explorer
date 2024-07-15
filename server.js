import { handler } from './handler.js';
import express from 'express';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok');
});

app.use((req, res, next) => {
    if (req.headers['Host'] != process.env.DOMAIN)
        return res.end(403);
    
    next();
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

const sslOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH), // Path to server.key
    cert: fs.readFileSync(process.env.SSL_CERT_PATH) // Path to server.cert
};

https.createServer(sslOptions, app)
    .listen(443, () => {
        console.log('HTTPS server running on port 443');
    });