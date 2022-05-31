const Logger = require("../utils/Logger");

class SmartDoorDevice {

	isOpen = false; 
	daily_consumption = 0; 

	ELECTRICITY_COST = 0.2; // kWh
	EXECUTION_TIME = 0.1;
	CONSUMPTION_COST = this.ELECTRICITY_COST * this.EXECUTION_TIME; 

	open() {
		this.isOpen = true; 
		this.daily_consumption += 1; 
		Logger.Log("SmartDoor: door just opened"); 
	}

	close() {
		this.isOpen = false; 
		this.daily_consumption += 1; 
		Logger.Log("SmartDoor: door just closed"); 
	}

	GetConsumption(){
		let c = this.daily_consumption; 
		this.daily_consumption = 0; 

		return c * this.CONSUMPTION_COST; 
	}
}

module.exports = SmartDoorDevice; 