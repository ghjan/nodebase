var http = require('http')
// var json = require('json')

var querystring = require('querystring')

var postData = querystring.stringify({
    'content': '老师讲的还是不错的，接着就看二了',
    'cid': 348
})

var options = {
    hostname: 'www.imooc.com',
    port: 443, //80,
    path: '/course/document',
    method: 'post',
    headers: {
        'Accept': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01', //'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'charset': 'UTF-8',
        'Cookie': 'imooc_uuid=5ea346d6-657e-4e8e-b259-a70b07244ba9; imooc_isnew_ct=1533185978; imooc_isnew=2; loginstate=1; apsid=g1Y2U4OWM2ZWJiOTViYjdiNTA5YmQzYTIzZDg5NDcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANjYwMzIxOQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABjYWphbjJAMTYzLmNvbQAAAAAAAAAAAAAAAAAAAAAAADhhYmYxOWM4YzRlOWUzNGJiODEzZjQxOGE2ZjYwNWY5z%2FdjW%2BcfWVs%3DMT; last_login_username=cajan2%40163.com; IMCDNS=0; PHPSESSID=p3e2dvabiid7v3joti1g33btb3; Hm_lvt_fb538fdd5bd62072b6a984ddbc658a16=1533278011,1533778185,1533797895,1533802538; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1533278012,1533778185,1533797895,1533802538; cvde=5b6bf829782e3-36; Hm_lpvt_fb538fdd5bd62072b6a984ddbc658a16=1533803485; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1533803485',
        'Host': 'www.imooc.com',
        'Origin': 'https://www.imooc.com',
        'Referer': 'https://www.imooc.com/qa/348/t/1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
    }
}

var req = http.request(options, function (res) {
    console.log('status: ' + res.statusCode)
    console.log('headers: ' + JSON.stringify(res.headers))
    res.on('data', function (chunk) {
        console.log(Buffer.isBuffer(chunk))
        console.log('typeof chunk: ' + typeof chunk)
    })

    res.on('end', function () {
        console.log('评论完毕!')
    })

})

req.on('error', function (e) {
    console.log('Error: ' + e.message)
})

req.write(postData)
req.end()
