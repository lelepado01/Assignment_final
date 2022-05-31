
# Autonomous Software Agents - Assignment 3

### Scenario

The part of the scenario present in assignment 2 that has been implemented in this delivery contains five rooms: *kitchen*, *corridor*, *livingroom*, *bedroom* and *bathroom*. The rooms are connected as shown in the first assignment. 

The agents implemented are two vacuum cleaner, one starts in the kitchen, the other in the bathroom. In the house there is only one charge pad, set up in the livingroom, and the robot moves back to the charge pad if battery is lower then 50%. 
For simplicity the battery state has five levels: 100%, 75%, 50%, 25%, and empty.


### Old Scenario Changes

A new *vacuum_cleaner* device has been implemented, to keep track of how much electricity this agent uses, as well as the robot's position (file *src/devices/VacuumCleanerDevice.js*).

Each room now has a property *is_clean*, to reflect the real world state of the house, and not just the agent's belief. 

### Scenario log

The output log was kept at two planning iterations, otherwise it ended up being really long. 
The agent plans based on the current belief, given by the house, and before executing another planning phase it completes the current one.

### Running

The scenario can be started by executing, from the main directory, 
the command *node src/myworld/scenarioTest.js*

A copy of the original pddl source files, that have been used to test the vacuum cleaner on 
an online planner, can be found in *domain.pddl* and *problem.pddl*








