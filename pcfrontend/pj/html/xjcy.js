var app;
$(function() {
	vueData.editOrAdd = "新建创意"
	if (window.location.href.indexOf("?id=") != -1) {
		vueData.editOrAdd = "编辑创意";
	}
	initVue();
	initFile();
	setTimeout(() => {
		document.body.style.opacity = 1
	}, 1000)
})

function initVue() {
	app = new Vue({
		el: "#ct",
		data: function() {
			return vueData;
		},
		methods: {
			addBQ() {

				if (app.$data.form.cybq.length <= 20 && app.$data.form.bq.length > 0) {
					app.$data.form.cybq.push(app.$data.form.bq);
					app.$data.form.bq = ''
				}

			},
			delBq(idx) {
				app.$data.form.cybq.splice(idx, 1);
			},
			upLoadFile(type) {
				imgPos = type;
				if (type == 'cynr') {
					u.minWidth = 1280;
					u.minHeight = 720;
					u.maxWidth = 2560;
					u.maxHeight = 1440;
				} else {
					u.minWidth = 1;
					u.minHeight = 1;
					u.maxWidth = 100000;
					u.maxHeight = 100000;
				}

				$('#file').trigger('click');
			}

		},
	})
}
var imgPos = '';
var u = null;

function initFile() {
	u = new UploadBase64();

	u.init({

		input: document.querySelector('#file'),

		callback: function(base64) {
			//console.log("bb:"+base64);

			// 				app.$data.scItem.img[app.$data.scItem.idx].path = base64;
			// 				let adWord = app.$data.adWord;
			// 				app.$data.adWord = '666';
			// 				app.$data.adWord = adWord;
			if (base64 && imgPos == 'cynr') {
				app.$data.form.cynr = base64;
			} else {
				app.$data.form.ggtx = base64;
			}
			$("#file").val(null);

		},

		loading: function() {



		}

	});
}
