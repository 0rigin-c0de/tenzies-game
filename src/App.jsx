import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTensies] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const value = dice[0].value;
    const allSameValue = dice.every((die) => die.value === value);

    if (allHeld && allSameValue) {
      setTensies(true);
      console.log("You won!");
    }
  }, [dice]);

  React.useEffect(() => {
    let interval = null;
    if (!tenzies && isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (tenzies && !isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [tenzies, isActive, seconds]);

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }
  function allNewDice() {
    const newDice = [];
    for (let index = 0; index < 10; index++) {
      const die = generateNewDie();
      newDice.push(die);
    }
    return newDice;
  }

  function holdDie(id) {
    setIsActive(true);
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    if (tenzies) {
      setTensies(false);
      setIsActive(false);
      setSeconds(0);
      setDice(allNewDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
    }
  }

  const dieElement = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="info">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice-container">{dieElement}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <h4>Time (seconds): {seconds}</h4>
    </main>
  );
}
