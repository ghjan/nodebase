var fs = require('fs')

var readStream = fs.createReadStream('1.mp4')

var writeStream = fs.createWriteStream('1-stream-pipe.mp4')

readStream.pipe(writeStream);
