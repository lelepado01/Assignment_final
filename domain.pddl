(define (domain roomcleaner) 

  (:requirements
    :strips                 
    :negative-preconditions
    :equality
  )

  (:predicates
  
    (clean ?room)  
    (rooms_connected ?room1 ?room2) 
	(has_charge_pad ?room)
	(is_room ?room)
	
    (in ?room ?robot)
    (is_robot ?robot)
    
    (has_battery_level ?robot ?battery_level)
    (battery_lower_level ?b1 ?b2)
    (is_battery_level ?b)

  )

  (:action move
    :parameters (?from ?to ?robot ?battery_level ?battery_lower)

    :precondition (and
      (in ?from ?robot)
      (is_room ?from)
      (is_room ?to)
      (is_robot ?robot)
      
      (is_battery_level ?battery_level)
      (is_battery_level ?battery_lower)
      (battery_lower_level ?battery_level ?battery_lower)
      (has_battery_level ?robot ?battery_level)
      
	  (rooms_connected ?from ?to)
    )

    :effect (and
      (in ?to ?robot)
	  (not (in ?from ?robot))
	  (not (has_battery_level ?robot ?battery_level))
	  (has_battery_level ?robot ?battery_lower)
    )
  )
  
  (:action charge
	:parameters (?room ?robot ?battery_level ?battery_lower)

	:precondition (and
		(in ?room ?robot)
		(is_room ?room)
		(is_robot ?robot)
		(has_charge_pad ?room)

	    (is_battery_level ?battery_level)
        (is_battery_level ?battery_lower)
        (battery_lower_level ?battery_level ?battery_lower)
        (has_battery_level ?robot ?battery_lower)

	)

	:effect (and
        (not (has_battery_level ?robot ?battery_lower))
	    (has_battery_level ?robot ?battery_level)
    )
  )

  (:action clean
    :parameters (?room ?robot ?battery_level ?battery_lower)

    :precondition (and
      (in ?room ?robot)
      (is_room ?room)
      (is_robot ?robot)
	  (not (clean ?room))

	  (is_battery_level ?battery_level)
      (is_battery_level ?battery_lower)
      (battery_lower_level ?battery_level ?battery_lower)
      (has_battery_level ?robot ?battery_level)
    )

    :effect (and
      (clean ?room)
      (not (has_battery_level ?robot ?battery_level))
	  (has_battery_level ?robot ?battery_lower)
    )
  )
)