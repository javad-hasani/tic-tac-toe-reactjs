import{ useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [gameHistory, setGameHistory] = useState([]);
  const [currentGame, setCurrentGame] = useState({
    squares: Array(9).fill(null),
    xIsNext: true,
    isDraw: false,
    numberOfMoves: 0,
    winner: null
  });
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

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

  const renderSquare = (i) => (
    <button className="square" key={i} onClick={() => handleClick(i)}>
      {currentGame.squares[i]}
    </button>
  );

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

  useEffect(() => {
    const winner = currentGame.winner;
    if (winner) {
      if (winner === 'X') {
        setXWins(xWins + 1);
      } else {
        setOWins(oWins + 1);
      }
    }
  }, [currentGame.winner, xWins, oWins]);

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
        <div>{currentGame.winner ? `برنده: ${currentGame.winner}` : (currentGame.isDraw ? 'مساوی شد!' : `بازیکن بعدی: ${currentGame.xIsNext ? 'X' : 'O'}`)}</div>
        <div>تعداد حرکات: {currentGame.numberOfMoves}</div>
        <div>X برنده: {xWins} بار</div>
        <div>O برنده: {oWins} بار</div>
        <button onClick={handleRestart}>بازی مجدد</button>
      </div>
      <div className="game-history">
        <ul>
          {gameHistory.map((game, index) => (
            <li key={index}>
              {game.winner ? `برنده: ${game.winner}` : (game.isDraw ? 'مساوی شد!' : `بازیکن بعدی: ${game.xIsNext ? 'X' : 'O'}`)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
