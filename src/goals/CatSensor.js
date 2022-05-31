const Goal = require("../bdi/Goal")
const Intention = require("../bdi/Intention")
const Logger = require("../utils/Logger")


class SenseCatGoal extends Goal {
	constructor (cat) {
        super()
        this.cat = cat
    }
}


class SenseCatIntention extends Intention {
    constructor (agent, goal) {
        super(agent, goal)
        this.cat = this.goal.cat
    }
    
    static applicable (goal) {
        return goal instanceof SenseCatGoal
    }

	*exec () {
		new Promise( async () => {
			while (true) {
				let status = await this.cat.notifyChange('status'); 
				Logger.Log('CatSensor: {} moved to {}', this.cat.name, status)

				if (!this.cat.isInEntrance()){
					this.agent.beliefs.undeclare('cat_in_entrance'); 
				} else {
					this.agent.beliefs.declare('cat_in_entrance')
				}
				
			}
		});
    }
}


module.exports = {SenseCatGoal, SenseCatIntention}; 