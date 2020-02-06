var app;
$(function() {
	initVue();
	setTimeout(()=>{document.body.style.opacity=1},1000)
})

function initVue() {
	app = new Vue({
		el: "#ct",
		data: function() {
			return vueData;
		},
		methods: {
			handleClose() {},
			query(){
				console.log(this.$data.form)
			},
			goEdit(id){
				location.href="xjjh.html?id="+id;
			},
			handleClick(tab, event) {
				if(this.$data.activeName=='2'){
					location.href="cylb.html"
				}
			},
			showRowJY() {
				this.$data.jys = [{
						title: 'sdfasdfa',
						subj: '345384375'
					},
					{
						title: 'sdfwe',
						subj: 'asdfasdfasd'
					}
				]
				this.$data.jys.sort();
				this.$data.showJy = true;
			},
			updateName(id) {
				var pos = 0;
				var temp = null;
				this.$data.list.map((item, idx) => {
					if (item.id == id) {
						pos = idx;
						temp = item;
					}
				});
				temp.name = temp.tName;
				temp.isShow = false;
				this.$data.list.sort();

			},
			copyRow(id) {
				var pos = 0;
				var temp = null;
				this.$data.list.map((item, idx) => {
					if (item.id == id) {
						pos = idx;
						temp = item;
					}
				});
				var tem = JSON.parse(JSON.stringify(temp));
				tem.id = this.$data.list.length + 2;
				this.$data.list.push(tem);
			},
			delRow(id) {
				var pos = 0;
				var temp = null;
				this.$data.list.map((item, idx) => {
					if (item.id == id) {
						pos = idx;
						temp = item;
					}
				});
				this.$confirm('确定删除广告计划:' + temp.name + '吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$data.list.splice(pos, 1);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	})
}
