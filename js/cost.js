/*------图表------*/
var data = [{
	assetType: '招待费',
	cost: 4500,
	const: 'const'
}, {
	assetType: '招标费',
	cost: 11500,
	const: 'const'
}, {
	assetType: '差旅费',
	cost: 600,
	const: 'const'
}, {
	assetType: '技术费',
	cost: 12600,
	const: 'const'
}];

var colorMap = {
	'招待费': '#1890FF',
	'招标费': '#2FC25B',
	'差旅费': '#FACC14',
	'技术费': '#F04864'
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
  	height: 320,
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
	
	subtitle.innerHTML = '<a  class="subtitle">' + '<i class="color">' + '</i>' +'<span class="text" id="titleText">' + value.assetType + ':' + '</span>' + '<span class="cost">' + value.cost + "元" + '</span>' + '</a>';
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
           	}else if(i==2){
           		window.location.href="yewu-statistic.html";
            }else if(i==3){
            	window.location.href="index.html";
            }                 
          }, false);
        }(i))
      }	
});

/*日期选择*/
$('#showDatePicker').on('click', function() {
	weui.datePicker({
		start: 2006,
		end: new Date().getFullYear(),
		defaultValue: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()],
		depth: 2,
		onChange: function(result) {
			console.log(result);
		},
		onConfirm: function(result) {
			console.log(result);
		}
	});
});
	    