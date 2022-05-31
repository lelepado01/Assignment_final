
const Clock =  require('../utils/Clock')
const Agent = require('../bdi/Agent')

const { AliceAlarmGoal, AliceAlarmIntention, BobAlarmGoal, BobAlarmIntention } =  require('../goals/Alarm')
const { BreakfastGoal, BreakfastIntention } = require('../goals/Breakfast')
const { SenseCatGoal, SenseCatIntention } = require('../goals/CatSensor')
const { SmartDoorIntention, SmartDoorGoal } = require('../goals/SmartDoor')
const { SensePersonGoal, SensePersonIntention } = require('../goals/PeopleSensor')
const { SendInfoIntention, SendInfoGoal } = require('../goals/SendInfo')

const Logger = require('../utils/Logger')

const PlanningGoal = require('../pddl/PlanningGoal')

const { Move, Clean, Charge } = require('./actions')
const { GOALS, DIRTIABLE_ROOMS } = require('./lists')
const { RetryIntention, RetryGoal } = require('../goals/Retry')

const world = require('./world')

let vacuum_cleaner_agent = new Agent('vacuum_cleaner')
world.house.devices.vacuum_cleaner.SetName(vacuum_cleaner_agent.name)
let inits = world.house.GetInitPDDLInfo()
inits.forEach(obj => vacuum_cleaner_agent.beliefs.declare(obj));
inits.forEach(obj => world.beliefs.declare(obj));

let sensor = (agent) => (value, key, observable) => {
	if (key.includes("clean") && value) {
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

world.beliefs.observeAny( sensor(vacuum_cleaner_agent));  

let {OnlinePlanning} = require('../pddl/OnlinePlanner')([Move, Clean, Charge])
vacuum_cleaner_agent.intentions.push(OnlinePlanning)
vacuum_cleaner_agent.intentions.push(RetryIntention)
vacuum_cleaner_agent.intentions.push(SendInfoIntention)

vacuum_cleaner_agent.postSubGoal( new RetryGoal( { goal: new PlanningGoal( { goal: GOALS } ), world: world} ) )
vacuum_cleaner_agent.postSubGoal( new SendInfoGoal() )


// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    
	var time = Clock.global

    if(time.hh==7 && time.mm==0) world.house.people.alice.moveToRoom('kitchen')
    if(time.hh==7 && time.mm==0) world.house.people.cat.moveToRoom('kitchen')
	if(time.hh==7 && time.mm==30) world.house.people.bob.moveToRoom('kitchen')
    if(time.hh==8 && time.mm==00) world.house.people.alice.moveToRoom('outside')
    if(time.hh==8 && time.mm==15) world.house.people.cat.moveToRoom('entrance')
    if(time.hh==8 && time.mm==20) world.house.people.cat.moveToRoom('outside')
	if(time.hh==8 && time.mm==30) world.house.people.bob.moveToRoom('outside')
	if(time.hh==13 && time.mm==0) world.house.people.alice.moveToRoom('living_room')
	if(time.hh==14 && time.mm==0) world.house.people.cat.moveToRoom('living_room')
	if(time.hh==18 && time.mm==15) world.house.people.bob.moveToRoom('living_room')
	if(time.hh==18 && time.mm==30) world.house.people.bob.moveToRoom('studio')

	if(time.hh==19 && time.mm==30) {
		world.house.people.alice.moveToRoom('kitchen')
		world.house.people.cat.moveToRoom('kitchen')
		world.house.people.bob.moveToRoom('kitchen')
	}
	
	if(time.hh==20 && time.mm==30) world.house.people.bob.moveToRoom('living_room')
	if(time.hh==21 && time.mm==30) world.house.people.alice.moveToRoom('bedroom')
	if(time.hh==21 && time.mm==45) world.house.people.cat.moveToRoom('bedroom')
	if(time.hh==22 && time.mm==30) world.house.people.bob.moveToRoom('bedroom')

	if(time.hh==22 && time.mm==45) world.house.devices.breakfast_machine.Load();  
 
	if(time.hh==23 && time.mm==00) {
		// if (world.house.RoomsAreAllClean()) {
		let room_index = Math.floor(Math.random() * DIRTIABLE_ROOMS.length); 
		world.SetHouseRoomDirty(DIRTIABLE_ROOMS[room_index]); 
	// }
	}

	if (time.hh == 23 && time.mm == 45) {
		let dailyCost = world.house.GetHouseDailyConsumption();
		Logger.Log("HouseAgent: house consumption cost today is {}€", dailyCost.toFixed(2));  

		world.house.PrintRoomStatus();
	}
})

var alarm_agent = new Agent('alarm_agent');
alarm_agent.intentions.push(AliceAlarmIntention)
alarm_agent.intentions.push(BobAlarmIntention)
alarm_agent.postSubGoal(new AliceAlarmGoal(world.house.devices.alice_alarm))
alarm_agent.postSubGoal(new BobAlarmGoal(world.house.devices.bob_alarm))

var a2 = new Agent('breakfast_agent');
a2.intentions.push(SensePersonIntention); 
a2.postSubGoal(new SensePersonGoal([world.house.people.bob, world.house.people.alice])); 
a2.intentions.push(BreakfastIntention); 
a2.postSubGoal(new BreakfastGoal([world.house.people.bob, world.house.people.alice], world.house.devices.breakfast_machine)); 

var a3 = new Agent('smart_cat_door_agent'); 
a3.intentions.push(SenseCatIntention); 
a3.postSubGoal(new SenseCatGoal(world.house.people.cat)); 
a3.intentions.push(SmartDoorIntention); 
a3.postSubGoal(new SmartDoorGoal(world.house.devices.smart_door)); 



dict = {}

let name = "ciaoo"
dict[name] = "ciaop ammma"


console.log(dict)
exit(1)