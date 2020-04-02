import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let listBoard = [];
    for (let i = 0; i < 3; i++) {
      let listSquare = [];
      for (let j = 0; j < 3; j++) {
        listSquare.push(this.renderSquare(j + i * 3))
      }
      listBoard.push(<div className="board-row">{listSquare}</div>);
    }

    return (
      <div>{listBoard}</div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        idex: null,
      }],
      stepNumber: 0,
      isNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isNext ? "X" : "O";
    this.setState({
      history: history.concat([{
        squares: squares,
        idex: i,
      }]),
      stepNumber: history.length,
      isNext: !this.state.isNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const histories = this.state.history;
    const current = histories[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const stepNumber = this.state.stepNumber;

    const moves = histories.map((step, move) => {
      const desc = move ?
        `Go to move #${move}, point ${renderPoint(histories[move].idex)}` :
        'Go to game start';
      return (
        <li key={move}>
          <button
            className={(stepNumber === move) ? "bold-and-border" : "" }
            onClick={() => this.jumpTo(move)}> {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = `Nex Player: ${this.state.isNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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
}

function renderPoint(point) {
  let line, col;
  if (point < 3) {
    line = 0;
  } else if (point > 5) {
    line = 2;
  } else {
    line = 1;
  }

  if ([0, 3, 6].includes(point)) {
    col = 0;
  } else if ([1, 4, 7].includes(point)) {
    col = 1;
  } else {
    col = 2;
  }
  
  return `[${line}, ${col}]`;
}