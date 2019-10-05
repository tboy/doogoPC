$(function() {
	$('.number-view .number-item .genre-item .item').click(function() {
		$(this).addClass('on').siblings().removeClass('on')
	})

	$('body').on('click','.number-item .delete',function() {
		$(this).parents('li').remove()
	})

    $('body').on('click','.select-kq,.dd3-item .select-kaquan',function() {
        layer.open({
            type: 1,
            title: '选择优惠券',
            skin: 'layui-layer-demo',
            closeBtn: 1,
            area: ['auto'],
            content: $('#voice-layer-content-a3')
        });
    })

    $('body').on('click','.select-back',function() {
        layer.open({
            type: 1,
            title: '选择落地页',
            skin: 'layui-layer-demo',
            closeBtn: 1,
            area: ['auto'],
            content: $('#voice-layer-content-a2')
        });
    })

	$(document).on("input propertychange",".number-view .number-item .content textarea",function(){
        var lengthText = $(this).val().length
        $(this).siblings('.count').find('span').text(lengthText)
    });

	$(document).on("input propertychange",".number-view .number-item .content input",function(){
        var lengthText = $(this).val().length
        $(this).siblings('.count').find('span').text(lengthText)
    });

    $('body').on('change','.number-view .number-item .upload .pic input',function() {
        $filePath=URL.createObjectURL(this.files[0]);
        layer.msg('玩命提示中');
        $(this).siblings('img').attr('src',$filePath)
    })

    $('.item-select .user').click(function() {
        if ($(this).is('.on')) {
            $(this).removeClass('on')
        } else {
            $(this).addClass('on')
        }
    })

    $('.number-view .number-item .select-complete i').click(function() {
    	$(this).parents('.select-complete').after('<div class="select">选择卡券</div>')
    	$(this).parents('.select-complete').remove()
    })

    $('body').on('change','.addSelect',function() {
        var html,
            selected = $(this).val();
        if (selected == '图片') {
            html = '<li class="dd-item dd3-item" data-id="14"><div class="upload-item flex"><div class="upload flex flexAtcent flexJcent"><div class="pic flex flexAtcent flexJcent"><img src="../images/upload-pic.png" alt="">'+'<input type="file"></div></div>'+'<div class="dd-handle dd3-handle"><img src="../images/handle-icon.png" alt=""></div>'+'<div class="delete"><img src="../images/delete-icon.png" alt=""></div>'+'<div class="select select-kq">选择卡券</div></div>'+'<div class="upload-explain"><p>图片宽度要求是750px，高度不超过1536像素，</p>'+'<p>大小不超过300KB，支持PNG,JPG,JPEG,不支持GIF格式</p></div></li>'
        } else if (selected == '文本') {
            html = '<li class="dd-item dd3-item" data-id="15"><div class="upload-item flex"><input type="text" placeholder="输入文本" maxlength="300">'+'<div class="count"><span>0</span>/300</div>'+'<div class="dd-handle dd3-handle"><img src="../images/handle-icon.png" alt=""></div>'+'<div class="delete"><img src="../images/delete-icon.png" alt=""></div>'+'<select class="modalitySelect"><option value="标题-大">标题-大</option>'+'<option value="标题-小">标题-小</option>'+'<option value="正文-大">正文-大</option>'+'<option value="正文-小">正文-小</option></select></div></li>'
        } else if (selected == '优惠券') {
            html = '<li class="dd-item dd3-item" data-id="16"><div class="upload-item flex"><div class="select-kaquan">选择卡券</div>'+'<div class="dd-handle dd3-handle"><img src="../images/handle-icon.png" alt=""></div>'+'<div class="delete"><img src="../images/delete-icon.png" alt=""></div>'+'<select class="modalitySelect"><option value="红色">红色</option>'+'<option value="绿色">绿色</option>'+'<option value="黄色">黄色</option>'+'</select>'+'<div class="select select-back">选择背景图</div></div></li>'
        } else if (selected == '占位') {
            html = '<li class="dd-item dd3-item" data-id="17"><div class="upload-item flex"><input type="number" placeholder="输入间距高度" maxlength="500">'+'<div class="dd-handle dd3-handle"><img src="../images/handle-icon.png" alt=""></div>'+'<div class="delete"><img src="../images/delete-icon.png" alt=""></div></div></li>'
        }
        $('.dd-list').append(html)
        $(this).val('添加控件')
        $('#nestable3').nestable();
    })

	var updateOutput = function(e)
    {
        var list = e.length ? e : $(e.target),
            output = list.data('output');
        if (window.JSON) {
            output.val(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
        } else {
            output.val('JSON browser support required for this demo.');
        }
    };

    $('.button span').click(function() {
        var index = $(this).index()
        if (index == 0) {
            console.log('确认按钮')
        }
    })
})