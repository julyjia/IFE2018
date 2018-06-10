// 把月、日、小时等出现个位数的情况前面补充0，补充为两位
function checkTime(i) {
	if (i < 10) {
		i="0" + i;
	}
	return i;
}
// 封装一个可根据不同id（除了年份id）生成对应数量option节点及内容的函数
function createOption(id, num) {
	var parent = document.getElementById(id.toString());
	var i;
	if (id.toString()==='month-select' || id.toString()==='day-select') {
		i = 1;
	}
	else if (id.toString()==='hour-select' || id.toString()==='minite-select' || id.toString()==='second-select') {
		i = 0;
		num = num - 1;
	}
        while (i <= num) {
        	var j = checkTime(i);
        	var option = document.createElement('option');
        	option.innerHTML = j;
        	option.value = j;
        	parent.appendChild(option);
        	i++;
        }
}
// 封装一个可根据选中的年生成前后指定数量的option
function yearSelect(year, num) {
	ySelect.innerHTML = "";
    var i = year - num;
    num = i + 2*num;
        while (i <= num) {
        	var option = document.createElement('option');
        	option.innerHTML = i;
        	option.value = i;
        	ySelect.appendChild(option);
        	if (i===year) {
        		option.setAttribute('selected','selected');
        	}
        	ySelect.value = year;
        	i++;
        }
}
// 设置加载页面后显示的默认值
window.onload = function(){
    var now = today.getFullYear();
    yearSelect(now, 10);
    createOption('month-select', 12);
    createOption('hour-select', 24);
    createOption('minite-select', 60);
    createOption('second-select', 60);
    createOption('day-select', 31);
}
// 定义一些后面会使用的变量
var today = new Date();
var ySelect = document.getElementById('year-select');
var mSelect = document.getElementById('month-select');
var dSelect = document.getElementById('day-select');
var hSelect = document.getElementById('hour-select');
var minSelect = document.getElementById('minite-select');
var secSelect = document.getElementById('second-select');
// 如果选择的年份变了，则会改变显示的当前年数前和其后的年数
ySelect.addEventListener('change',function() {
	yearSelect(document.getElementById('year-select').value, 10);
})
// 如果选择月份变了，则相应日期会随之变化
mSelect.addEventListener('change',function() {
	if (Number(mSelect.value)===2) {
		var year = ySelect.value;
		if((year%4 == 0 && year%100 != 0) || year %400 == 0) {
			createOption('day-select', 29);
		}
		else {
			createOption('day-select', 28);
		}

	}
	else if (Number(mSelect.value)===4 || Number(mSelect.value)===6 || Number(mSelect.value)===9 || Number(mSelect.value)===11) {
		createOption('day-select', 30);
	}
	else {
		createOption('day-select', 31);
	}
})
var body = document.getElementsByTagName('body')[0];
var result = document.getElementById('result-wrapper');
// 利用事件代理，监听body的change事件，则当任务select改变时都会触发事件
body.addEventListener('change',function() {
	var year1 = ySelect.value;
	var month1 = mSelect.value;
	var day1 = dSelect.value;
	var hour1 = hSelect.value;
	var minite1 = minSelect.value;
	var second1 = secSelect.value;
	var t1 = hour1+":"+minite1+":"+second1;
	var d1 = new Date(year1,month1-1,day1,hour1,minite1,second1,0);
	var weekday = week(d1);
	var diff = today - d1;
	var txt;
	if (diff>=0) {
        txt = "已经过去";
	}
	else{
		txt="还有"
		diff = Math.abs(diff);
	}
    var day = parseInt(diff / 86400000);
    var h = diff % 86400000;
    var hour = parseInt(h / 3600000);
    var m = h % 3600000;
    var minite = parseInt(m / 60000);
    var s = m % 60000;
    var second = parseInt(s / 1000);
	result.innerHTML= "现在距离" +" "+ year1+"年"+month1+"月"+day1+"日"+weekday+" "+t1+" "+ txt+" "+ day+ "天" +hour+ "小时"+ minite+ "分" +second+ "秒";
})
// 封装的显示星期数而不是数字的函数
function week(date) {
	var weekday = new Array(7);
    weekday[0]="星期日";
    weekday[1]="星期一";
    weekday[2]="星期二";
    weekday[3]="星期三";
    weekday[4]="星期四";
    weekday[5]="星期五";
    weekday[6]="星期六";
    return weekday[date.getDay()];
}

