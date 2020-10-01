const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    const path = `./public${req.url === '/' ? '/static/index.html': req.url}`;
    fs.readFile(path, (err, file) => {
        if (err) {
            res.write('error');
            res.end();
            return;
        }
        console.log(path, err)
        res.write(file);
        res.end();
    });
});

server.listen(3000);
