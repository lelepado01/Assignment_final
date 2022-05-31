const Logger = require("../utils/Logger");
const { FormatTime } = require("../utils/Time");

class BreakfastDevice {

	loaded = true; 
	time_to_prepare = 15;  

	daily_consumption = 0; 

	ELECTRICITY_COST = 0.2; // kWh
	EXECUTION_TIME = 0.25;
	CONSUMPTION_COST = this.ELECTRICITY_COST * this.EXECUTION_TIME; 

	PrepareBreakfast(person, hh, mm) {
		if (this.loaded){
			Logger.Log('SmartBreakfast: preparing for {}, it  will be ready at {}', person, FormatTime(hh, mm+this.time_to_prepare)); 
	 		this.daily_consumption += 1;  
		}else{
			Logger.Log('SmartBreakfast: trying to prepare for {}, but breakfast not loaded', person); 
		}
	}

	Load(){
		Logger.Log('SmartBreakfast: has been loaded'); 
		this.loaded = true; 
	}

	GetConsumption(){
		let c = this.daily_consumption; 
		this.daily_consumption = 0; 

		return c * this.CONSUMPTION_COST; 
	}
}

module.exports = BreakfastDevice; 