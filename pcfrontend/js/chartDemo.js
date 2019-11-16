option = {
	title: {
		text: '关键指标趋势图',
		textStyle: {
			color: '#666',
			fontSize: 14,
		}
	},
	tooltip: {
		trigger: 'axis',
		formatter: function (params){
		   str = params[0].seriesName+" : "+params[0].value +"<br>";
		   str += params[1].seriesName+" : "+params[1].value+"<br>";
		    str += params[1].axisValue
	     return str;
		    
		}
	},

	grid: {
		top: 60,
		right: 30,
		bottom: 40,
		left: 30
	},
	legend: {
		top: 32,
		left: 'center',
		show: true,
		data: ['推广计划20191111', '推广计划20191112']
	},
	calculable: true,
	xAxis: [{
		show: true,
		type: 'category',
		data: ['20190121', '20190122', '20190123', '20190124', '20190125']
	}],
	yAxis: [{
			type: 'value',
			name: "",
			nameLocation: "center",
			nameGap: 35,
			nameRotate: 0,
			nameTextStyle: {
				fontSize: 16,
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			//默认以千分位显示，不想用的可以在这加一段
			axisLabel: { //调整左侧Y轴刻度， 直接按对应数据显示
				show: true,
				showMinLabel: true,
				showMaxLabel: true,
				formatter: '{value}'
			}
		}
	],
	series: [{
			name: '推广计划20191111',
			type: 'line',
			smooth: true,
			tooltip: {
				trigger: 'axis'
			},
			symbol:'none',
			yAxisIndex: 0,
			data: [35, 15, 8, 12, 11, 6, 3, 0, 0, 0, 0, 0],
			
		},
		{
			name: '推广计划20191112',
			type: 'line',
			smooth: true,
				symbol:'none',
			yAxisIndex: 0,
			tooltip: {
				trigger: 'axis'
			},
			data: [16, 16, 6, 5, 4, 4, 3, 0, 0, 0, 0, 0],
			
		}
	]
};
