var pages = 3;
var sizes = 3;
var total = 5;
var loading = false;
$(function () {
    loadlist();
    loading = false;  //状态标记
})
//============================滚动加载
$("#container").infinite().on("infinite", function () {
    if (loading) return;
    loading = true;
    pages++; //页数
    $('.weui-loadmore').show();
    setTimeout(function () {
        loadlist();
        loading = false;
    }, 1000);
});
// =======加载数据loadlist();
function loadlist() {
    var html = "";
    $.ajax({
        type: "get",
        url: "shuju.json",
        data: { 'page': pages, 'limit': sizes,},
        dataType: "json",
        error: function (request) {
            $(".weui-loadmore").hide();
            html += '<div class=" weui-loadmore_line" style="width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center">\n' +
                '<span class="weui-loadmore__tips">无更多数据</span>\n' +
                '</div>';
            $("#content").append(html);
        },
        success: function (data) {
        	console.log(data)
            var data_length = data.length;
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var date = data[i].date;
                    var recent = data[i].recent;
                    var time = data[i].time;
                    var address = data[i].address;
                    //暂时的数据
					
					html +=  '<div class="weui-cells">';
					html +=    '<div class="weui-cell">';
					html +=      '<div class="item">';
					html +=        '<div class="itemName">商丘智慧银行项目</div>';
                    html +=        '<div class="itemState itemState2">待审批</div>';
                    html +=      '</div>';
                    html +=      '<div class="item">';
                    html +=        '<div class="costInfo">';
                    //tip后before|being|after|overdue四个状态css
                    html +=          '<div class="costName">¥1000</div>';
                    html +=          '<div class="costTip costTip1">差旅费</div>';
                    html +=        '</div>';
                    html +=      '</div>';
                    html +=      '<div class="item describe">去商水农商行档案管理出差，去商水农商行档案管理出差出。去商水农商行档案管理出差，去商水农商行档案管理出差出。去商水农商行档案管理出差，去商水农商行档案管理出差出。</div>';
                    html += 		'<div class="item">';
					html += 			'<div class="date">2019-04-11</div>';
//					html += 			'<div class="follow">李依依</div>';
					html += 		'</div>';
                    html +=    '</div>';
                    html +=  '</div>';
               
                }
                $("#content").append(html);
                progress()
            }
            else {
                html += '<div class="weui-loadmore_line" style="width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center">\n' +
                    '<span class="weui-loadmore__tips">无更多数据</span>\n' +
                    '</div>';
                $("#content").append(html);
                loading =true;
            }
            $(".weui-loadmore").hide();
        }
    });
}