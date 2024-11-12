const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path'); // Import path module to handle file paths

const getNavbar = require('./components/Navbar');
const getHomeContent = require('./routes/home');
const getAboutContent = require('./routes/about');
const getContactContent = require('./routes/contact');
const getServicesContent = require('./routes/services');
const getPortfolioContent = require('./routes/portfolio');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(getNavbar() + getHomeContent());
    } else if (pathname === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(getNavbar() + getAboutContent());
    } else if (pathname === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(getNavbar() + getContactContent());
    } else if (pathname === '/services') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(getNavbar() + getServicesContent());
    } else if (pathname === '/portfolio') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(getNavbar() + getPortfolioContent());
    }

    // Route for displaying text content from file1.txt in the public folder
    else if (pathname === '/file1') {
        fs.readFile(path.join(__dirname, 'public', 'file1.txt'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(getNavbar() + '<h1>404 Not Found</h1><p>The requested file could not be found.</p>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    }

    // Route for displaying HTML content from file2.html in the public folder
    else if (pathname === '/file2') {
        fs.readFile(path.join(__dirname, 'public', 'file2.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(getNavbar() + '<h1>404 Not Found</h1><p>The requested file could not be found.</p>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(getNavbar() + data);
            }
        });
    }

    // 404 handler for undefined routes
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(getNavbar() + '<h1>404 Not Found</h1><p>The requested page could not be found.</p>');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
