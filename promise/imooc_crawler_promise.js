const http = require('http');
var Promise = require('bluebird')
var cheerio = require('cheerio')

var baseUrl = 'http://www.imooc.com/learn/'
var url = 'http://www.imooc.com/learn/348'

var videoIds = [348, 259, 197, 134, 75]

//javascript去空格函数
function LTrim(str) { //去掉字符串 的头空格 
    var i;
    for (i = 0; i < str.length; i++)
        if (str.charAt(i) != " " && str.charAt(i) != " ") break;

    str = str.substring(i, str.length);
    return str;
}

function RTrim(str) {
    var i;
    for (i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) != " " && str.charAt(i) != " ") break;
    }
    str = str.substring(0, i + 1);
    return str;
}

function Trim(str) {
    return LTrim(RTrim(str));
}

function filterChapters(html) {
    var $ = cheerio.load(html)
    var chapters = $('.chapter')
    // {
    //     title: title,
    //     number: number,
    //     videos:[{
    //     	chapterTitle:'',
    //     	videos:[
    //     	title:''
    //     	id:''
    //     	]
    //     }]
    // }
    var title = $('div.course-infos > div.w.pr > div.hd.clearfix > h2').text().trim()
    var number = parseInt($('div.course-infos span.meta-value.js-learn-num').text().trim(), 10)
    var courseData = {
        title: title,
        number: number,
        videos: []
    }
    chapters.each(function (item) {
        var chapter = $(this)
        var chapterTitle = chapter.find('strong').text()
        var videos = chapter.find('.video').children('li')
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }

        videos.each(function (item) {
            var video = $(this).find('li a')
            var videoTitle = ""
            var videoTitleArray = Trim(video.text()).split(/\s+/).forEach(function (item) {
                if (Trim(item).length > 0 && item.indexOf("开始学习") < 0) {
                    videoTitle += Trim(item) + " "
                }
            })

            var id = Trim(video.attr('href').split('video/')[1])
            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })
        courseData.videos.push(chapterData)

    })
    return courseData
}

function printCourseInfo(coursesData) {
    coursesData.forEach(function (courseData) {
        console.log(courseData.number + ' 人学过 ' + courseData.title + '\n')
    })

    coursesData.forEach(function (courseData) {
        console.log('### ' + courseData.title + '\n')
        courseData.videos.forEach(function (item) {
            var chapterTitle = item.chapterTitle
            console.log(chapterTitle + '\n')

            item.videos.forEach(function (video) {
                console.log('  【' + video.id + '】 ' + video.title + '\n')
            })
        })
    })
}

function getPageAsync(url) {
    return new Promise(function (resolve, reject) {
        console.log('正在爬取 ' + url)
        http.get(url, function (res) {
            var html = ''

            res.on('data', function (data) {
                html += data
            })

            res.on('end', function () {
                resolve(html)
                // var courseData = filterChapters(html)
                // printCourseData(courseData)
            })

        }).on('error', function () {
            reject(e)
            console.log('获取课程数据出错!')
        })

    })
}

var fetchCourseArray = []
videoIds.forEach(function (id) {
    var url = baseUrl + id
    fetchCourseArray.push(getPageAsync(url))

})

Promise.all(fetchCourseArray).then(function (pages) {
    var coursesData = []
    pages.forEach(function (html) {
        var courses = filterChapters(html)
        coursesData.push(courses)
    })

    coursesData.sort(function (a, b) { //从大到小
            return a.nmuber < b.number
        }
    )
    printCourseInfo(coursesData)
})

