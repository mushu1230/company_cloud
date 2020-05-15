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
                    html +='<div class="weui-cell">';
                    html +='<div class="customer-group">';
                    html +='<div class="img">阿</div>';
                    html +='<div class="content">';
                    html +='<div class="info">';
                    html +='<span class="name">阿大</span>';
                    html +='<div class="customer-tip potential">意向用户</div>';
                    html +='</div>';
                    html +='<div class="describe"> 深入交谈之后，客户有合作意向。有待进一步跟进。 深入交谈之后，客户有合作意向。有待进一步跟进。</div>';
                    html +='<div class="date"> 访问时间:2019-05-11</div>';
                    html +='</div>';
                    html +='</div>';
                    html +='</div>';
                }
                $("#content").append(html);
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