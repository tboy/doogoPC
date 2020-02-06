var vueData = {
	form: {
		ggw: '按媒体指定位置',
		mts: [],
		cynr: '',
		cybt: '',
		ly: '',
		ggtx: '',

		cyfls: [{
			value: 'zhinan',
			label: '指南',
			children: [{
				value: 'shejiyuanze',
				label: '设计原则',
				children: [{
					value: 'yizhi',
					label: '一致'
				}],
			}],
		}],
		cyfl: '',
		cybq: [],
		bq: '',
	},
	rules: {
		ggw: [{
			required: true,
			trigger: 'blur'
		}],
		cybt: [{
				required: true,
				message: '请输入创意标题',
				trigger: 'blur'
			},
			{
				min: 5,
				max: 30,
				message: '请输入创意标题，创意标题5-30个字',
				trigger: 'blur'
			}
		],
		ly: [{
				required: true,
				message: '请输入来源',
				trigger: 'blur'
			},
			{
				min: 2,
				max: 10,
				message: '请输入来源,来源2-10个字',
				trigger: 'blur'
			}
		],
		ggtx: [{
			required: true,
			trigger: 'blur'
		}],
		cynr: [{
			required: true,
			trigger: 'blur'
		}],
		cyfl: [{
			required: true,
			message: '请选择创意分类',
			trigger: 'blur'
		}],
		cybq: [{
			required: true,
			validator: (rule, value, callback) => {
				if (value.length > 20) {
					return callback(new Error('最多能输入20个标签'));
				}
			},
			trigger: 'change'
		}],
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
