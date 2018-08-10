var fs = require('fs')

fs.createReadStream('1.mp4').pipe(fs.createWriteStream('1-stream-pipe.mp4'))