const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8050;
const PUBLIC_DIR = path.join(__dirname, 'public')



function log(req) {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFile('log.txt', logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}

const requestHandler = (req, res) => {
    log(req)

    switch (req.url) {
        case '/':
            res.end('Welcome to the BarterX');
            break;
        case '/products':
            res.end('Here are the products up for Sale in BarterX.');
            break;
        case '/login':
            res.end('Login to the BarterX');
            break;
        case '/signup':
            res.end('Sign up to the BarterX');
            break;
        case '/profile':
            res.end('Trader Profile');
            break;
        case '/cart':
            res.end('Your Shopping Cart is here');
            break;
        case '/checkout':
            res.end("Let's start shipping");
            break;
        case '/orders':
            res.end('Your Orders are here');
            break;
        case '/categories':
            res.end('Browse Categories');
            break;
        case '/chat':
            res.end('Your Chat with fellow Traders');
            break;
        case '/contact':
            res.end('Contact Us at');
            break;
        case '/about':
            fs.readFile(path.join(PUBLIC_DIR, 'about.html'), (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "File not found", statusCode: 404 }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
            break;
        case '/api/products':
            const products = [
                { id: 1, name: "Used Laptop", price: 300 },
                { id: 2, name: "Second-hand Bicycle", price: 50 },
            ];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products));
            break;
            case '/logo.png':
                fs.readFile(path.join(PUBLIC_DIR,'logo.png'), (err, data) => {
                    if (err) {
                        res.writeHead(404).end();
                    } else {
                        res.writeHead(200, { 'Content-Type': 'image/png' });
                        res.end(data);
                    }
            });
            break;
        case '/styles.css':
            fs.readFile(path.join(PUBLIC_DIR, 'style.css'), (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "File not found", statusCode: 404 }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                }
            });
            break;
            default:
                res.writeHead(404);
                res.end(JSON.stringify({ error: "Page not found", statusCode: 404 }));
                break;
        }
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}...`);
});