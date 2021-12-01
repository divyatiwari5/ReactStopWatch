import { useEffect, useState } from 'react';
import './App.scss';

function App() {

  const [timer, setTimer] = useState(0);
  const [time, setTime] = useState(0);
  const [isStart, setStart] = useState(false);

  useEffect(() => {
    let interval=null;
    if (isStart) {
      interval = setInterval(() => {
        console.log({time})
        if(time > 0) {
          setTime(time => time-1)
        } else {
          clearInterval(interval)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isStart, time])

  function start() {
    setTime(timer);
    toggle();
  }

  function toggle() {
    setStart(!isStart);
  }

  function reset() {
    setTimer(0);
    setStart(false);
    setTime(0);
  }

  return (
    <div className="App">
      <p>{time}</p>
      <input value={timer} onChange={(e) => setTimer(e.target.value)}/>
      <button onClick={start}>Start</button>
      <button onClick={toggle}>{isStart ? 'Stop' : 'Resume'}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
