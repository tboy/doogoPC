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
			query(){
				
				console.log(this.$data.form)
			},
			handleClose() {},
			goEdit(id){
				location.href="xjcy.html?id="+id;
			},
			handleClick(tab, event) {
				if(this.$data.activeName=='1'){
					location.href="jhlb.html"
				}
			},
			showRowJY() {
				this.$data.jys=[
					{title:'sdfasdfa',subj:'345384375'},
					{title:'sdfwe',subj:'asdfasdfasd'}
				]
				this.$data.jys.sort();
				this.$data.showJy = true;
			}
		}
	})
}
