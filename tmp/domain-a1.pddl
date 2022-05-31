;; domain file: domain-a1.pddl
(define (domain a1)
    (:requirements :strips)
    (:predicates
        (clear ?ob)
        (on-table ?ob)
        (empty ?gripper)
        (holding ?ob ?gripper)
        (on ?x ?y)              
    )
    
        (:action PickUp
            :parameters (?ob ?gripper)
            :precondition (and
                (clear ?ob)
                (on-table ?ob)
                (empty ?gripper)
            )
            :effect (and
                (holding ?ob ?gripper)
                (not (empty ?gripper))
                (not (clear ?ob))
                (not (on-table ?ob))
            )
        )
        
        (:action PutDown
            :parameters (?ob ?gripper)
            :precondition (and
                (holding ?ob ?gripper)
            )
            :effect (and
                (not (holding ?ob ?gripper))
                (empty ?gripper)
                (clear ?ob)
                (on-table ?ob)
            )
        )
        
        (:action Stack
            :parameters (?x ?y ?gripper)
            :precondition (and
                (holding ?x ?gripper)
                (clear ?y)
            )
            :effect (and
                (holding ?x ?gripper)
                (empty ?gripper)
                (clear ?x)
                (not (clear ?y))
                (on ?x ?y)
            )
        )
        
        (:action UnStack
            :parameters (?x ?y ?gripper)
            :precondition (and
                (on ?x ?y)
                (clear ?x)
                (empty ?gripper)
            )
            :effect (and
                (holding ?x ?gripper)
                (not (empty ?gripper))
                (not (clear ?x))
                (clear ?y)
                (not (on ?x ?y))
            )
        )
)