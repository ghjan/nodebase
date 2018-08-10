const Writable = require('stream').Writable;
class MyWritableStream extends Writable {
    constructor(options) {
        super(options)
    }

    _write(chunk, encoding, callback) {
        if (callback != null) {
            setTimeout(() => {
                callback(null)
            }, 0)
        }

    }
}

function writeOneMillionTimes(writer, data, encoding, callback) {
    let i = 10000;
    write();

    function write() {
        let ok = true;
        while (i-- > 0 && ok) {
            // 写入结束时回调
            if (i === 0) {
                writer.write(data, encoding, callback) //当最后一次写入数据即将结束时，再调用callback
            } else {
                ok = writer.write(data, encoding) //写数据还没有结束，不能调用callback
            }

        }
        if (i > 0) {
            // 这里提前停下了，'drain' 事件触发后才可以继续写入  
            console.log('drain', i);
            writer.once('drain', write);
        }
    }
}


let writer = new MyWritableStream()
writeOneMillionTimes(writer, 'simple', 'utf8', () => {
    console.log('end');
});