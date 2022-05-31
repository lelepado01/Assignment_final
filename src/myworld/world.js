const House = require('../agents/House');
const Agent = require('../bdi/Agent');
const { RetryGoal } = require('../goals/Retry');
const pddlActionIntention = require('../pddl/actions/pddlActionIntention');
const { GOALS } = require('./lists');
const PlanningGoal = require('../pddl/PlanningGoal');
const { MessageDispatcher } = require('../utils/MessageDispatcher');


const world = new Agent('world');
{
    class WorldAction {

        constructor (agent, parameters) {
            this.agent = agent
            this.parameters = parameters
        }

        get precondition () {
            return pddlActionIntention.ground(this.constructor.precondition, this.parameters)
        }
        
        checkPrecondition () {
            return this.agent.beliefs.check(...this.precondition);
        }

        get effect () {
            return pddlActionIntention.ground(this.constructor.effect, this.parameters)
        }

        applyEffect () {
            for ( let b of this.effect ){
                this.agent.beliefs.apply(b)
			}
        }

        async checkPreconditionAndApplyEffect () {
            if ( this.checkPrecondition() ) {
                this.applyEffect()
                await new Promise(res=>setTimeout(res,500))
            } else {
                throw new Error('pddl precondition not valid'); //Promise is rejected!
			}
        }

    }

	class WorldMove extends WorldAction {
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
	}

    class WorldClean extends WorldAction {
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
	}

    class WorldCharge extends WorldAction {
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
    }


    world.Move = function ({from, to, robot, battery_level, battery_lower} = args) {
        this.log('World: Move', robot)
        return new WorldMove(world, {from, to, robot, battery_level, battery_lower} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.Move failed:', err.message || err); throw err;})
    }

    world.Clean = function ({room, robot, battery_level, battery_lower} = args) {
        this.log('World: Clean', robot)
        return new WorldClean(world, {room, robot, battery_level, battery_lower} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.Clean failed:', err.message || err); throw err;})
    }

    world.Charge = function ({room, robot, battery_level, battery_lower} = args) {
        this.log('World: Charge', robot)
        return new WorldCharge(world, {room, robot, battery_level, battery_lower} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.Charge failed:', err.message || err); throw err;})
    }

	world.SetHouseRoomDirty = function(room){
		if (this.house.RoomsAreAllClean()){
			let request = new RetryGoal( { goal: new PlanningGoal( { goal: GOALS } ), world: world} ) 
			this.messageDispatcher.sendTo( this.house.devices.vacuum_cleaner.name, request )
		}
		this.house.SetDirty(room)
	}

	world.messageDispatcher = new MessageDispatcher();
	world.house = new House();
}

module.exports = world; 