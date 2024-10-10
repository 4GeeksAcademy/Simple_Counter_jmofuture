import React, { useState, useEffect, useRef } from "react";


const Home = () => {
  const [seconds, setSeconds] = useState(0);
  const [isCounting, setIsCounting] = useState(true);
  const [targetTime, setTargetTime] = useState(null);
  const intervalRef = useRef(null);

  const startCounting = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopCounting = () => {
    clearInterval(intervalRef.current);
    setIsCounting(false);
  };

  const resetCounting = () => {
    stopCounting();
    setSeconds(0);
    setIsCounting(true);
    startCounting();
  };

  const resumeCounting = () => {
    if (!isCounting) {
      setIsCounting(true);
      startCounting();
    }
  };

  const handleAlert = (e) => {
    e.preventDefault();
    if (targetTime && seconds >= targetTime) {
      alert(`Has alcanzado ${targetTime} segundos.`);
    }
  };

  useEffect(() => {
    startCounting();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (targetTime && seconds === targetTime) {
      alert(`Has alcanzado ${targetTime} segundos.`);
    }
  }, [seconds, targetTime]);

  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center">
        <div className="col-2">
          <i className="fas fa-clock fa-5x"></i>
        </div>
        <div className="col-8 d-flex justify-content-center">
          <h1 className="display-4">{seconds}</h1>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary mx-2" onClick={stopCounting}>
          Parar
        </button>
        <button className="btn btn-success mx-2" onClick={resumeCounting}>
          Reanudar
        </button>
        <button className="btn btn-danger mx-2" onClick={resetCounting}>
          Reiniciar
        </button>
      </div>
      <form className="mt-3" onSubmit={handleAlert}>
        <input
          type="number"
          className="form-control"
          placeholder="Tiempo objetivo (segundos)"
          value={targetTime || ""}
          onChange={(e) => setTargetTime(Number(e.target.value))}
        />
        <button type="submit" className="btn btn-warning mt-2">
          Establecer alerta
        </button>
      </form>
    </div>
  );
};

export default Home;
