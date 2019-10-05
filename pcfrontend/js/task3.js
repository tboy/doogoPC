
var obj = {};
 obj.dateRate=[];
$(function(){
	app = new Vue({
		el: '#content',
		data: {group:group}
		});
		var ranTime = new Vue({
			el:"#ranTime",
			data:function(){
				var d=new Date();
		     	var dy=  new Date(d);
               dy.setDate(d.getDate() + 29);
			obj.dateRate=[d,dy];
				obj.pickerOptions= {
					onPick: ({ maxDate, minDate }) => {
				
						this.pickerMinDate = minDate.getTime()
						if (maxDate) {
							this.pickerMinDate = ''
						}
					},
					disabledDate: (time) => {
						  let nowData = new Date()
                          nowData = new Date(nowData.setDate(nowData.getDate() - 1))
						  if(time < nowData){
							  
                            return true;
						  }

						if (this.pickerMinDate !== '') {
							const day30 = (30 - 1) * 24 * 3600 * 1000
							let maxTime = this.pickerMinDate + day30
				
							return time.getTime() > maxTime
						}
						return false;
					}
				}
				   return obj;
			}
		});
		
	
 initUI();
});

function initUI(){
	//地域
	initCity();
	
	//每天投放时段
	var time1 = "00";
	var time2 = "23";
	$("#time1").append(getOption1(time1));
	$("#time2").append(getOption2(time1,time2));
		
	//再营销
	/**var type="0,2";
	$("input:checkbox[name='type']").each(function(i) {
	
		var val = $(this).val();
		var selected = type.split(",");
	
		for(var i=0;i<selected.length;i++){
			if(selected[i]==val){
				$(this).attr("checked","checked");
			}
		}
	
	});**/
}
	//客群選擇
function showGroup(){
		layer.open({
			type: 1,
			title: '选择客群',
			skin: 'layui-layer-demo',
			closeBtn: 1,
			area: ['auto'],
			content: $('#voice-layer-content-a1')
		});
	}

	//地域控制
	var sheng = [];
function initCity(){
		var list = city.data.list;
		var str = "";
		for(var i = 0;i<list.length;i++){
			var item = list[i];
			if(item.parent_id==0){
                sheng.push(item);
				str+="<option value='"+item.id+"'>"+item.name+"</option>";
			}
		}
		$("#sheng").html("<option value='-1'>省份</option>"+str);
		changeSheng();
	}
function changeSheng(){
		var list = city.data.list;
		var id = $("#sheng").val();
		var str="";
		for(var i = 0;i<list.length;i++){
			var item = list[i];
			if(item.parent_id==id){
				sheng.push(item);
				str+="<option value='"+item.id+"'>"+item.name+"</option>";
			}
		}

		$("#shi").html("<option value='-1'>城市</option>"+str);
		changeShi();
	}
function changeShi(){
		var list = city.data.list;
		var id = $("#shi").val();
		var str="";
		for(var i = 0;i<list.length;i++){
			var item = list[i];
			if(item.parent_id==id){
				sheng.push(item);
				str+="<option value='"+item.id+"'>"+item.name+"</option>";
			}
		}
		$("#qu").html("<option value='-1'>县区</option>"+str);

	}
   //再营销選擇
function cbVal(name){
   	var str ="";
   	$("input:checkbox[name='"+name+"']").each(function(i) {
   
   		var val = $(this).val();
   	  if($(this).prop('checked')) {
   		  if(str==""){
   			  str =  val;
   		  }else{
   			  str = str + "," + val;
   		  }
   	  }
   
   
   	});
   	return str;
   }
	//構建投放時間1
function getOption1(idx){
		var str = "";
		for(var i=0;i<18;i++){
			var val = i<10?"0"+i:i+"";

			if(val==idx){
				str+="<option value='"+val+"' selected>"+val+":00"+"</option>";
			}else{
				str+="<option value='"+val+"'>"+val+":00"+"</option>";
			}
		}
		return str;
	}
	//構建投放時間2
function getOption2(time1,time2){
		var str = "";


		var idx = parseInt(time1)+6;

		for(var i=idx;i<24;i++){
			var val = i<10?"0"+i:i+"";

			if(val==time2){
				str+="<option value='"+val+"' selected>"+val+":00"+"</option>";
			}else{
				str+="<option value='"+val+"'>"+val+":00"+"</option>";
			}
		}
		return str;
	}
	//控制時間間隔6小時
function selTime() {
     var t1 =  parseInt($("#time1").val());
     var t2 =  parseInt($("#time2").val());
     var t3 = t2-t1;
     var str = "";
     if(t3<6){

		 for(var i=t1+6;i<24;i++){
			 var val = i<10?"0"+i:i+"";
			 str+="<option value='"+val+"'>"+val+":00"+"</option>";

		 }
	 }else{
		 for(var i=t1+6;i<24;i++){
			 var val = i<10?"0"+i:i+"";

			 if(val==t2){
				 str+="<option value='"+val+"' selected>"+val+":00"+"</option>";
			 }else{
				 str+="<option value='"+val+"'>"+val+":00"+"</option>";
			 }
		 }
	 }
     $("#time2").html(str);

	}
	//提交数据
function submitHandle(){

		obj.name=$("#name").val();
		obj.start_time=$("#start_time").val();
		obj.end_time=$("#end_time").val();
		obj.time1=$("#time1").val();
		obj.time2=$("#time2").val();

		obj.type = cbVal("type");
		//地域
		var area = "";

		area +=$("#sheng").find("option:selected").text()+"-";
		area +=$("#shi").find("option:selected").text()+"-";
		area +=$("#qu").find("option:selected").text()+"-";

        obj.area = area;
		obj.dayMoney=$("#dayMoney").val();//
		obj.moneyTime=$("#moneyTime").val();//
		obj.adWord=$("#adWord").val();//

		var time = parseInt(obj.time2)-parseInt(obj.time1);
		if(time<6){
			alert("时间间隔至少6个小时");
			return;
		}
		if(obj.img==""){
			alert("请选择上传图片");
			return;
		}
		if(obj.name.length>30){
			alert("营销任务名称不能超过30字");
			return false;
		}

		if(obj.name.length==0){
			alert("营销任务名称不能空");
			return false;
		}

		if(obj.start_time =="" || obj.end_time==""){
			alert("请选择时间");
			return false;
		}

		if(obj.dayMoney>10000000 || obj.dayMoney<1000) return false;
		if(obj.moneyTime>200 || obj.moneyTime<60) return false;
		if(obj.adWord.length>80){
			alert("广告文案不能超过80字");
			return false;
		}
		console.log(obj);

		//window.location.href="taskManagement.html";
		return false;

	}
	
//客户群悬着

var group = [];
var g1 = [{id:1,title:"afasdf1",time:"2018-09-12",num:123},{id:2,title:"aaa2",time:"2018-10-12",num:66},{id:3,title:"aaa3",time:"2018-10-12",num:66}];
var g2 = [{id:1,title:"afasdf4",time:"2018-09-12",num:123},{id:2,title:"aaa5",time:"2018-10-12",num:66},{id:3,title:"aaa6",time:"2018-10-12",num:66}];
var g3 = [{id:1,title:"afasdf8",time:"2018-09-12",num:123},{id:2,title:"aaa9",time:"2018-10-12",num:66},{id:3,title:"aaa10",time:"2018-10-12",num:66}];

	var myClient;
	$(function(){
		var client ={};
		client.nowPage=2;
		client.totalPage=12;
		client.arrs=g1;
		for(var i=0;i<client.arrs.length;i++){
			client.arrs[i].isSel="";
			for(var j= 0;j<group.length;j++){
				if(client.arrs[i].id==group[j].id){
					client.arrs[i].isSel="checked";
				}

			}

		}
		myClient= new Vue({
			el: '#ct',
			data: client,
			// 在 `methods` 对象中定义方法
			methods: {
				next1:function(){

				},
				pre1:function(){

				}
			}
		});

	});
	function searchHandle(){
		console.log($("#groupName").val());
	}

	function cHandel(){
		debugger;
		var id = parseInt($(event.currentTarget).attr("id"));
				
		if($(event.currentTarget).is(":checked")){
			for(var i = 0;i<myClient.$data.arrs.length;i++){
				var item = myClient.$data.arrs[i];
				if(item.id==id){
					group.push(item);
				}
			}
			}else{
				var len = group.length;
				for(var i = 0;i<len;i++){
					if(id==group[i].id){
						group.splice(i,1);
						break;
					}
				}
			}
			
		
	}

	//添加
	function addClient(){

		


		layer.closeAll();
	}

	function delGroup(id){
		var len = group.length;
		for(var i = 0;i<len;i++){
			if(id==group[i].id){
				group.splice(i,1);
				$(".cbs").each(function() {
					var id2 = parseInt($(this).attr("id"));
					if(id==id2){
						$(this).prop("checked",false);
					}
				});
				break;
			}
		}
	}

	