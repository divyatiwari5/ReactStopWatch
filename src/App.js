import { useEffect, useState } from 'react';
import './App.scss';

function App() {

  const [timer, setTimer] = useState(0);
  const [time, setTime] = useState(0);
  const [isStart, setStart] = useState(false);
  const [isComplete, setCompletion] = useState(true);

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

  /**
   * Start timer
   */
  function start() {
    if (timer > 0) {
      setTime(timer);
      setCompletion(false);
      toggle();
    }
   
  }

  /**
   * Play and pause timer 
   */
  function toggle() {
    if (time === 0 && isStart) {
      reset();
    } else {
      setStart(!isStart);
    }
  }

  /**
   * Resets timer
   */
  function reset() {
    setTimer(0);
    setStart(false);
    setTime(0);
    setCompletion(true);
  }

  /**
   * Calculates button text on the basis of timer condition
   * @returns button text
   */
  function getButtonText() {
    if (time === 0) {
      return 'Play Again';
    } else if (isStart) {
      return 'Stop';
    } else {
      return 'Resume'
    }
  }

  /**
   * Set timer on input change and resets the game if the game is not yet finished
   * @param {*} e event
   */
  const onChange = (e) => {
    setTimer(e.target.value);
    if (!isComplete) {
      reset();
    }
  }

  // TODO: Add countdown timer with SVG Circle

  return (
    <div className="App">
      <div className="timer">
        {time}
        <p className="unit">sec</p>
      </div>
      <input type="number" value={timer} onChange={(e) => onChange(e)} className="input" placeholder="Enter timer"/>
      <div className="btns">
        <button onClick={start} className={isComplete ? 'btn start': 'btn hidden'}>Start</button>
        <button onClick={toggle} className={isComplete ? 'btn hidden' : 'btn resume'}>{getButtonText()}</button>
        <button onClick={reset} className={isComplete ? 'btn hidden' : 'btn'}>Reset</button>
      </div>
      
    </div>
  );
}

export default App;
