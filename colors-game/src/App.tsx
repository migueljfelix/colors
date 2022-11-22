import { useEffect, useState } from "react";
import {AiOutlineGithub, AiFillLinkedin} from 'react-icons/ai'
import "./App.css";

const getRandomColor = () => {
  const digits = [
    "0",
    "1",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  const color = new Array(6)
    .fill("")
    .map(() => digits[Math.floor(Math.random() * digits.length)])
    .join("");

  return `#${color}`;

  console.log(color);
};

enum Result {
  Correct,
  Wrong,
}

function App() {
  const [color, setColor] = useState("");
  //to store color,  use state to dynamicly change stuff on the page, we will dynamicly change the colors of the guess-me box
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Result | undefined>(undefined);

  const generateColors = () => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  //when it first mounts generate a color, it runs code the first time the component mounts and renders everytime with the empty array
  useEffect(() => {
    generateColors();
  }, []);

  const handleAnswerClicked = (answer: string) => {
    if (answer === color) {
      setResult(Result.Correct);
      generateColors();
    } else {
      setResult(Result.Wrong);
    }
  };

  return (
    <div className="App">
      <h1>Guess the Color Game</h1>
      <div className="col">
        <div className="guess-me" style={{ background: color }}></div>
        {answers.map((answer) => (
          <button key={answer} onClick={() => handleAnswerClicked(answer)}>
            {answer}
          </button>
        ))}
        {result === Result.Wrong && <div className="wrong">Wrong Answer</div>}
        {result === Result.Correct && <div className="correct">Correct!</div>}
      </div>
      <div className="footer">
      <p className='icons'>
        <a href='https://github.com/migueljfelix/' rel="noopener noreferrer"><AiOutlineGithub/></a>
        <a href='https://linkedin.com/in/migueljfelix'rel="noopener noreferrer"><AiFillLinkedin/></a>
      </p>
      </div>
    </div>
  );
}

export default App;
