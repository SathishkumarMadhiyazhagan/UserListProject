import React, { useState, useEffect } from "react";

const FLOORS = 9;
const ELEVATORS = 4;

const ElevatorStates = {
  IDLE: "idle",
  TRANSIT: "transit",
  DESTINATION: "destination",
};

function ElevetorProject() {
  const [elevators, setElevators] = useState(
    Array(ELEVATORS).fill().map((_, id) => ({
      id,
      currentFloor: 0,
      state: ElevatorStates.IDLE,
    }))
  );

  const [floorCalls, setFloorCalls] = useState(
    Array(FLOORS).fill(false)
  );

  const [callQueue, setCallQueue] = useState([]);

  // Assign calls to idle elevators
  useEffect(() => {
    const processQueue = () => {
      setCallQueue((queue) => {
        let newQueue = [...queue];

        setElevators((prevElevators) =>
          prevElevators.map((elevator) => {
            if (
              elevator.state === ElevatorStates.IDLE &&
              newQueue.length > 0
            ) {
              const targetFloor = newQueue.shift();

              moveElevator(elevator.id, targetFloor);
              setFloorCalls((prev) => {
                const updated = [...prev];
                updated[targetFloor] = false;
                return updated;
              });

              return {
                ...elevator,
                state: ElevatorStates.TRANSIT,
              };
            }
            return elevator;
          })
        );

        return newQueue;
      });
    };

    const interval = setInterval(processQueue, 500);
    return () => clearInterval(interval);
  }, []);

  const callElevator = (floor) => {
    if (floorCalls[floor]) return;

    setFloorCalls((prev) => {
      const updated = [...prev];
      updated[floor] = true;
      return updated;
    });

    setCallQueue((prev) => [...prev, floor]);
  };

  const moveElevator = (id, floor) => {
    const travelTime = Math.abs(
      elevators[id].currentFloor - floor
    ) * 1000;

    setElevators((prev) =>
      prev.map((el) =>
        el.id === id
          ? { ...el, state: ElevatorStates.TRANSIT }
          : el
      )
    );

    // Simulate transit
    setTimeout(() => {
      setElevators((prev) =>
        prev.map((el) =>
          el.id === id
            ? {
                ...el,
                currentFloor: floor,
                state: ElevatorStates.DESTINATION,
              }
            : el
        )
      );

      // Simulate door open for 3 seconds
      setTimeout(() => {
        setElevators((prev) =>
          prev.map((el) =>
            el.id === id
              ? { ...el, state: ElevatorStates.IDLE }
              : el
          )
        );
      }, 3000);
    }, travelTime);
  };

  return (
    <div className="container">
      <div className="building">
        {Array(FLOORS)
          .fill()
          .map((_, i) => {
            const floor = FLOORS - 1 - i;
            return (
              <div className="floor" key={floor}>
                <button
                  onClick={() => callElevator(floor)}
                  disabled={floorCalls[floor]}
                >
                  Call
                </button>
                {elevators.map((elevator) => (
                  <div
                    key={elevator.id}
                    className={`elevator ${
                      elevator.currentFloor === floor
                        ? elevator.state
                        : ""
                    }`}
                  />
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ElevetorProject;
