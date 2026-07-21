import { createContext, useState } from "react";

export const AnimationContext = createContext();

export function AnimationProvider({ children }) {

  const [assignments, setAssignments] = useState({
    startup: null,
    singleTap: null,
    doubleTap: null,
    longPress: null,
    batteryLow: null,
    charging: null,
    sleeping: null,
    wakeUp: null
  });

  const [currentEvent, setCurrentEvent] = useState(null);

  return (
    <AnimationContext.Provider
      value={{
        assignments,
        setAssignments,
        currentEvent,
        setCurrentEvent
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}