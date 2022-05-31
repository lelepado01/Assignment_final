const Clock = require("../utils/Clock");
const Intention = require("../bdi/Intention");
const Goal = require("../bdi/Goal");
const { TimesAreEqual } = require("../utils/Time");


class AliceAlarmGoal extends Goal {
	constructor(alarm){
		super()
		this.alarm = alarm;  
	}
}; 

class AliceAlarmIntention extends Intention {

	constructor(agent, goal){
		super(agent, goal)
		this.alarm = goal.alarm;  
	}

    static applicable(goal) {
        return goal instanceof AliceAlarmGoal; 
    }   
    *exec () {
		while(true) {
			Clock.global.notifyChange('mm'); 
			yield
			
			if (TimesAreEqual(Clock.global.mm, 30, Clock.global.hh, 22)){
				this.alarm.Reset(); 
			}

			if (TimesAreEqual(Clock.global.mm, this.goal.alarm.mm, Clock.global.hh, this.goal.alarm.hh)) {
				this.alarm.Ring(); 
			}
		}
	}
}

class BobAlarmGoal extends Goal {
	constructor(alarm){
		super()
		this.alarm = alarm;  
	}
}; 

class BobAlarmIntention extends Intention {

	constructor(agent, goal){
		super(agent, goal)
		this.alarm = goal.alarm;  
	}

    static applicable(goal) {
        return goal instanceof BobAlarmGoal; 
    }   
    *exec () {
		while(true) {
			Clock.global.notifyChange('mm')
			yield

			if (TimesAreEqual(Clock.global.mm, 30, Clock.global.hh, 22)){
				this.alarm.Reset(); 
			}

			if (TimesAreEqual(Clock.global.mm, this.goal.alarm.mm, Clock.global.hh, this.goal.alarm.hh)) {
				this.alarm.Ring(); 
			}
		}
	}
}

module.exports = {AliceAlarmGoal, AliceAlarmIntention, BobAlarmGoal, BobAlarmIntention}; 