var city = CityInfo.map((item)=>{
	  item.children.map((item2)=>{
		  item2.children = null;
	  })
	  return item;
})
var times = [];
for(var i=0;i<24;i++){
	var item = {};
	item.value = i;
	item.label= i<10?"0"+i:i;
	item.label = item.label+":00";
	times.push(item);
}
var vueData = {
	form: {
		
		ggzys: "不限",
		rys: '',
		ggzmc: '',
		jhmc: '',
		tfmb: '转化量',
		zhzj: '仅落地页',
		ljdz: null,
		select: '',
		dy: '不限',
		area:city,
		areas:[],
		zone: [],
		xb: '不限',
		nl: ['不限'],
		pt: ['不限'],
		cjfa: '手动',
		tffs: '优先跑量',
		ysType: '1',
		ys: '',
		time1: '',
		time2: '',
		tfsd: '不限',
		times:times,
		sd:[[[7,11]],[[7,11]],[[7,11]],[[7,11]],[[7,11]],[[7,11]],[[7,11]]],
		fkfs: '按展示付费(oCPM)',
		mbzh: '',
	},
	rules: {
		ggzys: [{
			required: true,
			trigger: 'blur'
		}],
		rys: [{
			validator: (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入日预算'));
				}
				if (value < 1000 || value > 9999999.99) {
					return callback(new Error('不少于1000.00元，不超过9999999.99元'));
				}
			},
			required: true,
			trigger: 'blur'
		}],
		ggzmc: [{
				required: true,
				message: '请输入广告组名称',
				trigger: 'blur'
			},
			{
				min: 1,
				max: 20,
				message: '长度为1-20个字符',
				trigger: 'blur'
			}
		],
		jhmc: [{
				required: true,
				message: '请输入计划名称',
				trigger: 'blur'
			},
			{
				min: 1,
				max: 20,
				message: '长度为1-20个字符',
				trigger: 'blur'
			}
		],
		tfmb: [{
			required: true,
			trigger: 'blur'
		}],
		zhzj: [{
			required: true,
			trigger: 'blur'
		}],
		ljdz: [{
			required: true,
			message: '请输入链接地址',
			trigger: 'blur'
		}],
		cjfa: [{
			required: true,
			trigger: 'blur'
		}],
		tffs: [{
			required: true,
			trigger: 'blur'
		}],
		ys: [{
			validator: (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入预算'));
				}
				if (vueData.form.ysType == 1) {
					if (value < 300 || value > 9999999.99) {
						return callback(new Error('不少于300.00元，不超过9999999.99元'));
					}
				} else {
					if (value < 1300 || value > 9999999.99) {
						return callback(new Error('不少于1300.00元，不超过9999999.99元'));
					}
				}
			},
			required: true,
			trigger: 'blur'
		}],
		fkfs: [{
			required: true,
			trigger: 'blur'
		}],
		mbzh: [{
			validator: (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入出价'));
				}
				if (vueData.form.tfmb == '转化量' && (value < 0.1 || value > 2000)) {
					return callback(new Error('不少于0.1元，不超过2000元'));
				}

				if (vueData.form.tfmb == '点击量' && (value < 0.2 || value > 100)) {
					return callback(new Error('不少于0.2元，不超过100元'));
				}

				if (vueData.form.tfmb == '展示量' && (value < 4 || value > 100)) {
					return callback(new Error('不少于4元，不超过100元'));
				}
			},
			required: true,
			trigger: 'blur'
		}],
	}

}
