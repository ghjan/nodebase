var fs = require('fs')

var readStream = fs.createReadStream('1.mp4')

var writeStream = fs.createWriteStream('1-stream.mp4')
var n = 0

function write(reader, writer, chunk) {
    if (writer.write(chunk) == false) {
        n++
        console.log('still cached')
        readStream.pause()

        writer.once('drain', function () { //已经消费完了
            console.log('data drains')
            reader.resume(); //让readble继续干活。resume其实就是把readable.flow设置成true，然后调用后文所说的flow()方法。
        });

    }
}

readStream.on('data', function (chunk) {
    write(readStream, writeStream, chunk)

})
readStream.on('end', function () {
    console.log('end, n:' + n)
    writeStream.end()
})
// writeStream.on('drain', function () { //已经消费完了
//     console.log('data drains')
//     readStream.resume()
// })