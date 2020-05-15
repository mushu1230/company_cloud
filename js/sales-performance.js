/*------图表------*/
var data = [{
	label: '沈丘农商银行',
	type: '签约额',
	value: 2800
}, {
	label: '沈丘农商银行',
	type: '回款额',
	value: 2260
}, {
	label: '巩义农商银行',
	type: '签约额',
	value: 500
}, {
	label: '巩义农商银行',
	type: '回款额',
	value: 390
}, {
	label: '商水农商银行',
	type: '签约额',
	value: 170
}, {
	label: '商水农商银行',
	type: '回款额',
	value: 100
}];
var chart = new F2.Chart({
	id: 'mountNode',
	padding: [60, 'auto', 'auto'],
	pixelRatio: window.devicePixelRatio,
	//	width: 375,
  	height: 320,
});

chart.source(data);

chart.legend({
	position: 'bottom',
	align: 'bottom',
	nameStyle: {
		fill: '#808080',
		fontSize: 14
	}, // 图例项 key 值文本样式
	valueStyle: {
		fill: '#333',
		fontWeight: 'bold' // 图例项 value 值文本样式
	},
});

// Tooltip 配置
chart.tooltip({
	showTitle: true // 展示  tooltip 的标题
});

chart.axis('label', {
	line: F2.Global._defaultAxis.line,
	grid: null
});
chart.axis('value', {
	line: null,
	grid: F2.Global._defaultAxis.grid,
	label: function label(text, index, total) {
		var textCfg = {};
		if(index === 0) {
			textCfg.textAlign = 'left';
		} else if(index === total - 1) {
			textCfg.textAlign = 'right';
		}
		return textCfg;
	}
});
chart.interval().position('label*value').color('type').adjust({
	type: 'dodge',
	marginRatio: 1 / 32
});
chart.render();

//时间选择组件
(function($) {
	$.init();
	var result = $('.btn')[0];
	var btns = $('.btn');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var _self = this;
			if(_self.picker) {
				_self.picker.show(function(rs) {
					result.value = rs.text;
					_self.picker.dispose();
					_self.picker = null;
				});
			} else {
				var optionsJson = this.getAttribute('data-options') || '{}';
				var options = JSON.parse(optionsJson);
				var id = this.getAttribute('id');
				/*
				 * 首次显示时实例化组件
				 * 示例为了简洁，将 options 放在了按钮的 dom 上
				 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
				 */
				_self.picker = new mui.DtPicker({
					type: "month", //设置日历初始视图模式 
					beginDate: new Date(2015, 04), //设置开始日期 
					endDate: new Date(2020, 04), //设置结束日期 
				})
				_self.picker.show(function(rs) {
					/*
					 * rs.value 拼合后的 value
					 * rs.text 拼合后的 text
					 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
					 * rs.m 月，用法同年
					 * rs.d 日，用法同年
					 * rs.h 时，用法同年
					 * rs.i 分（minutes 的第二个字母），用法同年
					 */
					result.value = rs.text;
					/* 
					 * 返回 false 可以阻止选择框的关闭
					 * return false;
					 */
					/*
					 * 释放组件资源，释放后将将不能再操作组件
					 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
					 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
					 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
					 */
					_self.picker.dispose();
					_self.picker = null;
				});
			}

		}, false);
	});
})(mui);