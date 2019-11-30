var type = "1";
var app;
var u;
var idx = -1;
$(function() {


	var obj = {};
	obj.imgs = []; //
	obj.card = [];
	obj.fp = [{
		val: "姓名"
	}, {
		val: "手机号码"
	}];


	obj.myTools = [];
	obj.outTxt = "";
	obj.outImg = '';
	obj.doors = []; //
	obj.shareContent = '';
	obj.shareTitle = '';
	app = new Vue({
		el: '#content',
		data: obj,
		methods: {
			cutText(key, val) {
				app.$data[key] = app.$data[key].substring(0, val);
			}
		}
	});
	initFile();

	$('.btnActive').on("click", function(event) {
		$("#" + type).attr("class", "btnActive");

		type = $(event.currentTarget).attr("id");
		if (type == "1") {
			$("#xs").show();
			$("#yhj").hide();
			$("#hyyx").hide();
			$("#xs").find(".row").hide();
			$($("#xs").find(".row")[0]).show();

		}
		if (type == "2") {
			$("#xs").find(".row").show();
			$("#xs").show();
			$("#yhj").hide();
			$("#hyyx").hide();
		}
		if (type == "3") {
			$("#xs").hide();
			$("#yhj").show();
			$("#hyyx").hide();
		}
		if (type == "4") {
			$("#yhj").hide();
			$("#xs").hide();
			$("#hyyx").show();
		}
		$("#" + type).attr("class", "btnActive sel");
	});
	$('input[name="type"]').on("click", function() {
		$('input[name="type"]').prop("checked", false);
		$(event.currentTarget).prop("checked", true);
	});
	$('input[name="type2"]').on("click", function() {
		$('input[name="type2"]').prop("checked", false);
		$(event.currentTarget).prop("checked", true);
	});

	$($('.btnActive')[0]).trigger("click");
});

function initFile() {
	u = new UploadBase64();
	u.isMatch800_800 = false;

	u.isMatch750_1536 = true;

	u.init({

		input: document.querySelector('#file'),

		callback: function(base64) {
			//console.log("bb:"+base64);
			if (toolImgIdx != -1) {
				if (toolImgIdx == 888) {
					app.$data.outImg = base64;
				} else {
					app.$data.myTools[toolImgIdx].src = base64;
				}

			} else {

				$("#upload-box").html("重新上传");
				var obj = {};
				obj.src = base64;
				app.$data.imgs.unshift(obj);
				$("#uploadImg").attr("src", base64);
				$("#uploadImg").attr("style", "width:100%;height:100%;");
				$("#uploadImg").show();
				$("#imgShow").show();
				$("#imgDel").show();
			}

			$("#file").val(null);
			$("#file").val('');
		},

		loading: function() {



		}

	});
}


function showCard(val) {
	if (val) {
		idx = val;
	} else {
		idx = -1;
	}

	layer.open({
		type: 1,
		title: '选择优惠券',
		skin: 'layui-layer-demo',
		closeBtn: 1,
		area: ['auto'],
		content: $('#voice-layer-content-a2')
	});
}




var g1 = [{
		id: 1,
		title: "1落地頁_優惠卷派發——201912123",
		type: "折扣券",
		time: "2019年02月27日2019年05月09日(已过期)"
	},
	{
		id: 2,
		title: "2落地頁_優惠卷派發——201912123",
		type: "代金券",
		time: "领取后30天内有效"
	},
	{
		id: 3,
		title: "3落地頁_優惠卷派發——201912123",
		type: "优惠券",
		time: "领取后30天内有效"
	}
];

var g2 = [{
		id: 1,
		title: "4落地頁_優惠卷派發——201912123",
		type: "收集銷售綫索",
		time: "2019-03-01 14:27"
	},
	{
		id: 2,
		title: "5落地頁_優惠卷派發——201912123",
		type: "收集銷售綫索",
		time: "2019-03-01 14:27"
	},
	{
		id: 3,
		title: "6落地頁_優惠卷派發——201912123",
		type: "收集銷售綫索",
		time: "2019-03-01 14:27"
	}
];

var g3 = [{
		id: 1,
		title: "7落地頁_優惠卷派發——201912123",
		type: "收集銷售綫索",
		time: "2019-03-01 14:27"
	},
	{
		id: 2,
		title: "8落地頁_優惠卷派發——201912123",
		type: "收集銷售綫索",
		time: "2019-03-01 14:27"
	},
	{
		id: 3,
		title: "9落地頁_優惠卷派發——201912123",
		type: "收集銷售綫索",
		time: "2019-03-01 14:27"
	}
];
//卡卷悬着
var myCard;
$(function() {
	var card = {};
	card.nowPage = 2;
	card.totalPage = 12;
	card.arrs = g1;
	for (var i = 0; i < card.arrs.length; i++) {
		card.arrs[i].isSel = "";
		for (var j = 0; j < app.$data.card.length; j++) {
			if (card.arrs[i].id == app.$data.card[j].id) {
				card.arrs[i].isSel = "checked";
			}

		}

	}
	myCard = new Vue({
		el: '#card',
		data: card,
		// 在 `methods` 对象中定义方法
		methods: {
			next2: function() {

			},
			pre2: function() {

			}
		}
	});

})


function changeHandel2() {
	var flag = $(event.currentTarget).is(':checked');
	$(".cbs2").prop("checked", false);
	$(event.currentTarget).prop("checked", flag);
}


function changeHandel3() {
	var flag = $(event.currentTarget).is(':checked');
	$(".cbs3").prop("checked", false);
	$(event.currentTarget).prop("checked", flag);
}

function addCard() {

	if (idx != -1) {
		$(".cbs2").each(function() {
			var id = parseInt($(this).attr("id"));
			if ($(this).is(":checked")) {
				var hadData = false;
				for (var i = 0; i < app.$data.myTools.length; i++) {
					if (app.$data.myTools[i].vo && app.$data.myTools[i].vo.id == id) {
						hadData = true;
					}
				}
				if (hadData) {
					alert("优惠券已选");
					return;
				}
				if (!hadData) {
					for (var i = 0; i < myCard.$data.arrs.length; i++) {
						var item = myCard.$data.arrs[i];
						if (item.id == id) {
							var obj = {};
							obj.vo = item;
							obj.sel = '1';
							obj.type = '3';
							obj.src = '../images/1.jpg';
							obj.key = app.$data.myTools.length;
							app.$data.myTools.push(obj);
							setTimeout(function() {
								sortViewItem();
								$('.item').arrangeable();


							}, 10);
						}
					}
				}
			}

		});
		idx = -1;
		console.log(app.$data.card);
		layer.closeAll();
		return;
	}


	$(".cbs2").each(function() {
		var id = parseInt($(this).attr("id"));
		if ($(this).is(":checked")) {
			var hadData = false;
			for (var i = 0; i < app.$data.card.length; i++) {
				var id2 = parseInt(app.$data.card[i].id);

				if (id == id2) {
					hadData = true;

				}
			}
			if (!hadData) {
				for (var i = 0; i < myCard.$data.arrs.length; i++) {
					var item = myCard.$data.arrs[i];
					if (item.id == id) {
						app.$data.card.push(item);
					}
				}

			}
		} else {
			var len = app.$data.card.length;
			for (var i = 0; i < app.$data.card.length; i++) {
				if (id == app.$data.card[i].id) {
					app.$data.card.splice(i, 1);
					break;
				}
			}
		}
	});

	console.log(app.$data.card);
	layer.closeAll();
}

function delCard(id) {
	var len = app.$data.card.length;
	for (var i = 0; i < len; i++) {
		if (id == app.$data.card[i].id) {
			app.$data.card.splice(i, 1);
			$(".cbs2").each(function() {
				var id2 = parseInt($(this).attr("id"));
				if (id == id2) {
					$(this).prop("checked", false);
				}
			});
			break;
		}
	}
}

//门店
function showDoor() {
	layer.open({
		type: 1,
		title: '选择门店',
		skin: 'layui-layer-demo',
		closeBtn: 1,
		area: ['auto'],
		content: $('#doorShop')
	})
}

var d1 = [{
		id: 1,
		title: "建设大厦店",
		address: "厦门市思明区湖里街道厦禾路368号"
	},
	{
		id: 2,
		title: "建设大厦店1",
		address: "厦门市思明区湖里街道厦禾路3681号"
	},
	{
		id: 3,
		title: "建设大厦店2",
		address: "厦门市思明区湖里街道厦禾路3682号"
	}
];

var d2 = [{
		id: 4,
		title: "建设大厦店4",
		address: "厦门市思明区湖里街道厦禾路368号"
	},
	{
		id: 5,
		title: "建设大厦店5",
		address: "厦门市思明区湖里街道厦禾路3681号"
	},
	{
		id: 6,
		title: "建设大厦店6",
		address: "厦门市思明区湖里街道厦禾路3682号"
	}
];

var d3 = [{
		id: 7,
		title: "建设大厦店7",
		address: "厦门市思明区湖里街道厦禾路368号"
	},
	{
		id: 8,
		title: "建设大厦店8",
		address: "厦门市思明区湖里街道厦禾路3681号"
	},
	{
		id: 9,
		title: "建设大厦店9",
		address: "厦门市思明区湖里街道厦禾路3682号"
	}
];
var myDoor;
$(function() {
	var door = {};
	door.nowPage = 2;
	door.totalPage = 12;
	door.arrs = d1;
	for (var i = 0; i < door.arrs.length; i++) {
		door.arrs[i].isSel = "";
		for (var j = 0; j < app.$data.doors.length; j++) {
			if (door.arrs[i].id == app.$data.doors[j].id) {
				door.arrs[i].isSel = "checked";
			}

		}

	}
	myDoor = new Vue({
		el: '#myDoor',
		data: door,
		// 在 `methods` 对象中定义方法
		methods: {
			next2: function() {

			},
			pre2: function() {

			}
		}
	});
})

function addDoor() {
	$(".cbs3").each(function() {
		var id = parseInt($(this).attr("id"));
		if ($(this).is(":checked")) {
			var hadData = false;
			for (var i = 0; i < app.$data.myTools.length; i++) {
				if (app.$data.myTools[i].door && app.$data.myTools[i].door.id == id) {
					hadData = true;
				}
			}
			if (hadData) {
				alert("门店已选");
				return;
			}
			if (!hadData) {
				for (var i = 0; i < myDoor.$data.arrs.length; i++) {
					var item = myDoor.$data.arrs[i];
					if (item.id == id) {
						var obj = {};
						obj.door = item;
						obj.sel = '1';
						obj.type = '5'
						obj.key = app.$data.myTools.length;
						app.$data.myTools.push(obj);
						setTimeout(function() {
							sortViewItem();
							$('.item').arrangeable();

						}, 10);
					}
				}
			}
		}

	});
	layer.closeAll();
}



function addProp() {
	if (app.$data.fp.length == 5) {
		alert("只能添加5个表单内容！");
		return;
	};
	var obj = {};
	obj.val = "";
	app.$data.fp.push(obj);
}

function delH(idx) {
	if (app.$data.fp.length == 1) return;
	app.$data.fp.splice(idx, 1);
}

function downH(idx) {
	var temp = app.$data.fp[idx + 1];
	app.$data.fp[idx + 1] = app.$data.fp[idx];
	app.$data.fp[idx] = temp;
	var obj = {};
	obj.val = "";

	app.$data.fp.push(obj);
	app.$data.fp.pop();
}

function upH(idx) {
	var temp = app.$data.fp[idx - 1];
	app.$data.fp[idx - 1] = app.$data.fp[idx];
	app.$data.fp[idx] = temp;
	var obj = {};
	obj.val = "";
	app.$data.fp.push(obj);
	app.$data.fp.pop();

}
