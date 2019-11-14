import React from 'react';
import Board from "./Board";

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      step: 0,
      xIsNext: true
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.step + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      step: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step){
    this.setState({
      step: step,
      xIsNext: (step % 2) === 0
    });
  }

  reset(){
    this.setState({
      history: [{
        squares: Array(9).fill(null)
      }],
      step: 0,
      xIsNext: true
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.step];
    const winner = calculateWinner(current.squares);
    const backBtn = (this.state.step !== 0) ? <button className="font-weight-bold small rounded btn btn-warning" onClick={ () => this.jumpTo(this.state.step - 1) }> &larr; </button> : null;
    const forwardBtn = (this.state.step < history.length - 1) ? <button className="font-weight-bold small rounded btn btn-warning" onClick={ () => this.jumpTo(this.state.step + 1) }> &rarr; </button> : null;
    let status, str;
    let EmptySquare = current.squares.filter(x => x !== null).length;

    const resetBtn = (this.state.step !== 0) ? (<button 
          className="btn btn-danger"
          onClick={ () => { this.reset() } }
        > Reset </button>) : null;

    if(winner){
      str = winner + " Won!";
      status = <div className="text-success font-weight-bold">{str}</div>;
    }else if( EmptySquare === 9 ){
      status = <div className="text-danger font-weight-bold">Game Over!</div>;
    }else if( EmptySquare ){
      str = "Next player : " + (this.state.xIsNext ? "X" : "O");
      status = <div className="text-primary font-weight-bold">{str}</div>;
    }else if( EmptySquare === 0){
      status = <div className="text-primary font-weight-bold">Start the Game : X</div>
    }

    return (
      <div>
        <div className="game-board p-2 bg-success">
          <Board 
            squares={current.squares}
            onClick={ (i) => { this.handleClick(i) } }
          />
        </div>
        <div className="small text-center my-2"> { status } </div>
        <div className="d-flex justify-content-between">
          <div>{ backBtn }</div>
          <div>{ forwardBtn }</div>
        </div>
        <div className="text-center my-2"> { resetBtn } </div>
      </div>
    );
  }
}

const calculateWinner = (squares) => {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for(let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }

  return null;
}

export default Game;