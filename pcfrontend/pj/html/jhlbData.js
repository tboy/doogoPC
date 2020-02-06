var vueData = {
	activeName:'1',
	form: {
		keyWord: "",
		daterange: '',
		pageSize:10,
		total:100,
		currentPage:2
	},
	showJy: false,
	xs:false,
	jys: [],
	pickerOptions: {
		shortcuts: [{
				text: '今天',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					picker.$emit('pick', [start, end]);
				}
			},
			{
				text: '昨天',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
					end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
					picker.$emit('pick', [start, end]);
				}
			},
			{
				text: '过去7天',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', [start, end]);
				}
			}, {
				text: '过去30天',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					picker.$emit('pick', [start, end]);
				}
			}, {
				text: '本周',
				onClick(picker) {
					console.log(ThisWeekStr())
					picker.$emit('pick', ThisWeekStr());
				}
			},
			{
				text: '上周',
				onClick(picker) {

					picker.$emit('pick', LastWeekStr());
				}
			},
			{
				text: '本月',
				onClick(picker) {
					picker.$emit('pick', ThisMonthStr());
				}
			},
			{
				text: '上月',
				onClick(picker) {

					picker.$emit('pick', lastMonthStr());
				}
			},
		]
	},
	list: [{
			id: 1,
			
			isOpen: true,
			name: '流量经营 oCPM',
			tName: '流量经营 oCPM',
			isShow:false,
			yl: '../images/qcode.png',
			ggcy: '../images/imgs.jpg',
			ggcyDetail: "考虑到房价奥利弗快递费；史蒂夫卡死了",
			state: '已暂停',
			jy: '阿斯顿开房纪录时刻放进塑料袋',
			xh: 18.88,
			cj: 166.22,
			ys: 500
		}, {
			id: 2,
			isOpen: false,
			name: '流量经营 oCPM',
			tName: '流量经营 oCPM',
			isShow:false,
			ggcy: '../images/imgs.jpg',
			ggcyDetail: "考虑到房价奥利弗史蒂夫卡死了",
			state: '已暂停',
			jy: '阿斯顿开房纪录时刻放进塑料袋',
			xh: 18.88,
			cj: 166.22,
			ys: 500
		},
		{
			id: 3,
			isOpen: true,
			name: '流量经营 oCPM',
			tName: '流量经营 oCPM',
			isShow:false,
			ggcy: '../images/imgs.jpg',
			ggcyDetail: "考虑到房价奥利弗；史蒂夫卡死了",
			state: '已暂停',
			jy: null,
			xh: 18.88,
			cj: 166.22,
			ys: 500
		}

	]
}


/*
 *获取本周的起始和结束时间
 *返回值："起始时间,结束时间"
 */
function ThisWeekStr() {
	var returnStr = "";
	var date = new Date(); //当前时间
	var week = date.getDay(); //获取今天星期几
	var monday = GetDate2(week - 1, 1, date); //获取星期一
	var sunday = GetDate2(7 - week, 2, date); //获取星期天
	//起始时间的年月日
	var year1 = monday.getFullYear();
	var month1 = monday.getMonth() + 1;
	var day1 = monday.getDate();
	//结束时间的年月日
	var year2 = sunday.getFullYear();
	var month2 = sunday.getMonth() + 1;
	var day2 = sunday.getDate();
	//处理起始时间小于10的追加"0"在前面
	month1 = month1 < 10 ? "0" + month1 : month1;
	day1 = day1 < 10 ? "0" + day1 : day1;
	//处理结束时间小于10的追加"0"在前面
	month2 = month2 < 10 ? "0" + month2 : month2;
	day2 = day2 < 10 ? "0" + day2 : day2;

	var start = new Date(year1 + "-" + month1 + "-" + day1 + " 00:00:00"); //起始时间
	var end = new Date(year2 + "-" + month2 + "-" + day2 + " 23:59:59"); //结束时间
	return [start, end];
}

/*
 *获取上周的起始和结束时间
 *返回值："起始时间,结束时间"
 */
function LastWeekStr() {
	var returnStr = "";
	var date = new Date(); //当前时间
	var week = date.getDay(); //获取今天星期几
	var monday = GetDate2(week + 6, 1, date); //获取上周星期一
	var sunday = GetDate2(week, 1, date); //获取上周星期天
	//起始时间的年月日
	var year1 = monday.getFullYear();
	var month1 = monday.getMonth() + 1;
	var day1 = monday.getDate();
	//结束时间的年月日
	var year2 = sunday.getFullYear();
	var month2 = sunday.getMonth() + 1;
	var day2 = sunday.getDate();
	//处理起始时间小于10的追加"0"在前面
	month1 = month1 < 10 ? "0" + month1 : month1;
	day1 = day1 < 10 ? "0" + day1 : day1;
	//处理结束时间小于10的追加"0"在前面
	month2 = month2 < 10 ? "0" + month2 : month2;
	day2 = day2 < 10 ? "0" + day2 : day2;

	var start = new Date(year1 + "-" + month1 + "-" + day1 + " 00:00:00"); //起始时间
	var end = new Date(year2 + "-" + month2 + "-" + day2 + " 23:59:59"); //结束时间
	return [start, end];
}

/*
 *获取本月的起始和结束时间
 *返回值："起始时间,结束时间"
 */
function ThisMonthStr() {
	var returnStr = "";
	var date = new Date(); //当前时间
	var year = date.getFullYear();
	var month = date.getMonth();

	var min = new Date(year, month, 1); //本月月初
	var max = new Date(year, month + 1, 0); //本月月底

	//起始时间的年月日
	var year1 = min.getFullYear();
	var month1 = min.getMonth() + 1;
	var day1 = min.getDate();
	//结束时间的年月日
	var year2 = max.getFullYear();
	var month2 = max.getMonth() + 1;
	var day2 = max.getDate();
	//处理起始时间小于10的追加"0"在前面
	month1 = month1 < 10 ? "0" + month1 : month1;
	day1 = day1 < 10 ? "0" + day1 : day1;
	//处理结束时间小于10的追加"0"在前面
	month2 = month2 < 10 ? "0" + month2 : month2;
	day2 = day2 < 10 ? "0" + day2 : day2;

	var start = new Date(year1 + "-" + month1 + "-" + day1 + " 00:00:00"); //起始时间
	var end = new Date(year2 + "-" + month2 + "-" + day2 + " 23:59:59"); //结束时间
	return [start, end];
}

function lastMonthStr() {
	var date = new Date(); //当前时间
	var year = date.getFullYear();
	var month = date.getMonth();

	var min = new Date(year, month - 1, 1); //本月月初
	var max = new Date(year, month, 0); //本月月底
	return [min, max];
}

/*
 *获取传入的日期前N天或后N日期(N = day)
 *type:1：前；2：后
 *date：传入的日期
 */
function GetDate2(day, type, date) {
	var zdate;
	if (date === null || date === undefined) {
		zdate = new Date();
	} else {
		zdate = date;
	}
	var edate;
	if (type === 1) {
		edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
	} else {
		edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
	}
	return edate;
}
