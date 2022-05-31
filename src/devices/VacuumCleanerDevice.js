const Logger = require("../utils/Logger");

// This is just a placeholder class to keep the vacuum cleaner consumption cost, 
// so it's uniform with the other devices that use electricity
// otherwise it should probably be an agent, not a device

class VacuumCleanerDevice {

	daily_consumption = 0; 
	position = "kitchen"; 
	name = ""; 

	ELECTRICITY_COST = 0.2; // kWh
	EXECUTION_TIME = 0.1;
	CONSUMPTION_COST = this.ELECTRICITY_COST * this.EXECUTION_TIME; 

	SetName(name){ this.name = name; }

	UpdateCost() { this.daily_consumption += 1 } 
	
	Move(room) { 
		if (this.position != room){
			Logger.Log("Vacuum Cleaner: moved from {} to {}", this.position, room); 
			this.position = room; 
		}
	}

	GetConsumption(){
		let c = this.daily_consumption; 
		this.daily_consumption = 0; 

		return c * this.CONSUMPTION_COST; 
	}

}

module.exports = VacuumCleanerDevice; 