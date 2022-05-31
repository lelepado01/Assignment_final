const Clock = require("../utils/Clock");

function isValid(time){
	return time || time == 0; 
}

function TimesAreEqual(t1mm, t2mm, t1hh, t2hh){

	if (!isValid(t1mm) || !isValid(t2mm) || !isValid(t1hh) || !isValid(t2hh)) return false;  

	if (t1mm >= 60){
		t1hh = (t1hh + 1) % 24; 
		t1mm -= 60; 
	}

	if (t2mm >= 60){
		t2hh = (t2hh + 1) % 24; 
		t2mm -= 60; 
	}

	return t1mm == t2mm && t1hh == t2hh; 
}

function GetCurrentTime(){
	return { mm: Clock.global.mm, hh: Clock.global.hh }; 
}

function format(time){
	return String(time).length == 1 ? "0" + String(time) : time; 
}

function FormatTime(hh, mm){
	if (mm >= 60){
		hh = (hh + 1) % 24; 
		mm -= 60; 
	}

	return format(hh) + ":" + format(mm);  
}

module.exports = {TimesAreEqual, GetCurrentTime, FormatTime}; 