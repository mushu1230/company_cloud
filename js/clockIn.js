/*-------------地图-------------*/
function onApiLoaded() {
	var map = new AMap.Map('container', {
		resizeEnable: true,
		zoom: 15,
		center: [113.680723, 34.793239], //初始地图中心点
	});
	//绘制签到范围
	//实际打卡范围
	var shanghaizone = [113.680723, 34.793239]; //设置的签到点

	var circle = new AMap.Circle({
		center: shanghaizone,
		radius: 450, //半径
		borderWeight: 1,
		strokeOpacity: 0.25,
		strokeWeight: 1, //线粗细度
		fillOpacity: 0.25 //填充透明度
	})
	circle.setMap(map);

	AMap.plugin('AMap.Geolocation', function() {
		var geolocation = new AMap.Geolocation({
			enableHighAccuracy: true, //是否使用高精度定位，默认:true
			timeout: 1000, //超过10秒后停止定位，默认：5s
			buttonPosition: 'RB', //定位按钮的停靠位置
			buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			zoomToAccuracy: false, //定位成功后是否自动调整地图视野到定位点
			showCircle: false,
		});
		map.addControl(geolocation);
		geolocation.getCurrentPosition(function(status, result) {
			if(status == 'complete') {
				onComplete(result)
			} else {
				onError(result)
			}
		});
		setInterval(function() {
			geolocation.getCurrentPosition(function(status, result) {
				if(status == 'complete') {
					onComplete(result)
				} else {
					onError(result)
				}
			});
		}, 2000);
	});
	//解析定位结果
	function onComplete(data) {
		document.getElementById('status').innerHTML = '定位成功'
		var str = [];
		str.push('定位结果：' + data.position);
		str.push('定位类别：' + data.location_type);
		if(data.accuracy) {
			str.push('精度：' + data.accuracy + ' 米');
		} //如为IP精确定位结果则没有精度信息
		str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
		document.getElementById('result').innerHTML = str.join('<br>');

		getposition = [data.position.lng, data.position.lat]; //获取当前位置的经纬度
		var location = data.formattedAddress; //具体街道位置信息
		console.log(getposition);

		//计算当前位置与考勤点距离
		var distance = AMap.GeometryUtil.distance(getposition, shanghaizone).toFixed(0);

		console.log(distance);
		//document.getElementById('distance').innerHTML = distancestr;
		var setDistance = 450; //设定的打卡距离

		document.getElementById('location').innerHTML = location;

		var distancestr = '仍距' + distance + '米';
		console.log(distance);

		if(distance <= setDistance) {
			//在范围内
			document.getElementById('distance').innerHTML = '</i><i class="layui-icon layui-icon-face-smile" style="display:none;font-size:12px; color:#17bc84; border-radius: 10px;">  你已进入考勤范围  </i>  ';
						document.getElementById("place").innerHTML = "广达创远 ";
						$("#place").addClass("isdiy");
			//$("#signbtn").html("外勤打卡")
			//范围内向上移动动画
			$(".daka-mark").show();
			$(".daka-mark").animate({ top: '0%' }, 600);
			$("#box").animate({ top: '32%' }, 600);

		} else {
			//不在范围内
			document.getElementById('distance').innerHTML = '<div style="display:inline" class="layui-icon layui-icon-face-cry" style="font-size: 10px; color:red;  border-radius: 10px;">  当前不在考勤范围 </div><a style="color:#29a6ff" onClick="window.location.reload()">重新定位 </a> ';
						document.getElementById("place").innerHTML = "非办公地点 ";
						$("#place").addClass("nodiy");
			$("#signbtn").html("外勤打卡")
			//范围外向下移动动画
			$(".daka-mark").hide();
			$(".daka-mark").animate({ top: '48%' }, 600)
			$("#box").animate({ top: '48%' }, 600);
		}

		// 缩放地图到合适的视野级别
		//	map.setFitView([circle])
		//	var circleEditor = new AMap.CircleEditor(map, circle);

		
	}
	//解析定位错误信息
	function onError(data) {
		document.getElementById('location').innerHTML = '定位失败';
		document.getElementById('location').innerHTML = '失败原因排查信息:' + data.message;
	}
}
var url = 'https://webapi.amap.com/maps?v=1.4.15&key=b4da6160d26765a356e21ace59ccbc3a&callback=onApiLoaded';
var jsapi = document.createElement('script');
jsapi.charset = 'utf-8';
jsapi.src = url;
document.head.appendChild(jsapi);

/*--------------签到-----------------*/
		$(document).on("click", "#show-toast", function() {
			trimAdress = $("#location").text();
			$("#show-toast").addClass("active")
				.find(".text").html("打卡成功")
			$("#show-toast").removeAttr("id");
			startTime()
		})
/*--------------时钟---------------- */
function startTime() {
	var today = new Date()
	var h = today.getHours()
	var m = today.getMinutes()
	var s = today.getSeconds()
	// add a zero in front of numbers<10
	m = checkTime(m)
	s = checkTime(s)
	document.getElementById('time').innerHTML = h + ":" + m + ":" + s
	t = setTimeout('startTime()', 500)
}

function checkTime(i) {
	if(i < 10) {
		i = "0" + i
	}
	return i
}

//日历

var myCalendar = new SimpleCalendar('#calendar');
$(function() {
	var monthCH = $('.sc-select-month').text();
	$(".sc-mleft").click(function() {
		myCalendar.subMonth();
		var year = $('.sc-select-year').text();
		var monthCH = $('.sc-select-month').text();
		var month = SimpleCalendar.prototype.languageData.months_CH.indexOf(monthCH) + 1;
	})
	$(".sc-mright").click(function() {
		myCalendar.addMonth();
		var year = $('.sc-select-year').text();
		var monthCH = $('.sc-select-month').text();
		var month = SimpleCalendar.prototype.languageData.months_CH.indexOf(monthCH) + 1;
	})
});

//滑动切换
var myElement = document.getElementById('calendar');　　
var hammer = new Hammer(myElement);
hammer.on("swipeleft", function(ev) {
	myCalendar.addMonth();
	var monthCH = $('.sc-select-month').text();
	console.log(monthCH)
});
hammer.on("swiperight", function(ev) {
	myCalendar.subMonth();
});

//添加标记
var yc = {
	'2020-4-1': [{
		title: '上班',
		startTime: '2018-2-30 6:00:00',
		title: '上班打卡'
	}, {
		title: '下班打卡',
		startTime: '2018-2-30 6:00:00'
	}],

	'2020-4-10': [{
		title: '上班',
		startTime: '2018-2-30 6:00:00',
		title: '上班打卡'
	}, {
		title: '下班打卡',
		startTime: '2018-2-30 6:00:00'
	}],
	'2020-4-15': [{
		title: '上班',
		startTime: '2018-2-30 6:00:00',
		title: '上班打卡'
	}, {
		title: '下班打卡',
		startTime: '2018-2-30 6:00:00'
	}]
};
myCalendar._defaultOptions.yc = yc;

var zc = {
	'2020-4-2': [{
		title: '上班',
		startTime: '2018-2-30 6:00:00',
		title: '上班打卡'
	}, {
		title: '下班打卡',
		startTime: '2018-2-30 6:00:00'
	}],

	'2020-4-12': [{
		title: '上班',
		startTime: '2018-2-30 6:00:00',
		title: '上班打卡'
	}, {
		title: '下班打卡',
		startTime: '2018-2-30 6:00:00'
	}],
	'2020-4-13': [{
		title: '上班',
		startTime: '2018-2-30 6:00:00',
		title: '上班打卡'
	}, {
		title: '下班打卡',
		startTime: '2018-2-30 6:00:00'
	}]
};
myCalendar._defaultOptions.zc = zc;

myCalendar.update();

//显示当天的活动在初始化之后
//初始化今天的活动
announceList($('.sc-today'));

//有标记的日期点击事件
$('#calendar').on("click", '.sc-selected', function() {
	announceList($(this));

});

//显示选择日期当天的活动
function announceList(v) {
	console.log(v)
	if(v.children().hasClass('sc-mark-show')) {
		var year = $('.sc-select-year').text();
		var monthCH = $('.sc-select-month').text();
		var day = v.children()[1].innerText;
		var month = SimpleCalendar.prototype.languageData.months_CH.indexOf(monthCH) + 1;
		var date = year + '-' + month + '-' + day;
		var content = yc[date];
		var matterHtml = '';

		for(var i = 0; i < content.length; i++) {
			console.log(content.length)

			matterHtml += '<li class="announceItem"><div><div class="fl announceImg">' +
				'<img class=" " src="images/content.png"></div>' +
				'<p class="announceContent">' + content[i].title + '</p>' +
				'</div><div class="announceTime">' + content[i].startTime + '</div></li>';
		}
		$('.matter').html(matterHtml);
	} else if(v.children().hasClass('zc')) {
		var year = $('.sc-select-year').text();
		var monthCH = $('.sc-select-month').text();
		var day = v.children()[1].innerText;
		var month = SimpleCalendar.prototype.languageData.months_CH.indexOf(monthCH) + 1;
		var date = year + '-' + month + '-' + day;
		var zccontent = zc[date];
		var zcHtml = '';

		for(var j = 0; j < zccontent.length; j++) {
			console.log(zccontent.length)

			zcHtml += '<li class="announceItem"><div><div class="fl announceImg">' +
				'<img class=" " src="images/content.png"></div>' +
				'<p class="announceContent">' + zccontent[j].title + '</p>' +
				'</div><div class="announceTime">' + zccontent[j].startTime + '</div></li>';
		}
		$('.matter').html(zcHtml);
	} else {
		var matterHtml = ''
		matterHtml += '<li class="announceItem"><div><p class="announceContent">当前日期暂无打卡记录</p></div></li>';
		$('.matter').html(matterHtml);
	};

};