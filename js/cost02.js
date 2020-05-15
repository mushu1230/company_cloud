// var myChart = echarts.init(document.getElementById('main'));
//          // 指定图表的配置项和数据
//      var option = {
//          title: {//标题组件
////              text: '故障',
//              left:'50px',//标题的位置 默认是left，其余还有center、right属性
//              textStyle: {    
//              color: "#436EEE",    
//              fontSize: 17,   
//              }
//          },
//          tooltip : { //提示框组件
//              trigger: 'item', //触发类型(饼状图片就是用这个)
//              formatter: "{a} <br/>{b} : {c} ({d}%)" //提示框浮层内容格式器
//          },
//          color:['#48cda6','#fd87fb','#11abff','#ffdf6f','#968ade'],  //手动设置每个图例的颜色
//          legend: {  //图例组件
//              //right:100,  //图例组件离右边的距离
//              orient : 'horizontal',  //布局  纵向布局 图例标记居文字的左边 vertical则反之
//              width:40,      //图行例组件的宽度,默认自适应
//              x : 'right',   //图例显示在右边
//              y: 'center',   //图例在垂直方向上面显示居中
//              itemWidth:10,  //图例标记的图形宽度
//              itemHeight:10, //图例标记的图形高度
//              data:['正常','一般','提示','较急','特急'],
//              textStyle:{    //图例文字的样式
//                  color:'#333',  //文字颜色
//                  fontSize:12    //文字大小
//              }
//          },
//          series : [ //系列列表
//              {
//                  name:'设备状态',  //系列名称
//                  type:'pie',   //类型 pie表示饼图
//                  center:['40%','50%'], //设置饼的原心坐标 不设置就会默认在中心的位置
//                  radius : ['50%', '70%'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
//                  itemStyle : {  //图形样式
//                      normal : { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
//                          label : {  //饼图图形上的文本标签
//                              show : false  //平常不显示
//                          },
//                          labelLine : {     //标签的视觉引导线样式
//                              show : false  //平常不显示
//                          }
//                      },
//                      emphasis : {   //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
//                          label : {  //饼图图形上的文本标签
//                              show : true,
//                              position : 'center',
//                              textStyle : {
//                                  fontSize : '10',
//                                  fontWeight : 'bold'
//                              }
//                          }
//                      }
//                  },
//                  data:[
//                      {value:80, name:'正常'},
//                      {value:10, name:'一般'},
//                      {value:30, name:'提示'},
//                      {value:20, name:'较急'},
//                      {value:25, name:'特急'}
//                  ]
//              }
//          ]
//      };
//      myChart.setOption(option);
var dom = document.getElementById("main");
            var myChart = echarts.init(dom);
            window.onresize = myChart.resize;  // 适应屏幕放大缩小
            var ecConfig = require('echarts/config');
			myChart.on(ecConfig.EVENT.CLICK, eConsole);
            var app = {};
            option = null;
            option = {
			    tooltip: {
			  	show:false,
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        x: 'left',
			        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
			    },
			    series: [
			        {
			            name:'访问来源',
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: false,
			            clickable : true,
			            hoverAnimation:false,
			            silent:true,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center',
			                    formatter:function(){
			                    	return '总数 \r\n 23.000.00'
			                    },
			                    textStyle:{
			                    	fontSize:40,
			                    	color:'green'
			                    }
			                },
			                emphasis: {
			                    show: true,
			                    textStyle: {
			                        fontSize: '30',
			                        fontWeight: 'bold'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:[
			                {value:335, name:'直接访问', url:'www.baidu.com'},
			                {value:310, name:'邮件营销'},
			                {value:234, name:'联盟广告'},
			                {value:135, name:'视频广告'},
			                {value:1548, name:'搜索引擎'}
			            ]
			        }
			    ]
			};

			
//			myChart.on('click', function (param){
//                 	var name=param.name;
//                 	if(name=="直接访问"){
//                 		window.location.href="${base}/admin/user/list.htm";
//                 	}else if(name=="邮件营销"){
//                 		window.location.href="${base}/admin/classify/list.htm";
//                 	}else if(name=="联盟广告"){
//                 		window.location.href="${base}/admin/news/list.htm";
//                  }else{
//                  	window.location.href="${base}/admin/file/list.htm";
//                  }                   	
//     			});
//             	myChart.on('click',eConsole);

			
//			myChart.on('click', function (param){
//  var selected = param.name;
//      if (selected) {
//          switch(selected){
//              case '直接访问':
//                  location.href = "www.baidu.com";
//                  break;
//              case '葫芦岛市':
//                  location.href = "{:U('Goods/index_city',array('id'=>14))}";
//                  break;
//
//              default:
//                  break;
//          }
//
//      }
//  });

			
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}


//option = {
//	tooltip:{
//		show:true,
//		trigger:'item',
//		formatter: function(params, ticket, callback){
//			var num = '20.000.00';
//			var str = '<div style="text-align:center" id="toolTipBox"><p style="font-size:12px;margin:0px;color:green;">总数</p><p style="font-size:20px;margin:0px"> ' + num + '</p></div>'
//			return str
//		},
//		positon: function(point, params, dom, rect, size){
//			var marginW = Math.ceil(size.contentSize[0]/2);
//			var marginH = Math.ceil(size.contentSize[1]/2);
//			dom.style.marginLeft= '-' +marginW + 'px';
//			dom.style.marginTop='-' +marginH +'px';
//			return ['50%', '50%'];
//		},
//		alwaysShowContent:true,
//		backgroundColor:'#f3f5f6',
//		
//	}
//}

//option = {
//  tooltip: {
//  	show:false,
//      trigger: 'item',
//      formatter: "{a} <br/>{b}: {c} ({d}%)"
//  },
//  legend: {
//      orient: 'vertical',
//      x: 'left',
//      data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
//  },
//  series: [
//      {
//          name:'访问来源',
//          type:'pie',
//          radius: ['50%', '70%'],
//          avoidLabelOverlap: false,
//          hoverAnimation:false,
//          silent:true,
//          label: {
//              normal: {
//                  show: false,
//                  position: 'center',
//                  formatter:function(){
//                  	return '总数 \r\n 23.000.00'
//                  },
//                  textStyle:{
//                  	fontSize:40,
//                  	color:'green'
//                  }
//              },
//              emphasis: {
//                  show: true,
//                  textStyle: {
//                      fontSize: '30',
//                      fontWeight: 'bold'
//                  }
//              }
//          },
//          labelLine: {
//              normal: {
//                  show: false
//              }
//          },
//          data:[
//              {value:335, name:'直接访问'},
//              {value:310, name:'邮件营销'},
//              {value:234, name:'联盟广告'},
//              {value:135, name:'视频广告'},
//              {value:1548, name:'搜索引擎'}
//          ]
//      }
//  ]
//};
