'use strict';

function Appendzero(obj) {
	if(obj < 10) return "0" + "" + obj;
	else return obj;
}
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
	return typeof obj;
} : function(obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var _createClass = function() {
	function defineProperties(target, props) {
		for(var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if(protoProps) defineProperties(Constructor.prototype, protoProps);
		if(staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if(!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}
var LunarHelp = function() {
	function LunarHelp(year, month, day) {
		_classCallCheck(this, LunarHelp);

		this.lunarInfo = new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);

		this.nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
		this.nStr2 = new Array('初', '十', '二', '三');

		var date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
console.log(date)
		var i,
			leap = 0,
			temp = 0; //天数
		var baseDate = new Date(1900, 0, 31);
		var offset = (date - baseDate) / 86400000;

		var dayCyl = offset + 40
		var monCyl = 14
		for(i = 1900; i < 2050 && offset > 0; i++) {
			temp = this.lYearDays(i)
			offset -= temp
			monCyl += 12
		}
		if(offset < 0) {
			offset += temp;
			i--;
			monCyl -= 12
		}
		var year = i
		var yearCyl = i - 1864
		leap = this.leapMonth(i) //闰哪个月
		var isLeap = false
		for(i = 1; i < 13 && offset > 0; i++) {
			//闰月
			if(leap > 0 && i == (leap + 1) && isLeap == false) {
				--i;
				isLeap = true;
				temp = this.leapDays(year);
			} else { temp = this.monthDays(year, i); }
			//解除闰月
			if(isLeap == true && i == (leap + 1)) this.isLeap = false
			offset -= temp
			if(isLeap == false) monCyl++
		}
		if(offset == 0 && leap > 0 && i == leap + 1)
			if(isLeap) { isLeap = false; }
		else { isLeap = true;--i;--monCyl; }
		if(offset < 0) { offset += temp;--i;--monCyl; }

		this.month = i;
		//最后剩余的就是日期
		this.day = offset + 1;
	}

	// 获取y年的总天数
	_createClass(LunarHelp, [{
		key: 'lYearDays',
		value: function lYearDays(y) {
			var i, sum = 348
			for(i = 0x8000; i > 0x8; i >>= 1) sum += (this.lunarInfo[y - 1900] & i) ? 1 : 0
			return(sum + this.leapDays(y))
		}
		//获取闰年闰月的天数 闰大月还是小月
	}, {
		key: 'leapDays',
		value: function leapDays(y) {
			if(this.leapMonth(y)) return((this.lunarInfo[y - 1900] & 0x10000) ? 30 : 29)
			else return(0)
		}

		//获取闰年闰哪个月1-12 ,没闰传回 0

	}, {
		key: 'leapMonth',
		value: function leapMonth(y) {
			return(this.lunarInfo[y - 1900] & 0xf)
		}

		//获取y年m月的总天数 正常月
	}, {
		key: 'monthDays',
		value: function monthDays(y, m) {
			return((this.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29)
		}

		//中文日期
	}, {
		key: 'cDay',
		value: function cDay(d) {
			var s;

			switch(d) {
				case 10:
					s = '初十';
					break;
				case 20:
					s = '二十';
					break;
					break;
				case 30:
					s = '三十';
					break;
					break;
				default:
					s = this.nStr2[Math.floor(d / 10)];
					s += this.nStr1[d % 10];
			}
			return s;
		}
		//中文月份

	}, {
		key: 'cMonth',
		value: function cMonth(m) {
			var s;
			switch(m) {
				case 1:
					s = '正月';
					break;
				case 2:
					s = '二月';
					break;
				case 3:
					s = '三月';
					break;
				case 4:
					s = '四月';
					break;
				case 5:
					s = '五月';
					break;
				case 6:
					s = '六月';
					break;
				case 7:
					s = '七月';
					break;
				case 8:
					s = '八月';
					break;
				case 9:
					s = '九月';
					break;
				case 10:
					s = '十月';
					break;
				case 11:
					s = '十一月';
					break;
				case 12:
					s = '十二月';
					break;
				default:
					break;
			}
			return s;
		}
		//获得阴历日期 字符串
	}, {
		key: 'getLunarDay',
		value: function getLunarDay() {
			return cMonth(this.month) + cDay(this.day);
		}
		//获得阴历日期某一天的中文

	}, {
		key: 'getLunarDayName',
		value: function getLunarDayName() {
			if(this.day == 1) return this.cMonth(this.month);
			return this.cDay(this.day);
		}
		//获取阴历日期的数字

	}, {
		key: 'getLunarDayNum',
		value: function getLunarDayNum() {
			return {
				day: this.day,
				month: this.month
			};
		}
	}]);
	return LunarHelp;
}();

var SimpleCalendar = function() {
	//构造函数

	function SimpleCalendar(query, options) {
		_classCallCheck(this, SimpleCalendar);

		//默认配置
		this._defaultOptions = {
			width: '500px',
			height: '500px',
			language: 'CH', //语言
			showLunarCalendar: true, //阴历
			showHoliday: true, //休假
			showFestival: true, //节日
			showLunarFestival: true, //农历节日
			showSolarTerm: true, //节气
			showYc: true, //标记
			showZc: true,
			timeRange: {
				startYear: 1900,
				endYear: 2049
			},
			timeZone: "", //时区
			yc: {
				//				'2017-8-5': '上学',
				//				'2017-8-15': '上学',
				//				'2017-8-25': '上学'
			},
			zc: {
				//				'2017-8-5': '上学',
				//				'2017-8-15': '上学',
				//				'2017-8-25': '上学'
			},
			theme: {
				changeAble: false,
				weeks: {
					backgroundColor: '#FBEC9C',
					fontColor: '#4A4A4A',
					fontSize: '20px'
				},
				days: {
					backgroundColor: '#ffffff',
					fontColor: '#565555',
					fontSize: '24px'
				},
				todaycolor: 'orange',
				activeSelectColor: 'orange',
				invalidDays: '#C1C0C0'
			}
		};

		//容器
		this.container = document.querySelector(query);

		this._defaultOptions.width = this.container.style.offsetWidth;
		this._defaultOptions.height = this.container.style.offsetHeight;

		//得到最终配置
		this._options = this.optionAssign(this._defaultOptions, options);

		this.create();
	}

	//用B更新A的属性 并返回结果

	_createClass(SimpleCalendar, [{
		key: 'optionAssign',
		value: function optionAssign(optionsA, optionsB) {
			for(var key in optionsB) {
				if(_typeof(optionsA[key]) !== 'object') optionsA[key] = optionsB[key];
				else {
					optionsA[key] = this.optionAssign(optionsA[key], optionsB[key]);
				}
			}
			return optionsA;
		}

		//生成日历样式

	}, {
		key: 'create',
		value: function create() {
			var root = this.container;
			root.style.width = this._options.width;
			root.style.height = this._options.height;
			var title = root.querySelector('.sc-title');
			var scbody = root.querySelector('.sc-body');
			var days = scbody.querySelector('.sc-days');
			var week = root.querySelector('.sc-week');
			for(var i = 0; i < 7; i++) {
				week.innerHTML = week.innerHTML + ' <div class="sc-week-item"></div>';
			}
			for(var i = 0; i < 42; i++) {
				days.innerHTML = days.innerHTML + '<div class="sc-item"><p class="yc sc-mark-hide">•</p><div class="day"></div><div class="lunar-day"></div></div>';
			}
			//添加下拉框数据
			this.updateSelect(this.tyear, this.tmonth);
			//刷新日历
			this.update();
			//时间刷新
			self.setInterval('SimpleCalendar.timeupdate()', 200);
		}

		//刷新日历

	}, {
		key: 'update',
		value: function update() {
			var month = arguments.length <= 0 || arguments[0] === undefined ? this.tmonth : arguments[0];
			var year = arguments.length <= 1 || arguments[1] === undefined ? this.tyear : arguments[1];
			var length = this._defaultOptions.yc.length;
			var zclength = this._defaultOptions.zc.length;

			this.updateWeek();
			this.addData(year, month);
			this.updateYc(year, month);
			this.updateZc(year, month);

			this.updateEvent();
		}
		//刷新下拉框 只有在初始化和设置语言后才会更新
	}, {
		key: 'updateSelect',
		value: function updateSelect(year, month) {
			//下拉框
			var selectYear = this.container.querySelector('.sc-select-year');
			var selectMonth = this.container.querySelector('.sc-select-month');
			selectYear.innerText = year;
			selectMonth.innerText = SimpleCalendar.prototype.languageData.months_CH[month - 1];
		}

	}, { //刷新星期
		key: 'updateWeek',
		value: function updateWeek() {
			var weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
			var data = this.languageData['days_' + this._options.language];
			if(!data) {
				console.error('language error!');
			}
			weeks.forEach(function(v, i) {
				v.innerHTML = data[i];
			});
		}

	}, { //添加阳历阴历数据
		key: 'addData',
		value: function addData(year, month) {
			var daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
			var day = new Date(year, month - 1, 1);
			var week = day.getDay();
			if(week == 0) week = 7;
			var container = this.container;

			if((week == 7 && (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)) ||
				(week == 6 && (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)) ||
				(week == 7 && (month == 4 || month == 6 || month == 9 || month == 11))) {
				container.querySelector('.sc-body').classList.remove('showmonth5');
				container.querySelector('.sc-body').classList.add('showmonth6');
			} else {
				container.querySelector('.sc-body').classList.add('showmonth5');
				container.querySelector('.sc-body').classList.remove('showmonth6');
			}

			//计算得到第一个格子的日期
			var thispageStart = new Date(Date.parse(day) - (week - 1) * 24 * 3600 * 1000);
			//对每一个格子遍历
			for(var i = 0; i < 42; i++) {
				daysElement[i].className = 'sc-item';
				var theday = new Date(Date.parse(thispageStart) + i * 24 * 3600 * 1000);
				var writeyear = theday.getFullYear();
				var writeday = theday.getDate();
				var writemonth = theday.getMonth() + 1;
				if(writemonth > month) {
					daysElement[i].classList.add('sc-nextmonth');
					if ('$(.sc-nextmonth).length>7') {
						
					} else{
						
					}
				} else if(writemonth < month) {
					daysElement[i].classList.add('sc-premonth');
				} else {
					daysElement[i].classList.add('sc-month');
				}
				daysElement[i].querySelector('.day').innerHTML = writeday;
				//判断是否添加阴历
				if(this._options.showLunarCalendar) {
					daysElement[i].querySelector('.lunar-day').innerHTML = new LunarHelp(writeyear, writemonth, writeday).getLunarDayName();
				} else {
					daysElement[i].querySelector('.lunar-day').innerHTML = '';
					daysElement[i].classList.add('item-nolunar');
				}

				//添加today样式
				if(this.tyear == writeyear && this.tday == writeday && this.tmonth == writemonth) {
					this.selectDay = daysElement[i];
					daysElement[i].classList.add("sc-today");
					$('.sc-week-item:nth-child(' + this.tweek + ')').addClass('sc-week-today');
				}
			}
		}

		//刷新异常标记日期
	}, {
		key: 'updateYc',
		value: function updateYc(year, month) {
			var options = this._options;
			if(options.showYc) {
				var daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
				var currentmonth = month - 1;
				//取得节日数据
				var data = options.yc;
				var date = options.yc.date;
//				console.log(day)
				var datas = JSON.stringify(data);
				if(data) {
					daysElement.forEach(function(v, i) {
						var day = +v.querySelector('.day').innerHTML;
				console.log(day)
						
						//						console.log(data)
						//						console.log(getObjectKeys(slideArray))
						//						console.log(getObjectValues(mark))
						if(day == 1) currentmonth++;
						if(data[year + '-' + currentmonth + '-' + day]) {
							console.log(data[year + '-' + currentmonth + '-' + day])
							var length = options.yc[year + '-' + currentmonth + '-' + day].length;
							v.querySelector('.yc').classList.remove('sc-mark-hide');
							v.querySelector('.yc').classList.add('sc-mark-show');
							v.title = data[year + '-' + currentmonth + '-' + day];

						} else {
							v.querySelector('.yc').classList.remove('sc-mark-show');
							v.querySelector('.yc').classList.add('sc-mark-hide');
							v.title = '';
						};

					});
				}
			}
		}

		//刷新正常标记
	}, {
		key: 'updateZc',
		value: function updateZc(year, month) {
			var options = this._options;
			if(options.showZc) {
				var daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
				var currentmonth = month - 1;
				//取得节日数据
				var data = options.zc;
				console.log(data)
				var datas = JSON.stringify(data);
				if(data) {
					daysElement.forEach(function(v, i) {
						var day = +v.querySelector('.day').innerHTML;
						//						console.log(day)
						//						console.log(date)

						if(day == 1) currentmonth++;
						if(data[year + '-' + currentmonth + '-' + day]) {
							console.log(data[year + '-' + currentmonth + '-' + day])
							var length = options.zc[year + '-' + currentmonth + '-' + day].length;
							console.log(length)
							v.querySelector('.yc').classList.remove('sc-mark-hide');
							v.querySelector('.yc').classList.add('zc');
							v.title = data[year + '-' + currentmonth + '-' + day];

						} else {
							v.querySelector('.yc').classList.remove('zc');
							//							v.querySelector('.mark').classList.add('sc-mark-hide');
							v.title = '';
						};

					});
				}
			}
		}

		//刷新事件
	}, {
		key: 'updateEvent',
		value: function updateEvent() {
			var daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
			var container = this.container;
			var calendar = this;
			daysElement.forEach(function(v, i) {
				v.onmouseover = function(e) {
					this.classList.add('sc-active-day');
				};
				v.onmouseout = function(e) {
					this.classList.remove('sc-active-day');
				};

				v.onclick = function() {
					calendar.selectDay = v;
					var pre = container.querySelector('.sc-selected');
					if(pre) pre.classList.remove('sc-selected');
					this.classList.add('sc-selected');
					if(v.classList.contains('sc-premonth')) {
						this.parentNode.querySelector('.sc-month').classList.add('sc-selected');
						var currentmonth = selectMonth.innerText;
						var currentyear = selectYear.innerText;
						var month;
						for(var i = 0; i < SimpleCalendar.prototype.languageData.months_CH.length; i++) {
							if(currentmonth == SimpleCalendar.prototype.languageData.months_CH[i]) {
								month = i + 1;
								break;
							}
						}
						if(month > 1) month--;
						else {
							month = 12;
							selectYear.innerText = --currentyear;
						}
						calendar.update(month, currentyear);
						selectMonth.innerText = SimpleCalendar.prototype.languageData.months_CH[month - 1];
					} else if(v.classList.contains('sc-nextmonth')) {
						var currentmonth = selectMonth.innerText;
						var currentyear = selectYear.innerText;
						var month;
						for(var i = 0; i < SimpleCalendar.prototype.languageData.months_CH.length; i++) {
							if(currentmonth == SimpleCalendar.prototype.languageData.months_CH[i]) {
								month = i + 1;
								break;
							}
						}
						if(month < 12) {
							month++;
						} else {
							month = 1;
							selectYear.innerText = ++currentyear;
						};
						calendar.update(month, currentyear);
						selectMonth.innerText = SimpleCalendar.prototype.languageData.months_CH[month - 1];
					}
				};
			});

			var selectYear = container.querySelector('.sc-select-year');
			var selectMonth = container.querySelector('.sc-select-month');
			selectYear.onchange = function() {
				var m = selectMonth.innerText;
				var y = this.value;
				calendar.update(m, y);
			};

			selectMonth.onchange = function() {
				var y = selectYear.innerText;
				var m = this.value;
				calendar.update(m, y);
			};

		}
	}, { //加月份事件
		key: 'addMonth',
		value: function addMonth() {
			var container = this.container;
			var calendar = this;
			var selectYear = container.querySelector('.sc-select-year');
			var selectMonth = container.querySelector('.sc-select-month');
			var currentmonth = selectMonth.innerText;
			var currentyear = selectYear.innerText;
			var month;
			for(var i = 0; i < SimpleCalendar.prototype.languageData.months_CH.length; i++) {
				if(currentmonth == SimpleCalendar.prototype.languageData.months_CH[i]) {
					month = i + 1;
					break;
				}
			}
			if(month < 12) {
				month++;
			} else {
				month = 1;
				selectYear.innerText = ++currentyear;
			};
			calendar.update(month, currentyear);
			console.log(selectMonth)
			selectMonth.innerText = SimpleCalendar.prototype.languageData.months_CH[month - 1];
		}

	}, { //减月份事件
		key: 'subMonth',
		value: function subMonth() {
			var container = this.container;
			var calendar = this;
			var selectYear = container.querySelector('.sc-select-year');
			var selectMonth = container.querySelector('.sc-select-month');
			var currentmonth = selectMonth.innerText;
			var currentyear = selectYear.innerText;
			var currentmonth = selectMonth.innerText;
			var currentyear = selectYear.innerText;
			var month;
			for(var i = 0; i < SimpleCalendar.prototype.languageData.months_CH.length; i++) {
				if(currentmonth == SimpleCalendar.prototype.languageData.months_CH[i]) {
					month = i + 1;
					break;
				}
			}
			if(month > 1) month--;
			else {
				month = 12;
				selectYear.innerText = --currentyear;
			}
			calendar.update(month, currentyear);
			selectMonth.innerText = SimpleCalendar.prototype.languageData.months_CH[month - 1];
		}

	}, { //添加标记
		key: 'addYc',
		value: function addYc(day, info) {
			this._options.yc[day] = info;
			this.update();
		}
	}, { //添加zc标记
		key: 'addZc',
		value: function addZc(day, info) {
			this._options.zc[day] = info;
			this.update();
		}

		//获取用户点击的日期

	}, {
		key: 'getSelectedDay',
		value: function getSelectedDay() {
			var selectYear = this.container.querySelector('.sc-select-year').innerText;
			var selectMonth = this.container.querySelector('.sc-select-month').innerText;
			var selectDay = this.selectDay.querySelector('.day').innerHTML;
			return new Date(selectYear, selectMonth - 1, selectDay);
		}

		//设置语言

	}, {
		key: 'setLenguage',
		value: function setLenguage(language) {
			this._options.language = language;
			var selectYear = this.container.querySelector('.sc-select-year');
			var selectMonth = this.container.querySelector('.sc-select-month');
			this.updateSelect(selectYear.innerText, selectMonth.innerText);
			this.update();
		}

		//设置是否显示阴历日期
	}, {
		key: 'showLunarCalendar',
		value: function showLunarCalendar(s) {
			this._options.showLunarCalendar = s;
			this.update();
		}

		//设置是否显示标记日期
	}, {
		key: 'showYc',
		value: function showYc(s) {
			this._options.showYc = s;
			this.update();
		}

		//设置是否显示标记日期
	}, {
		key: 'showZc',
		value: function showZc(s) {
			this._options.showZc = s;
			this.update();
		}

		//将nodelist转为数组
	}, {
		key: 'arrayfrom',
		value: function arrayfrom(nidelist) {
			var array = [];
			[].forEach.call(nidelist, function(v) {
				array.push(v);
			});
			return array;
		}

	}]);

	return SimpleCalendar;
}();

//时间刷新函数
SimpleCalendar.timeupdate = function() {
	var timespan = document.querySelectorAll('.sc-time');
	var now = new Date();
	var nh = now.getHours();
	var nm = now.getMinutes();
	var ns = now.getSeconds();
	if(nh < 10) nh = '0' + nh;
	if(nm < 10) nm = '0' + nm;
	if(ns < 10) ns = '0' + ns;
	[].forEach.call(timespan, function(v) {
		v.innerHTML = '时间：' + nh + ":" + nm + ':' + ns;
	});
};
//国际化，和一些节日数据，标记数据
SimpleCalendar.prototype.languageData = {

	days_EN: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	days_CH: ["一", "二", "三", "四", "五", "六", "日"],
	months_EN: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	months_CH: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	vocation: {
		data_2016: ['01-01', '01-02', '01-03', '02-07', '02-08', '02-09', '02-10', '02-11', '02-12', '02-13', '04-02', '04-03', '04-04', '04-30', '05-01', '05-02', '06-09', '06-10', '06-11', '09-15', '09-16', '09-17', , '10-01', '10-02', '10-3', '10-04', '10-05', '10-06', '10-07']
	}
};

SimpleCalendar.prototype.tyear = new Date().getFullYear();
SimpleCalendar.prototype.tmonth = new Date().getMonth() + 1;
SimpleCalendar.prototype.tday = new Date().getDate();
SimpleCalendar.prototype.tweek = new Date().getDay();
console.log(SimpleCalendar.prototype.tday)