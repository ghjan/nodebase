const https = require('https');
var fs = require('fs')

var options = {
    key: fs.readFileSync('ssh_key.pem'), //私钥
    cert: fs.readFileSync('ssh_cert.pem'),//证书
}

https.createServer(options, function (req, res) {
    res.writeHead(200)
    res.end("Hello Imooc")
}).listen(8090)
