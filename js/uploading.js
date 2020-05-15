$(function(){
    var uploadCount = 0;
    var uploadCustomFileList = [];
    var countA= [];
    var uploadCountDom = document.getElementById("uploadCount");
    
    weui.uploader('#uploader', {
        url: '',
        auto: true,//设置为true ，不需要手动调用上传，有文件选择即开始上传
        type: 'file', //上传类型, file为文件上传; base64为以base64上传
        fileVal: 'fileVal',//文件上传域的name
        compress: {
            width: 1600,
            height: 1600,
            quality: .8
        },
        //文件添加前的回调，return false则不添加
        onBeforeQueued: function(files) {
            // `this` 是轮询到的文件, `files` 是所有文件
            countA=[];
            if(["image/jpg", "image/jpeg", "image/png"].indexOf(this.type) < 0){
                $.alert('请上传正确的图片类型（jpg/jpeg/png）');
                return false; // 阻止文件添加
            }
            if(this.size > 20 * 1024 * 1024){
                $.alert('请上传不超过20M的图片');
                return false;
            }
            if (files.length >6) { // 防止一下子选择过多文件
                $.alert('一次只能上传6张图片，请重新选择');
                return false;
            }
            if (uploadCount + 1 >6) {
                $.alert('最多只能上传6张图片');
                    return false;
                }
 
                ++uploadCount;
                uploadCountDom.innerHTML = uploadCount;
                // return true; // 阻止默认行为，不插入预览图的框架
        },
        //文件添加成功的回调
        onQueued: function(){
            uploadCustomFileList.push(this);
            // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
            // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64
 
                // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
            // countA.push(this.id)
 
                // this.stop(); // 中断上传
 
                // return true; // 阻止默认行为，不显示预览图的图像
            },
            //文件上传前调用
            onBeforeSend: function(data, headers){
 
//                 $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
            // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
 
                // return false; // 阻止文件上传
            },
            //上传进度的回调
            onProgress: function(procent){
 
                // return true; // 阻止默认行为，不使用默认的进度显示
       		},
        //上传成功的回调
        onSuccess: function (ret) {
            countA.push(ret.data)
            // return true; // 阻止默认行为，不使用默认的成功态
        },
        //上传失败的回调
        onError: function(err){
            // return true; // 阻止默认行为，不使用默认的失败态
        }
    });

    var $gallery = $("#gallery"), $galleryImg = $("#galleryImg"),
        $uploaderFiles = $("#uploaderFiles");
    var index; //第几张图片
    $uploaderFiles.on("click", "li", function(){
        index = $(this).index();
        $galleryImg.attr("style", this.getAttribute("style"));
            $gallery.fadeIn(100);
        });
 
        $gallery.on("click", function(){
        $gallery.fadeOut(100);
    });
    //删除图片
    $(".weui-gallery__del").click(function(e) {
        var target = e.target;
        var id = target.getAttribute('data-id');
        for (var i = 0, len = uploadCustomFileList.length; i < len; ++i) {
            var file = uploadCustomFileList[i];
            if (file.id == id) {
                index = i;
                break;
            }
        }
        uploadCustomFileList.splice(index, 1);
        $uploaderFiles.find("li").eq(index).remove();
        uploadCount = uploadCount-1;
        uploadCountDom.innerHTML = uploadCount;
    });
    //点击提交事件
        var flag = true;
        //弹出式提示
    var $toast = $('#toast');
    var $toastContent = $('.weui-toast__content');
});