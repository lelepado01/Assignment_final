
const pddlActionIntention = require('../pddl/actions/pddlActionIntention')
const world = require('./world')

class Move extends pddlActionIntention {

    static parameters = ['from', 'to', 'robot', 'battery_level', 'battery_lower'];
    static precondition = [ 
		['in', 'from', 'robot'],
		['is_room', 'from'],
		['is_room', 'to'],
		['is_robot', 'robot'],
		
		['is_battery_level', 'battery_level'],
		['is_battery_level', 'battery_lower'],
		['battery_lower_level', 'battery_level', 'battery_lower'],
		['has_battery_level', 'robot', 'battery_level'],
		
		['rooms_connected', 'from', 'to']
	];
    static effect = [ 
		['in', 'to', 'robot'],
		['not in', 'from', 'robot'],
		['not has_battery_level', 'robot', 'battery_level'],
		['has_battery_level', 'robot', 'battery_lower']
	];

	*exec ({from, to, robot, battery_level, battery_lower} = parameters) {
        for ( let b of this.effect ) {
            this.agent.beliefs.apply(b)
		}            
		
		yield world.Move({
			from: from, 
			to: to, 
			robot: robot, 
			battery_level: battery_level, 
			battery_lower: battery_lower, 
			gripper: this.agent.name
		})

    }
}

class Charge extends pddlActionIntention {

    static parameters = ['room', 'robot', 'battery_level', 'battery_lower']
    static precondition = [
		['in', 'room', 'robot'],
		['is_room', 'room'],
		['is_robot', 'robot'],
		['has_charge_pad', 'room'],

	    ['is_battery_level', 'battery_level'],
        ['is_battery_level', 'battery_lower'],
        ['battery_lower_level', 'battery_level', 'battery_lower'],
        ['has_battery_level', 'robot', 'battery_lower'],
	]
    static effect = [
		['not has_battery_level', 'robot', 'battery_lower'],
	    ['has_battery_level', 'robot', 'battery_level'],
	];

	*exec ({room, robot, battery_level, battery_lower} = parameters) {
        for ( let b of this.effect ) {
            this.agent.beliefs.apply(b)
		}            

		yield world.Charge({
			room: room, 
			robot: robot, 
			battery_level: battery_level, 
			battery_lower: battery_lower, 
			gripper: this.agent.name
		})    
	}
}

class Clean extends pddlActionIntention {

    static parameters = ['room', 'robot', 'battery_level', 'battery_lower']
    static precondition = [
		['in', 'room', 'robot'],
		['is_room', 'room'],
		['is_robot', 'robot'],
		['dirty', 'room'],

		['is_battery_level', 'battery_level'],
		['is_battery_level', 'battery_lower'],
		['battery_lower_level', 'battery_level', 'battery_lower'],
		['has_battery_level', 'robot', 'battery_level'],
	]
    static effect = [
		['clean', 'room'],
		['not dirty', 'room'],
		['not has_battery_level', 'robot', 'battery_level'],
		['has_battery_level', 'robot', 'battery_lower'],
	];

	*exec ({room, robot, battery_level, battery_lower} = parameters) {
        for ( let b of this.effect ) {
            this.agent.beliefs.apply(b)
		}
		
		yield world.Clean({
			room: room, 
			robot: robot, 
			battery_level: battery_level, 
			battery_lower: battery_lower, 
			gripper: this.agent.name
		})  
    }
}

module.exports = {Move, Charge, Clean}