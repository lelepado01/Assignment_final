const Beliefset = require("../bdi/Beliefset");
const Goal = require("../bdi/Goal");
const Intention = require("../bdi/Intention");

class RetryGoal extends Goal {}

class RetryIntention extends Intention {
	static applicable (goal) {
		return goal instanceof RetryGoal
	}
	*exec ({goal, world}=parameters) {
		
		while(true) {
			
			let inits = world.house.GetInitPDDLInfo()
			this.agent.beliefs = new Beliefset()
			inits.forEach(obj => this.agent.beliefs.declare(obj));
			inits.forEach(obj => world.beliefs.declare(obj));

			yield this.agent.postSubGoal( goal )

			if (world.house.RoomsAreAllClean()){
				//world.house.rooms.kitchen.is_clean = false
				return; 
			}
		}
	}
}

module.exports = {RetryGoal, RetryIntention}; 