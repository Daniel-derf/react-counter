import styled from "styled-components";
import { useState, useRef } from "react";

const useTimer = (initialCount: number) => {
  const [count, setCount] = useState<number>(initialCount);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const interval = useRef<number | undefined>(undefined);

  function start() {
    if (interval.current) return;

    setIsRunning(true);

    interval.current = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
  }

  function stop() {
    clearInterval(interval.current);
    interval.current = undefined;
    setIsRunning(false);
  }

  function reset() {
    clearInterval(interval.current);
    interval.current = undefined;
    setCount(0);
    setIsRunning(false);
  }

  return { start, stop, reset, isRunning, count };
};

const App = () => {
  const { start, stop, reset, isRunning, count } = useTimer(0);

  return (
    <AppWrapper>
      <h1>Timer App</h1>
      <TimerWrapper>
        <h2>Count: {count}</h2>
        <div>
          <Button onClick={start}>Start</Button>
          <Button onClick={stop}>Stop</Button>
          <Button onClick={reset}>Reset</Button>
        </div>
      </TimerWrapper>
      <h2>{isRunning && "Timer is active"}</h2>
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  background-color: "#fff";
  color: "#333";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
`;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
