
INITS = [
	'is_room kitchen',
	'is_room corridor',
	'is_room livingroom',
	'is_room bathroom',
	'is_room bedroom',

	// 'dirty kitchen',
	// 'dirty corridor',
	// 'dirty livingroom',
	// 'dirty bathroom',

	'rooms_connected kitchen corridor',
	'rooms_connected corridor kitchen',
	'rooms_connected bathroom corridor',
	'rooms_connected corridor bathroom',
	'rooms_connected bathroom corridor',
	'rooms_connected corridor bathroom',
	'rooms_connected corridor livingroom',
	'rooms_connected livingroom corridor',
	'rooms_connected bedroom corridor',
	'rooms_connected livingroom bedroom',

	'has_charge_pad corridor',
	// 'in kitchen robot',

	'is_robot robot',
	'has_battery_level robot battery_100',

	'is_battery_level battery_100',
	'is_battery_level battery_75',
	'is_battery_level battery_50',
	'is_battery_level battery_25',
	'is_battery_level battery_0',

	'battery_lower_level battery_100 battery_75',
	'battery_lower_level battery_75 battery_50',
	'battery_lower_level battery_50 battery_25',
	'battery_lower_level battery_25 battery_0',
]

GOALS = [
	'clean corridor',
    'clean kitchen',
    'clean bathroom',
    'clean livingroom',
    'clean bedroom',
    'has_battery_level robot battery_100'
]

// Using subset of scenario, where the agent can plan
DIRTIABLE_ROOMS = [
	'kitchen', 
	'livingroom', 
	'bathroom', 
	'corridor', 
	'bedroom'
]; 


module.exports = {GOALS, INITS, DIRTIABLE_ROOMS}; 