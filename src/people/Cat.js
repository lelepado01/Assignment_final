const Observable = require("../utils/Observable");

class Cat extends Observable {
	constructor (data) {
		super( { 'in_room' : data.in_room} )
        this.name = data.name; 
		this.in_room = data.in_room; 
        this.set('status', this.in_room);
    }

	isOutside() { return this.in_room == "outside"; }; 
	isInEntrance() { return this.in_room == "entrance"; }; 

	moveToRoom(room) {
		this.in_room = room; 
		this.set("status", room); 
	}
}


module.exports = Cat;