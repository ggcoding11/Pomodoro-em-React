import { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const tempoCicloPomodoro = 0.2;
  const tempoPausaCurta = 0.1;
  const tempoPausaLonga = 0.3;

  const [contPomodoro, setContPomodoro] = useState(1);

  const [estaLigadoTimer, setEstaLigadoTimer] = useState(false);
  const [estaEmPausa, setEstaEmPausa] = useState(false);

  const [nomeBotao, setNomeBotao] = useState("START");

  const [segundosRestante, setSegundosRestante] = useState(
    tempoCicloPomodoro * 60
  );
  const [tempoFormatoPomodoro, setTempoFormatoPomodoro] = useState(
    String(tempoCicloPomodoro) + ":00"
  );

  const somClique = useRef(new Audio("src/assets/sounds/somBotao.mp3"));

  const clicarBotaoStartStop = () => {
    somClique.current.currentTime = 0;
    somClique.current.play();

    if (estaEmPausa === false) {
      setEstaLigadoTimer(!estaLigadoTimer);
    } else {
      setSegundosRestante(0);
    }
  };

  const timer = useRef();

  useEffect(() => {
    if (estaEmPausa === true) {
      setNomeBotao("SKIP");
    } else {
      if (estaLigadoTimer === true) {
        setNomeBotao("STOP");
      } else {
        setNomeBotao("START");
      }
    }

    if (estaLigadoTimer === true || estaEmPausa === true) {
      timer.current = setInterval(() => {
        setSegundosRestante((segundosRestante) => segundosRestante - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [estaLigadoTimer, estaEmPausa]);

  useEffect(() => {
    if (segundosRestante === 0) {
      if (estaLigadoTimer === true) {
        setEstaLigadoTimer(false);
        if (contPomodoro === 4) {
          setSegundosRestante(tempoPausaLonga * 60);
        } else {
          setSegundosRestante(tempoPausaCurta * 60);
        }

        setEstaEmPausa(true);
      } else {
        setEstaEmPausa(false);
        setSegundosRestante(tempoCicloPomodoro * 60);
        setContPomodoro((contPomodoro) => contPomodoro + 1);

        setEstaLigadoTimer(true);
      }
    }

    setTempoFormatoPomodoro(
      String(Math.floor(segundosRestante / 60)).padStart(2, "0") +
        ":" +
        String(segundosRestante % 60).padStart(2, "0")
    );
  }, [segundosRestante]);

  function clicarPomodoro() {
    if (estaEmPausa === true) {
      setEstaEmPausa(false);
    } else {
      setSegundosRestante(tempoCicloPomodoro * 60);
      setEstaLigadoTimer(true);
    }
  }

  function clicarPausaCurta(){

  }

  function clicarPausaLonga(){
    
  }

  return (
    <div className="container-fluid vh-100 py-4 main">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="text-white fw-bold">
            <span>⏰</span>
            Pomodoro Timer
          </h1>
        </div>
      </div>
      <div className="row row-buttons mt-2">
        <div className="col-12 d-flex justify-content-center gap-2">
          <button
            onClick={clicarPomodoro}
            className="btn text-white fw-semibold"
          >
            Pomodoro
          </button>
          <button
            onClick={clicarPausaCurta}
            className="btn text-white fw-semibold"
          >
            Short Break
          </button>
          <button
            onClick={clicarPausaLonga}
            className="btn text-white fw-semibold"
          >
            Long Break
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-center">
          <div className="container-timer d-flex justify-content-center align-items-center">
            <span className="text-center text-white fw-bold" id="timer">
              {tempoFormatoPomodoro}
            </span>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <span className="text-white fw-bold">#{contPomodoro}</span>
        </div>
      </div>

      <div className="row row-buttons mt-4">
        <div className="col-12 d-flex justify-content-center gap-2">
          <button
            onClick={clicarBotaoStartStop}
            className="btn text-white fw-semibold"
            id="start-stop"
          >
            {nomeBotao}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
