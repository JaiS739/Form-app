import React from "react";
import { useState } from "react";
const Stopwatch = () => {
  const [watch, setWatch] = useState(0);
  const [watchid, setWatchid] = useState();
  let start = () => {
    if (!watchid) {
      const id = setInterval(() => {
        setWatch((prev) => prev + 1);
      }, 100);
      setWatchid(id);
    }
  };

  let pause = () => {
    clearInterval(watchid);
    setWatchid(null);
  };

  let reset = () => {
    clearInterval(watchid);
    setWatch(0);
    setWatchid(null);
  };

  return (
    <div>
      Stopwatch
      <div>
        <h1>{watch}</h1>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
