import React, { useState } from "react";
import "./styles.css";

const initialState = () => Array(9).fill(null);

const TicTac = () => {
  const [board, setBoard] = useState(initialState);
  const [isXTurn, setIsXTurn] = useState(true);

  const WINNING_PATHS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
  ];

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATHS.length; i++) {
      let [a, b, c] = WINNING_PATHS[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const winner = calculateWinner(board);

    if (winner || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setBoard(newBoard);
  };

  const getMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return "The Winner is " + winner;

    if (!board.includes(null)) return "The game is draw";

    return isXTurn ? "Player X turn" : "Player O turn";
  };

  const resetBoard = () => {
    setBoard(initialState);
    setIsXTurn(true);
  };

  return (
    <div className="wrapper">
      <div className="heading">Tic Tac Toe</div>
      <div className="head-container">
        <div>{getMessage()}</div>
        <button className="reset" onClick={resetBoard}>
          Reset Board
        </button>
      </div>
      <div className="grid">
        {board.map((b, index) => (
          <button
            className="cell"
            key={index}
            onClick={() => handleClick(index)}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTac;
