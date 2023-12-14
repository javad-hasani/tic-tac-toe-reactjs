import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import "./App.css";

const App = () => {
  // استیت‌ها
  const [gameHistory, setGameHistory] = useState([]); // تاریخچه بازی‌ها
  const [currentGame, setCurrentGame] = useState({ // وضعیت بازی جاری
    squares: Array(9).fill(null),
    xIsNext: true,
    isDraw: false,
    numberOfMoves: 0,
    winner: null
  });
  const [xWins, setXWins] = useState(0); // برد‌های X
  const [oWins, setOWins] = useState(0); // برد‌های O
  const [loading, setLoading] = useState(true); // وضعیت بارگیری

  // تابع بررسی برنده
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  // مدیریت بارگیری
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // مدیریت تغییرات برنده و به‌روزرسانی برد‌ها
  useEffect(() => {
    const winner = currentGame.winner;
    if (winner) {
      if (winner === 'X') {
        setXWins(prevXWins => prevXWins + 1);
      } else {
        setOWins(prevOWins => prevOWins + 1);
      }
    }
  }, [currentGame.winner]);

  // بررسی کلیک روی خانه‌های بازی
  const handleClick = (i) => {
    if (currentGame.winner || currentGame.squares[i]) return;

    const newSquares = [...currentGame.squares];
    newSquares[i] = currentGame.xIsNext ? 'X' : 'O';

    const newGame = {
      squares: newSquares,
      xIsNext: !currentGame.xIsNext,
      isDraw: currentGame.numberOfMoves + 1 === 9 && !calculateWinner(newSquares),
      numberOfMoves: currentGame.numberOfMoves + 1,
      winner: calculateWinner(newSquares)
    };

    setCurrentGame(newGame);
  };

  // شروع بازی جدید
  const handleRestart = () => {
    setGameHistory([...gameHistory, currentGame]);
    setCurrentGame({
      squares: Array(9).fill(null),
      xIsNext: true,
      isDraw: false,
      numberOfMoves: 0,
      winner: null
    });
  };

  // نمایش خانه‌های بازی به صورت دکمه
  const renderSquare = (i) => (
    <button className="square" key={i} onClick={() => handleClick(i)}>
      {currentGame.squares[i]}
    </button>
  );

  // اگر هنوز بارگیری انجام نشده باشد، لودر را نمایش بده
  if (loading) {
    return <Loader />;
  }

  // نمایش بازی Tic Tac Toe
  return (
    <div className="game">
      <div className="game-board">
        {[0, 1, 2].map((row) => (
          <div className="board-row" key={row}>
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <div className="game-info">
        <div>{currentGame.winner ? `برنده: ${currentGame.winner}` : (currentGame.isDraw ? 'تساوی!' : `نوبت بازیکن: ${currentGame.xIsNext ? 'X' : 'O'}`)}</div>
        <div>حرکات: {currentGame.numberOfMoves}</div>
        <div>برد‌های X: {xWins} بار</div>
        <div>برد‌های O: {oWins} بار</div>
        <button onClick={handleRestart}>شروع مجدد</button>
      </div>
      <div className="game-history">
        <ul>
          {/* نمایش تاریخچه بازی‌ها */}
          {gameHistory.map((game, index) => (
            <li key={index}>
              {game.winner ? `برنده: ${game.winner}` : (game.isDraw ? 'تساوی!' : `نوبت بازیکن: ${game.xIsNext ? 'X' : 'O'}`)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
