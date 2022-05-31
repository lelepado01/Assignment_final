const Logger = require("../utils/Logger");
const { FormatTime } = require("../utils/Time");

class AlarmDevice {

	ELECTRICITY_COST = 0.2; // kWh
	EXECUTION_TIME = 0.1;
	CONSUMPTION_COST = this.ELECTRICITY_COST * this.EXECUTION_TIME; 

	constructor(name, h, m){
		this.name = name; 
		this.hh = h;  
		this.mm = m; 

		this.loaded = true; 
		this.daily_consumption = 0; 
	}

	Reset() {
		if (!this.loaded){
			Logger.Log('Alarm of {} has just been set', this.name); 
			this.loaded = true; 
		}
	}

	Ring() {
		if (this.loaded){
			Logger.Log('Alarm of {}, it\'s {}', this.name, FormatTime(this.hh, this.mm)); 
			this.loaded = false;  
			this.daily_consumption += 1; 	
		}
	}

	GetConsumption(){
		let c = this.daily_consumption; 
		this.daily_consumption = 0; 

		return c * this.CONSUMPTION_COST; 
	}
	
}

module.exports = AlarmDevice; 