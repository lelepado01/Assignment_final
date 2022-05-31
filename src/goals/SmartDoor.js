
const Goal = require("../bdi/Goal")
const Intention = require("../bdi/Intention")
const Logger = require("../utils/Logger")


class SmartDoorGoal extends Goal {
	constructor (smart_door) {
        super()
		this.door = smart_door
    }
}


class SmartDoorIntention extends Intention {
    constructor (agent, goal) {
        super(agent, goal)
    }
    
    static applicable (goal) {
        return goal instanceof SmartDoorGoal
    }

	*exec () {
		new Promise( async res => {
			while (true) {
				let cat_in_entrance = await this.agent.beliefs.notifyChange('cat_in_entrance')
				Logger.Log('SmartDoor: cat in entrance: {}', cat_in_entrance)

				if (this.goal.door.isOpen) {
					this.goal.door.close();
				} 
				
				if (cat_in_entrance) {
					this.goal.door.open(); 
				}
			}
		});
    }
}


module.exports = {SmartDoorGoal, SmartDoorIntention}; 