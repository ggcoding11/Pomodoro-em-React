import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { use } from "react";

function App() {
  const tempoCicloPomodoro = 0.2;
  const tempoPausaCurta = 0.1;

  const [estaLigadoTimer, setEstaLigadoTimer] = useState(false);
  const [estaEmPausaCurta, setEstaEmPausaCurta] = useState(false);

  const [nomeBotao, setNomeBotao] = useState("START");

  const [segundosRestante, setSegundosRestante] = useState(
    tempoCicloPomodoro * 60
  );
  const [tempoFormatoPomodoro, setTempoFormatoPomodoro] = useState(
    String(tempoCicloPomodoro) + ":00"
  );

  const clicarBotaoStartStop = () => {
    setEstaLigadoTimer(!estaLigadoTimer);
  };

  let timer;

  useEffect(() => {
    console.log("O estado estaLigado mudou para:", estaLigadoTimer);

    if (estaLigadoTimer == true) {
      setNomeBotao("STOP");

      timer = setInterval(() => {
        setSegundosRestante((segundosRestante) => segundosRestante - 1);
      }, 1000);
    } else {
      setNomeBotao("START");
    }

    return () => {
      clearInterval(timer);
      console.log("Intervalo limpo");
    };
  }, [estaLigadoTimer]);

  useEffect(() => {
    if (estaEmPausaCurta == true) {
      console.log("Iniciando pausa curta");
      setTempoFormatoPomodoro(String(tempoPausaCurta) + ":00");
      setNomeBotao("SKIP");

      timer = setInterval(() => {
        setSegundosRestante((segundosRestante) => segundosRestante - 1);
      }, 1000);
    }
  }, [estaEmPausaCurta]);

  useEffect(() => {
    if (segundosRestante == 0) {
      if (estaLigadoTimer == true) {
        setEstaLigadoTimer(false);
        setEstaEmPausaCurta(true);
        setSegundosRestante(tempoPausaCurta * 60);
      } else {
        setEstaLigadoTimer(true);
        setEstaEmPausaCurta(false);
        setSegundosRestante(tempoCicloPomodoro * 60);
      }
    }

    setTempoFormatoPomodoro(
      String(Math.floor(segundosRestante / 60)).padStart(2, "0") +
        ":" +
        String(segundosRestante % 60).padStart(2, "0")
    );
  }, [segundosRestante]);

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
          <button className="btn text-white fw-semibold">Pomodoro</button>
          <button className="btn text-white fw-semibold">Short Break</button>
          <button className="btn text-white fw-semibold">Long Break</button>
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
