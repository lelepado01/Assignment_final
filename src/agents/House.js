const Clock = require("../utils/Clock");
const AlarmDevice = require("../devices/AlarmDevice");
const BreakfastDevice = require("../devices/BreakfastDevice");
const SmartDoorDevice = require("../devices/SmartDoorDevice")
const Cat = require("../people/Cat");
const Person = require("../people/Person");
const VacuumCleanerDevice = require("../devices/VacuumCleanerDevice");
const Logger = require("../utils/Logger");
const { INITS, DIRTIABLE_ROOMS, GOALS } = require("../myworld/lists");
const { MessageDispatcher } = require("../utils/MessageDispatcher");
const { RetryGoal } = require("../goals/Retry");
const PlanningGoal = require('../pddl/PlanningGoal');

class House {

    constructor () {

        this.people = {
            alice: new Person ( { name: 'alice', in_room: 'bedroom' } ),
            bob: new Person ( { name: 'bob', in_room: 'bedroom' } ), 
            cat: new Cat ( { name: 'cat', in_room: 'bedroom' } )
        }

        this.rooms = {
            kitchen: { name: 'kitchen', doors_to: ['livingroom', 'corridor'], is_clean : false},
            livingroom: { name: 'livingroom' ,doors_to: ['entrance', 'corridor'], is_clean : false},
            entrance: { name: 'entrance' , doors_to: ['livingroom', 'outside'], is_clean : false},
            bathroom: { name: 'bathroom' , doors_to: ['corridor'], is_clean : false},
            bedroom: { name: 'bedroom' , doors_to: ['corridor'], is_clean : false},
            studio: { name: 'studio' , doors_to: ['corridor'], is_clean : false},
            outside: { name: 'outside' , doors_to: ['entrance'], is_clean : false},
            corridor: { name: 'corridor' , doors_to: ['studio', 'livingroom', 'kitchen', 'bathroom', 'bedroom'], is_clean : false},
        }

        this.devices = {
			breakfast_machine: new BreakfastDevice(),
			smart_door: new SmartDoorDevice(),
			alice_alarm: new AlarmDevice("alice", 6, 45),
			bob_alarm: new AlarmDevice("bob", 7, 15),
			vacuum_cleaner: new VacuumCleanerDevice() 
		}

		this.messageDispatcher = new MessageDispatcher();
        
        Clock.startTimer()
    }

	GetHouseDailyConsumption(){
		let cost = 0; 
		for (let device in this.devices){
			if (typeof this.devices[device].GetConsumption !== 'undefined'){
				cost += this.devices[device].GetConsumption(); 
			}
		}

		return cost; 
	}

	PrintRoomStatus(){
		for (let room in this.rooms) {
			Logger.Log("House: Room {} is {}", room, this.rooms[room].is_clean ? "clean":"dirty")
		}
	}

	SetClean(room){
		if (Object.keys(this.rooms).includes(room)){
			this.rooms[room].is_clean = true
			Logger.Log("House: Room {} is now clean", room)
		}
	}

	SetDirty(room, world){
		if (this.RoomsAreAllClean()){
			let request = new RetryGoal( { goal: new PlanningGoal( { goal: GOALS } ), world: world} ) 
			this.messageDispatcher.sendTo( this.devices.vacuum_cleaner.name, request )
		}

		if (Object.keys(this.rooms).includes(room)){
			this.rooms[room].is_clean = false
			Logger.Log("House: Room {} is now dirty", room)
		}
	}

	GetInitPDDLInfo(){		
		let dirtiable_rooms = ['kitchen', 'livingroom', 'bathroom', 'corridor', 'bedroom']; 
		let rooms_status = []; 
		for (let room of dirtiable_rooms) {
			if (!this.rooms[room].is_clean){
				rooms_status.push("dirty " + room);
			} else {
				rooms_status.push("clean " + room);
			}
		}

		rooms_status = rooms_status.concat("in " + this.devices.vacuum_cleaner.position + " robot") 

		return rooms_status.concat(INITS); 
	}

	RoomsAreAllClean(){
		for (let room of DIRTIABLE_ROOMS) {
			if (!this.rooms[room].is_clean){
				return false
			}
		}
		return true
	}
}

module.exports = House; 