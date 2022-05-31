const Clock = require("../utils/Clock");
const {TimesAreEqual, GetCurrentTime} = require("./Time");

class Logger {

	static last_log_time = GetCurrentTime(); 

	static padding = "\t";  

	static placeholder = "{}"; 
	static keyword_color = "\x1b[33m";  
	static plain_color = "\x1b[0m";

	static Log(text, ...args) {

		for (let i = 0; i < args.length; i++) {
			text = text.replace(this.placeholder, this.keyword_color + args[i] + this.plain_color); 
		}
		
		if (TimesAreEqual(this.last_log_time.mm, Clock.global.mm, this.last_log_time.hh, Clock.global.hh)){
			console.log(this.padding + text); 
		} else {
			console.log(text); 
		}

		this.last_log_time = GetCurrentTime();  
	}

}

module.exports = Logger; 