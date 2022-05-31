const Goal = require("../bdi/Goal");
const Intention = require("../bdi/Intention");
const Clock = require("../utils/Clock");

class BreakfastGoal extends Goal {
	constructor (people, breakfast_device) {
        super()
        this.people = people; 
		this.device = breakfast_device; 
    }
}


class BreakfastIntention extends Intention {

	constructor (agent, goal) {
        super(agent, goal)
        this.people = this.goal.people; 
		this.device = this.goal.device;
    }

	static applicable(goal) {
        return goal instanceof BreakfastGoal; 
    }   

    *exec () {
		let goals = []
		for (let person of this.people){
			let personAwake = new Promise( async () => {
				while(true) {
					let person_woke = await this.agent.beliefs.notifyChange('person_just_woke_up ' + person.name)
					if (person_woke){												
						this.device.PrepareBreakfast(person.name, Clock.global.hh, Clock.global.mm); 
					} 
				}
			}); 
			goals.push(personAwake); 
		}

		yield Promise.all(goals); 
    }
}


module.exports = {BreakfastGoal, BreakfastIntention}; 