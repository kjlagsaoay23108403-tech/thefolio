import React, { useState } from 'react';

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quiz = [
    { q: "What tool did I start drawing with?", a: "Pen", b: "Pencil", correct: "b" },
    { q: "What improves drawing skills?", a: "Practice", b: "Luck", correct: "a" },
    { q: "Drawing helps reduce?", a: "Stress", b: "Energy", correct: "a" },
    { q: "Drawing improves?", a: "Focus", b: "Laziness", correct: "a" },
    { q: "Drawing is a form of?", a: "Expression", b: "Exercise", correct: "a" },
    { q: "What did I practice next?", a: "Shading", b: "Dancing", correct: "a" },
    { q: "Drawing helps show?", a: "Ideas", b: "Noise", correct: "a" },
    { q: "Drawing needs?", a: "Patience", b: "Speed only", correct: "a" },
    { q: "What improves drawings?", a: "Practice", b: "Copying", correct: "a" },
    { q: "Drawing is?", a: "Creative", b: "Boring", correct: "a" }
  ];

  const handleAnswer = (choice) => {
    if (choice === quiz[current].correct) {
      setScore(score + 1);
    }

    if (current + 1 < quiz.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <section>
        <h2>🎮 Quiz Results</h2>
        <p>Your Score: {score} / 10</p>
        <button onClick={resetQuiz}>Play Again</button>
      </section>
    );
  }

  return (
    <section>
      <h2>🎮 Drawing Quiz Game</h2>
      <p id="question">{quiz[current].q}</p>
      <button onClick={() => handleAnswer('a')} id="btnA">
        A. {quiz[current].a}
      </button>
      <button onClick={() => handleAnswer('b')} id="btnB">
        B. {quiz[current].b}
      </button>
      <p id="progress">Question {current + 1} of 10</p>
    </section>
  );
};

export default Quiz;