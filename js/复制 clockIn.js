/*-------------地图-------------*/
var map = new AMap.Map('container', {
	resizeEnable: true
});
AMap.plugin('AMap.Geolocation', function() {
	var geolocation = new AMap.Geolocation({
		enableHighAccuracy: true, //是否使用高精度定位，默认:true
		timeout: 10000, //超过10秒后停止定位，默认：5s
		buttonPosition: 'RB', //定位按钮的停靠位置
		buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
	});
	map.addControl(geolocation);
	geolocation.getCurrentPosition(function(status, result) {
		if(status == 'complete') {
			onComplete(result)
		} else {
			onError(result)
		}
	});
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

	var shanghaizone = [113.68060648, 34.79333863]; //设置的签到点
	//计算当前位置与考勤点距离
	var distance = AMap.GeometryUtil.distance(getposition, shanghaizone).toFixed(0);

	console.log(distance);
	//document.getElementById('distance').innerHTML = distancestr;
	var setDistance = 500; //设定的打卡距离

	document.getElementById('location').innerHTML = location;

	var distancestr = '仍距' + distance + '米';
	console.log(distance);

	if(distance <= setDistance) {
		//在范围内
		document.getElementById('distance').innerHTML = '</i><i class="layui-icon layui-icon-face-smile" style="font-size:12px; color:#17bc84; border-radius: 10px;">  你已进入考勤范围  </i>  ';
		document.getElementById("place").innerHTML = "办公地点 ";
		$("#place").addClass("isdiy");
		//$("#signbtn").html("外勤打卡")

	} else {
		//不在范围内
		document.getElementById('distance').innerHTML = '<div style="display:inline" class="layui-icon layui-icon-face-cry" style="font-size: 10px; color:red;  border-radius: 10px;">  当前不在考勤范围 </div><a style="color:#29a6ff" onClick="window.location.reload()">重新定位 </a> ';
		document.getElementById("place").innerHTML = "非办公地点 ";
		$("#place").addClass("nodiy");
		$("#signbtn").html("外勤打卡")
	}

	$("#signbtn").click(function() {

		if(distance <= setDistance) {
			layer.msg("办公地点打卡");
		} else {
			layer.msg("外勤打卡");
		}
	});

	//绘制签到范围
	var circle = new AMap.Circle({
		center: shanghaizone,
		radius: 1000, //半径
		borderWeight: 1,
		strokeOpacity: 1,
		strokeOpacity: 0.2,
		fillOpacity: 0.4,
	})

	circle.setMap(map)
		// 缩放地图到合适的视野级别
	map.setFitView([circle])
	var circleEditor = new AMap.CircleEditor(map, circle)
}
//解析定位错误信息
function onError(data) {
	document.getElementById('location').innerHTML = '定位失败';
	document.getElementById('location').innerHTML = '失败原因排查信息:' + data.message;
}

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
/*--------------签到-----------------*/
$(document).on("click", "#show-toast", function() {
	trimAdress = $("#location").text();
	$("#show-toast").addClass("active")
		.find(".text").html("打卡成功")
	$("#show-toast").removeAttr("id");
	startTime()
		//打印地址和时间
	$.toast("打卡成功", function() {
		alert(trimAdress);
		alert(getposition);
		alert($("#time").text());
		
	});
})

/*-------------tab2导航切换--------------*/
$(".con").eq(0).show();
$(".btn span").click(function() {
	var num = $(".btn span").index(this);
	$(".con").hide();
	$(".con").eq(num).show();
	$(this).attr("class", "tab2-active spanList");
	$(this).siblings().attr("class", "spanList");
})

/*-----------------图表----------------*/
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
var placeHolderStyle = {
	normal: {
		label: {
			show: false
		},
		labelLine: {
			show: false
		},
		color: "rgba(0,0,0,0)",
		borderWidth: 0
	},
	emphasis: {
		color: "rgba(0,0,0,0)",
		borderWidth: 0
	}
};

var data = 12; //数值大小
var max = 44; //满刻度大小
option = {
	//backgroundColor: '#fff',
	series: [{
		type: 'pie',
		zlevel: 2,
		hoverAnimation: false,
		radius: ['93%', '94%'],
		center: ['50%', '50%'],
		labelLine: {
			normal: {
				show: false
			}
		},
		data: [{
			value: data,
			label: {
				normal: {
					rich: {
						a: {
							color: '#fcb058',
							align: 'center',
							fontSize: 33,
						}
					},
					formatter: function(params) {
						//图标中心文字，打卡人数/总人数
						return "{a|" + data + "} " + "{a|" + "/" + "} " + " {a|" + max + "}\n\n" + "打卡人数/总人数";
					},
					position: 'center',
					show: true,
					textStyle: {
						fontSize: '13',
						fontWeight: 'normal',
						color: '#666'
					}
				}
			},
			itemStyle: {
				normal: {
					color: 'rgba(0, 0, 0, 0)',
					borderWidth: 2,
					borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
						offset: 0,
						color: '#fcb058'
					}, {
						offset: 1,
						color: '#fcb058'
					}]),
				}
			},
		}, {
			value: max - data,
			itemStyle: placeHolderStyle
		}, ]
	}, {
		type: 'pie',
		zlevel: 1,
		hoverAnimation: false,
		radius: ['94%', '95%'],
		center: ['50%', '50%'],
		labelLine: {
			normal: {
				show: false
			}
		},
		label: {
			normal: {
				position: 'center'
			}
		},
		data: [{
			value: 1,
			itemStyle: {
				normal: {
					color: 'rgba(0, 0, 0, 0)',
					borderWidth: 2,
					borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
						offset: 0,
						color: '#e8e8e8'
					}, {
						offset: 1,
						color: '#e8e8e8'
					}]),
				}
			},
		}]
	}, ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
//  当窗口或者大小发生改变时执行resize，重新绘制图表
window.onresize = myChart.resize;

/*---------------周历,月历切换--------------*/
$(function() {
	$('#timeTab [data-role="time"]').click(function(e) {
		$(e.currentTarget).addClass('active').siblings().removeClass('active'); //增加删除时间选中的样式
		$('#' + $(e.currentTarget).data('time')).show().siblings().hide(); //显示隐藏对应选择时间的日期选择框
	});
});

/*---------------月历--------------*/
month();
mymonth();

function month() {
	var calendar = new Calendar({
		// swiper滑动容器
		container: "#monthcalendar",
		// 上一月节点
		pre: ".pre",
		// 下一月节点
		next: ".next",
		// 回到今天
		backToToday: ".backToday",
		// 业务数据改变
		dataRequest: function(currdate, callback, _this) {
			// 无日程安排
			var data = [{
				"date": "2018-04-18"
			}, {
				"date": "2018-04-17"
			}, {
				"date": "2018-04-16"
			}];
			callback && callback(data);
		},
		// 点击日期事件
		onItemClick: function(item) {
			var defaultDate = item.date;
			// 设置标题
			setTitle(defaultDate);
		},
		// 滑动回调
		swipeCallback: function(item) {
			var defaultDate = item.date;
			// 设置标题
			setTitle(defaultDate);

			// 动态新增点击样式
			calendar.addActiveStyleFordate(defaultDate);

		},
		// 调试
		isDebug: false
	});
	// 设置标题
	var titleNode = document.querySelector('#month .mid span');

	function setTitle(date) {
		titleNode.innerText = date;
	}

}

function mymonth() {
	var mycalendar = new Calendar({
		// swiper滑动容器
		container: "#monthcalendar",
		// 上一月节点
		pre: ".mypre",
		// 下一月节点
		next: ".mynext",
		// 回到今天
		backToToday: ".backToday",
		// 业务数据改变
		dataRequest: function(currdate, callback, _this) {
			// 无日程安排
			var data = [{
				"date": "2018-04-18"
			}, {
				"date": "2018-04-17"
			}, {
				"date": "2018-04-16"
			}];
			callback && callback(data);
		},
		// 点击日期事件
		onItemClick: function(item) {
			var defaultDate = item.date;
			// 设置标题
			setTitle(defaultDate);
		},
		// 滑动回调
		swipeCallback: function(item) {
			var defaultDate = item.date;
			// 设置标题
			setTitle(defaultDate);

			// 动态新增点击样式
			mycalendar.addActiveStyleFordate(defaultDate);

		},
		// 调试
		isDebug: false
	});
	// 设置标题
	var titleNode = document.querySelector('#month2 .mymid span');

	function setTitle(date) {
		titleNode.innerText = date;
		console.log(date)
	}
}

week();
myweek();
/*-------------周历引用-----------------------*/
function week() {
	// 初始化
	var myweekcalendar = new CalendarWeek({
		// 默认周历组件容器
		container: "#weekcalendar",
		// 上一周元素
		pre: ".weekpre",
		// 下一周元素
		next: ".weeknext",
		// 开启滑动时间，切换周历
		isSwipe: false,
		template: function(value, currdate, key) {
			// console.log(value.date_frame);
			// 选中状态
			if(value.date_frame == currdate) {
				var template = document.getElementById("template1").innerHTML.trim()
			} else {
				var template = document.getElementById("template2").innerHTML.trim()
			}
			return template;
		},
		// 业务数据改变
		dataRequest: function(callback, _this, range) {
			var from = range.from; //开始时间
			var to = range.to; //结束时间
			var titleTime = from + "-" + to;
			console.log(titleTime)
			console.log("切换日期区间：" + JSON.stringify(range) + "用于刷新业务接口");
			console.log(from, to);
			// 一次请求7条数据，对应7天日期
			var data = [{
				"title": "1",
				"date1": "2018-08-08",
			}, {
				"title": "2",
				"date1": "2018-08-09"
			}, {
				"title": "3",
				"date1": "2018-08-08",
			}, {
				"title": "4",
				"date1": "2018-08-09"
			}, {
				"title": "5",
				"date1": "2018-08-08",
			}, {
				"title": "6",
				"date1": "2018-08-09"
			}, {
				"title": "7",
				"date1": "2018-08-08",
			}];
			callback(data || []);
		},
		"preEvent": function(month) {
			console.log("上周：" + month);
			setTitle(month);
		},
		"nextEvent": function(month) {
			console.log("下周：" + month);
			setTitle(month);
		},
		"success": function(week, range) {
			document.querySelector('#week .weekmid span').innerText = week;
			console.log(week)
		},
		isDebug: false
	});
	// 设置标题
	var titleNode = document.querySelector('#week .weekmid span');

	function setTitle(week) {
		titleNode.innerText = week;
		console.log(week)
	}
}

/*-------------我的考勤-周历-----------------*/
function myweek() {
	// 初始化
	var myweekcalendar = new CalendarWeek({
		// 默认周历组件容器
		container: "#myweekcalendar",
		// 上一周元素
		pre: ".myweekpre",
		// 下一周元素
		next: ".myweeknext",
		// 开启滑动时间，切换周历
		isSwipe: false,
		template: function(value, currdate, key) {
			// console.log(value.date_frame);
			// 选中状态
			if(value.date_frame == currdate) {
				var template = document.getElementById("template1").innerHTML.trim()
			} else {
				var template = document.getElementById("template2").innerHTML.trim()
			}
			return template;
		},
		// 业务数据改变
		dataRequest: function(callback, _this, range) {
			var from = range.from; //开始时间
			var to = range.to; //结束时间
			var titleTime = from + "-" + to;
			console.log(titleTime)
			console.log("切换日期区间：" + JSON.stringify(range) + "用于刷新业务接口");
			console.log(from, to);
			// 一次请求7条数据，对应7天日期
			var data = [{
				"title": "1",
				"date1": "2018-08-08",
			}, {
				"title": "2",
				"date1": "2018-08-09"
			}, {
				"title": "3",
				"date1": "2018-08-08",
			}, {
				"title": "4",
				"date1": "2018-08-09"
			}, {
				"title": "5",
				"date1": "2018-08-08",
			}, {
				"title": "6",
				"date1": "2018-08-09"
			}, {
				"title": "7",
				"date1": "2018-08-08",
			}];
			callback(data || []);
		},
		"preEvent": function(month) {
			console.log("上周：" + month);
			setTitle(month);
		},
		"nextEvent": function(month) {
			console.log("下周：" + month);
			setTitle(month);
		},
		"success": function(week, range) {
			document.querySelector('#week2 .myweekmid span').innerText = week;
			console.log(week)
		},
		isDebug: false
	});
	// 设置标题
	var titleNode = document.querySelector('#week2 .myweekmid span');

	function setTitle(week) {
		titleNode.innerText = week;
		console.log(week)
	}
}