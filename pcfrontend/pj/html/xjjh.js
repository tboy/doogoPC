var app;
$(function() {
	vueData.editOrAdd = "新建计划"
	if (window.location.href.indexOf("?id=") != -1) {
		vueData.editOrAdd = "编辑计划";
	}
	initVue();
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
			setUrl() {
				app.$data.form.ljdz = app.$data.form.select;
				app.$data.form.select = "";
			},
			delCity(idx) {
				app.$data.form.areas.splice(idx, 1);
				app.$data.form.areasID.splice(idx, 1);
				app.$data.form.areas.sort();
				var temp = app.$data.form.dy;
				app.$data.form.dy = ''
				setTimeout(() => {

					app.$data.form.dy = temp;
				}, 20);


			},
			changeMb() {
				if (app.$data.form.tfmb == '转化量') {
					app.$data.form.tffs = "优先跑量";
					app.$data.form.fkfs = '按展示付费(oCPM)';
				}
				if (app.$data.form.tfmb == '点击量') {
					app.$data.form.cjfa = "手动";
					app.$data.form.tffs = "标准投放(推荐)";
					app.$data.form.fkfs = '按点击付费(CPC)';
				}
				if (app.$data.form.tfmb == '展示量') {
					app.$data.form.cjfa = "手动";
					app.$data.form.tffs = "标准投放(推荐)";
					app.$data.form.fkfs = '按展示付费(CPM)';
				}
			},
			muilSel(val) {
				if (event.currentTarget.value == "不限") {
					app.$data.form[val] = ['不限'];
					app.$data.form[val].sort();
				} else {
					let arr = [];
					app.$data.form[val] = app.$data.form[val].map((item) => {
						if (item != "不限") {
							return item;
						}
					})
					app.$data.form[val].sort();
				}
			},
			changeToFormValue(property, val) {
				app.$data.zone = val;
				// console.log(this.formData[property])
			},
			getSelArea() {
				app.$data.form.areas = this.$refs.areaSel.getCheckedNodes(true);
				console.log(app.$data.form.areas);
				app.$data.form.areas.sort();
			},
			back() {
				//取消
			},
			add(val) {
				app.$data.form.sd[val].push([8, 12]);
			},
			del(pos, idx) {
				app.$data.form.sd[pos].splice(idx, 1);
			},
			save(val) {

				this.$refs.form.validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				//val,保存 1，2
				console.log(app.$data.form);
			}

		},
	});
}
