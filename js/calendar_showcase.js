"use strict";

var customBiz = {
	init: function() {
		var self = this;
		// 初始化日历
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
				// 异常打卡
				var data = [{
					"date": "2020-04-18",
					"value": "异常"
				}, {
					"date": "2020-04-17",
					"value": "正常"
				}, {
					"date": "2020-04-16",
					"value": "异常"
				}, {
					"date": "2020-03-01",
					"value": "异常"
				}, {
					"date": "2020-03-02",
					"value": "异常"
				}, {
					"date": "2020-03-03",
					"value": "异常"
				}, {
					"date": "2020-03-04",
					"value": "异常"
				}, {
					"date": "2020-03-05",
					"value": "异常"
				}, {
					"date": "2020-03-06",
					"value": "异常"
				}, {
					"date": "2020-03-07",
					"value": "异常"
				}, {
					"date": "2020-03-08",
					"value": "异常"
				}, {
					"date": "2020-03-09",
					"value": "异常"
				}, {
					"date": "2020-03-10",
					"value": "异常"
				}, {
					"date": "2020-03-11",
					"value": "异常"
				}, {
					"date": "2020-03-12",
					"value": "异常"
				}, {
					"date": "2020-04-13",
					"value": "异常"
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
		var titleNode = document.querySelector('.mid span');

		function setTitle(date) {
			titleNode.innerText = date;
		}
	}
}

// 初始化
customBiz.init();