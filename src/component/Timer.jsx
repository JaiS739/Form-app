import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const id = setInterval(() => {
      if (timer < 1) {
        clearInterval(id);
      } else {
        setTimer(timer - 1);
      }
      //   prev it is previous value of timer
    }, 500);
    return () => {
      clearInterval(id);
    };
  }, [timer]);
  return <div>Timer:{timer}</div>;
};

export default Timer;
