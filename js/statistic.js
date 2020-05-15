/*------图表------*/
var data = [{
	genre: '目标',
	cost: 4500,
}, {
	genre: '预测',
	cost: 11500,
}, {
	genre: '订单',
	cost: 6000,
}, {
	genre: '回款',
	cost: 12600,
}];
var colorMap = {
	'目标': '#8ac48d',
	'预测': '#ae9fe2',
	'订单': '#fcb058',
	'回款': '#63a2e4'
};
// 设置图例项的内容
var legendItems = [];

data.map(function(obj) {
	var item = {
		name: obj.genre,
		value: '    ' + obj.cost + '元',
		marker: {
			symbol: 'square',
			fill: colorMap[obj.genre],
			radius: 7
		}
	};
	legendItems.push(item);
});

var chart = new F2.Chart({
  id: 'mountNode',
  pixelRatio: window.devicePixelRatio, // 指定分辨率
height: 260,
//width:375,
position: 'right',

});
// load the data
chart.source(data, {
	cost: {
		formatter: function formatter(val) {
			return val;
		}
	}
});

chart.legend({
	position: 'bottom',
	align:'center',
//	itemWidth:80,
	itemGap:10,//每个图例项水平方向上的间距
	itemMarginBottom:20,//每个图例下方六百的间距
//	wordSpace:10,//marker 和文本之间的间距
		custom: true,
	items: legendItems,
	
	nameStyle: {
		fill: '#808080',
		fontSize: 14
	}, // 图例项 key 值文本样式
	valueStyle: {
		fontSize: 13 ,
		fill: '#fcb058',
		fontWeight: 'bold' // 图例项 value 值文本样式
	},
});
//数值
//chart.axis(false);
// draw a column chart
chart.interval().position('genre*cost').color('genre', function(val) {
	return colorMap[val];
}).adjust('stack').style({
	lineWidth: 0,
	stroke: '#fff'
});
chart.render();