import { useEffect, useState } from 'react';
import './App.scss';

function App() {

  const [timer, setTimer] = useState(0);
  const [time, setTime] = useState(0);
  const [isStart, setStart] = useState(false);
  const [isComplete, setCompletion] = useState(true);

  useEffect(() => {
    if (!isComplete) {
      reset()
    }
  }, [timer])

  useEffect(() => {
    let interval=null;
    if (isStart) {
      interval = setInterval(() => {
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
    if (timer > 0) {
      setTime(timer);
      setCompletion(false);
      toggle();
    }
   
  }

  function toggle() {
    if (time === 0 && isStart) {
      reset();
    } else {
      setStart(!isStart);
    }
  }

  function reset() {
    setTimer(0);
    setStart(false);
    setTime(0);
    setCompletion(true);
  }

  function getButtonText() {
    if (time === 0) {
      return 'Play Again';
    } else if (isStart) {
      return 'Stop';
    } else {
      return 'Resume'
    }
  }

  return (
    <div className="App">
      <p className="timer">{time}</p>
      <input type="number" value={timer} onChange={(e) => setTimer(e.target.value)} className="input" placeholder="Enter timer"/>
      <div className="btns">
        <button onClick={start} className={isComplete ? 'btn start': 'btn hidden'}>Start</button>
        <button onClick={toggle} className={isComplete ? 'btn hidden' : 'btn resume'}>{getButtonText()}</button>
        <button onClick={reset} className={isComplete ? 'btn hidden' : 'btn'}>Reset</button>
      </div>
      
    </div>
  );
}

export default App;
