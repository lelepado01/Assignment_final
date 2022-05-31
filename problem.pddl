
(define (problem prob)
  (:domain roomcleaner)

  (:objects 
    robot 
    
    kitchen 
    corridor 
    livingroom 
    bathroom 
    
    battery_100 
    battery_75 
    battery_50
    battery_25
    battery_0
    )

  (:init
    (is_room kitchen) 
	(is_room corridor) 
	(is_room livingroom)
	(is_room bathroom)
	
	(rooms_connected kitchen corridor) 
	(rooms_connected corridor kitchen)
	(rooms_connected bathroom corridor) 
	(rooms_connected corridor bathroom) 
	(rooms_connected bathroom corridor)
	(rooms_connected corridor bathroom)
	(rooms_connected corridor livingroom)
	(rooms_connected livingroom corridor)
	
	(has_charge_pad corridor)

	(in kitchen robot)
	
	(is_robot robot)
	(has_battery_level robot battery_100)
	
	(is_battery_level battery_100)
	(is_battery_level battery_75)
	(is_battery_level battery_50)
	(is_battery_level battery_25)
	(is_battery_level battery_0)
	
	(battery_lower_level battery_100 battery_75)
	(battery_lower_level battery_75 battery_50)
	(battery_lower_level battery_50 battery_25)
	(battery_lower_level battery_25 battery_0)
  )

  (:goal (and
    (clean corridor)
    (clean kitchen)
    (clean bathroom)
    (clean livingroom)
    (has_battery_level robot battery_100)
  ))
)