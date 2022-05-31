
const Goal = require("../bdi/Goal")
const Intention = require("../bdi/Intention")
const Logger = require("../utils/Logger")


class SensePersonGoal extends Goal {
	constructor (people) {
        super()
        this.people = people
    }
}


class SensePersonIntention extends Intention {
    constructor (agent, goal) {
        super(agent, goal)
        this.people = this.goal.people
    }
    
    static applicable (goal) {
        return goal instanceof SensePersonGoal
    }

	*exec () {
		let goals = []
		for (let person in this.people){
			let personName = this.people[person].name; 
			let personMovement = new Promise( async () => {
				while (true) {
					let dstRoom = await this.people[person].notifyChange('status'); 
					Logger.Log('PersonSensor: {} moved to {} from {}', personName, dstRoom, this.people[person].previousRoom); 

					if (this.people[person].previousRoom == "bedroom"){
						this.agent.beliefs.declare('person_just_woke_up ' + personName); 
					} else {
						this.agent.beliefs.undeclare('person_just_woke_up ' + personName); 
					}
				
				}
			});
			goals.push(personMovement)
        }
        yield Promise.all(goals)
    }
}


module.exports = {SensePersonGoal, SensePersonIntention}; 