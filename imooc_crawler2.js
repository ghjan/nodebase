const http = require('http');
var cheerio = require('cheerio')

var url = 'http://www.imooc.com/learn/348'
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

	// [{
	// 	chapterTitle:'',
	// 	videos:[
	// 	title:''
	// 	id:''
	// 	]
	// }]
	var courseData = []
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
			var videoTitleArray = Trim(video.text()).split(/\s+/).forEach(function(item){
				if (Trim(item).length>0 && item.indexOf("开始学习")<0 ){
					videoTitle += Trim(item) + " "
				}
			})

			var id = Trim(video.attr('href').split('video/')[1])
			chapterData.videos.push({
				title: videoTitle,
				id: id
			})
		})
		courseData.push(chapterData)

	})
	return courseData
}

function printCourseData(courseData) {
	courseData.forEach(function (item) {
		var chapterTitle = item.chapterTitle
		console.log(chapterTitle + '\n')
		item.videos.forEach(function (video) {
			console.log('    [' + video.id + ']' + video.title + '\n')
		})
	})
}

http.get(url, function (res) {
	var html = ''

	res.on('data', function (data) {
		html += data
	})

	res.on('end', function () {
		var courseData = filterChapters(html)
		printCourseData(courseData)
	})

}).on('error', function () {
	console.log('获取课程数据出错!')
})