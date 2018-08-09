var EventEmitter = require('events').EventEmitter

var life = new EventEmitter()
life.setMaxListeners(11)

function water(who) {
    console.log('给 ' + who + ' 倒水')
}


// addEventListener

life.on('求安慰', water)


life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 揉肩')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 做饭')
})



life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 洗衣服')
})


life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 5')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 6')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 7')
})


life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 8')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 9')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 10')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 你想累死我')
})

life.on('求溺爱', function (who) {
    console.log('给 ' + who + ' 买衣服')
})

life.on('求溺爱', function (who) {
    console.log('给 ' + who + ' 交工资')
})

life.removeListener('求安慰', water)

var hasLoveListener = life.emit('求溺爱', '妹子')
var hasConfortListener = life.emit('求安慰', '汉子')
var hasPlayedListener = life.emit('求玩坏', '汉子和妹子')

console.log(hasConfortListener)
console.log(hasLoveListener)
console.log(hasPlayedListener)

console.log(life.listeners('求安慰').length)
console.log(EventEmitter.listenerCount(life, '求安慰'))
life.removeAllListeners('求安慰')
console.log(EventEmitter.listenerCount(life, '求安慰'))
console.log(EventEmitter.listenerCount(life, '求溺爱'))
life.removeAllListeners()
console.log(EventEmitter.listenerCount(life, '求溺爱'))

