

let sensor = (agent, world) => (value, key, observable) => {
	// console.log("sensor: " + key + ", " + value)
	if ((key.includes("clean") && value) || (key.includes("dirty") && !value)) {
		let room = key.toString().split(" ")[1];
		world.house.SetClean(room)
	}

	if (key.includes("in") && value) {
		let to_room = key.toString().split(" ")[1];
		world.house.devices.vacuum_cleaner.Move(to_room)
	}


	if (key.includes("has_battery_level")) {
		world.house.devices.vacuum_cleaner.UpdateCost(); 
	}
	
	if (value){
		agent.beliefs.declare(key);
	} else {
		agent.beliefs.undeclare(key);
	}
}

module.exports = {sensor}; 