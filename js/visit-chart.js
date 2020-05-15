/*------图表------*/
var data = [{
	assetType: '拜访总数',
	cost: 20,
	const: 'const'
}, {
	assetType: '有效拜访记录',
	cost: 15,
	const: 'const'
}];

var colorMap = {
	'拜访总数': '#1890FF',
	'有效拜访记录': '#2FC25B',
};
// 设置图例项的内容
var legendItems = [];
var sum = 0;
data.map(function(obj) {
	sum += obj.cost;
	var item = {
//		name: obj.assetType,
//		value: '    ' + obj.cost + '元',
//		marker: {   //小标题
//			symbol: 'square',  
//			fill: colorMap[obj.assetType],//小标题颜色
//			radius: 5
//		}
	};
	legendItems.push(item);
});

var chart = new F2.Chart({
	id: 'mountNode',
	pixelRatio: window.devicePixelRatio,
//	width: 375,
  	height:300,
});

chart.source(data, {
	cost: {
		formatter: function formatter(val) {
			return val;
		}
	}
});
chart.coord('polar', {
	transposed: true,
	innerRadius: 0.6,
	radius: 1
});
chart.legend({
	position: 'bottom',
	align:'center',
	custom: true,
	items: legendItems,

	nameStyle: {
		fill: '#808080',
		fontSize: 14
	}, // 图例项 key 值文本样式
	valueStyle: {
		fill: '#333',
		fontWeight: 'bold' // 图例项 value 值文本样式
	},
	onClick: function onClick(ev) {
		const data = ev.data;
 	 	if (data) {
    		const name = data._origin['assetType'];
  	  		window.open('http://www.baidu.com/s?wd=' + assetType);
  	 	}
	}
});
chart.axis(false);
chart.interval().position('const*cost').color('assetType', function(val) {
	return colorMap[val];
}).adjust('stack').style({
	lineWidth: 1,
	stroke: '#fff'
});

chart.guide().text({
	position: ['50%', '50%'],
	content: sum.toFixed(2),
	style: {
		fontSize: 20
	}
});
chart.render();

var shuju = document.getElementById('shuju');

data.forEach(function(value){
	var subtitle = document.createElement('li');
	
	subtitle.innerHTML = '<a  class="subtitle">' + '<i class="color">' + '</i>' +'<span class="text" id="titleText">' + value.assetType + ':' + '</span>' + '<span class="cost">' + value.cost + '</span>' + '</a>';
	console.log(value.assetType)
	shuju.appendChild(subtitle);
	//	点击跳转链接
    var lis = document.getElementsByTagName('li');
      for (var i = 0; i < lis.length; i++) {
        (function (i) {
          lis[i].addEventListener('click', function () {
            if(i==0){
           		window.location.href="index.html";
           	}else if(i==1){
           		window.location.href="cost.html";
           	}                
          }, false);
        }(i))
      }	
});

	    