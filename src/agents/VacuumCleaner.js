const Agent = require('../bdi/Agent')
const { RetryIntention, RetryGoal } = require('../goals/Retry')
const { SendInfoIntention, SendInfoGoal } = require('../goals/SendInfo')
const { Move, Clean, Charge } = require('../myworld/actions')
const { GOALS } = require('../myworld/lists')
const PlanningGoal = require('../pddl/PlanningGoal')


class VacuumCleaner extends Agent {

	constructor (name, world) {
		super(name)

		let {OnlinePlanning} = require('../pddl/OnlinePlanner')([Move, Clean, Charge])
		this.intentions.push(OnlinePlanning)
		this.intentions.push(RetryIntention)
		this.intentions.push(SendInfoIntention)

		this.postSubGoal( new RetryGoal( { goal: new PlanningGoal( { goal: GOALS } ), world: world} ) )
		this.postSubGoal( new SendInfoGoal() )
	}
}

module.exports = VacuumCleaner