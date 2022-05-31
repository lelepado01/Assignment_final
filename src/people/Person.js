
const Observable = require("../utils/Observable");

class Person extends Observable {

	previousRoom; 

	constructor (data) {
        super({'in_room' : data.in_room })
        this.name = data.name; 
		this.in_room = data.in_room; 
		this.previousRoom = data.in_room; 
		this.set('status', this.in_room);
    }

	moveToRoom(room) {
		this.previousRoom = this.in_room; 
		this.in_room = room; 
		this.set("status", room); 
	}
}


module.exports = Person;