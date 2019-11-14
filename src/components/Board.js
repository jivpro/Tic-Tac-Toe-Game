import React, {Component} from "react";
import Square from "./Square";

class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i){
    return(
      <Square
        value={this.state.squares[i]}
        onClick={ () => this.handleClick(i) } 
      />
    );
  }

  render(){
    const winner = calculateWinner(this.state.squares);
    let status, str;
    let EmptySquare = this.state.squares.filter(x => x !== null).length
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
        <div className="text-center">
          <div className="d-flex">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="d-flex">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="d-flex">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        <div className="status text-primary"> {status} </div>
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

  for(let i=0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }

  return null;
}

export default Board;