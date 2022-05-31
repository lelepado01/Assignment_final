const Goal = require("../bdi/Goal")
const Intention = require("../bdi/Intention")
const {MessageDispatcher} = require("../utils/MessageDispatcher")

class SendInfoGoal extends Goal {}

class SendInfoIntention extends Intention {
    static applicable (goal) {
        return goal instanceof SendInfoGoal
    }
    *exec (parameters) {
        var myMessageDispatcher = MessageDispatcher.authenticate(this.agent)
        while (true) {
            yield myMessageDispatcher.notifyChange('newMessageReceived')
            let newMessage = myMessageDispatcher.readMessage()
            if (newMessage && newMessage instanceof Goal) {
                this.log('Reading received message', newMessage.toString())
                yield this.agent.postSubGoal(newMessage)
            }
        }
    }
}

module.exports = {SendInfoGoal, SendInfoIntention}