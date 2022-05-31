;; problem file: problem-a1.pddl
(define (problem a1)
    (:domain a1)
    (:objects a b a1 a2)
	(:init (on-table a) (on b a) (clear b) (empty a1) (empty a2))
	(:goal (and (holding a a1)))
)
