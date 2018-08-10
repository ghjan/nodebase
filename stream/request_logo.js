var http = require('http')

var fs = require('fs')

http.createServer(function (req, res) {
    fs.readFile('../buffer/logo.png', function (err, data) {
        if (err) {
            res.end(err + ' file not exist!')
        } else {
            res.writeHead(200, {
                'Context-Type': 'text/html'
            })
            res.end(data)
        }
    })
}).listen(8090)