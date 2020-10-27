import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import {calculateWinner} from "./JSmodles/calculateWinner"




function Square(props) // Square - зависимый компонент(controlled component), значит, он не имеет собственного state. Конструткор не нужен
{
	return(
		<button
			className="square"
			onClick={props.onClick}
			>
			{props.value}
		</button>
	)
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
 
	render() { // отрисовка доски
	  return (
		 <div>
			<div className="board-row">
			  {this.renderSquare(0)}
			  {this.renderSquare(1)}
			  {this.renderSquare(2)}
			</div>
			<div className="board-row">
			  {this.renderSquare(3)}
			  {this.renderSquare(4)}
			  {this.renderSquare(5)}
			</div>
			<div className="board-row">
			  {this.renderSquare(6)}
			  {this.renderSquare(7)}
			  {this.renderSquare(8)}
			</div>
		 </div>
	  );
	}
 }
 
 class Game extends React.Component {
	 constructor(props)
	 {
		 super(props);
		 this.state = {
			 history: [{ // история ходов
					 squares : Array(9).fill(null),
					 xIsNext : true
			}],
			// xIsNext: true, // ходил ли "X"
			stepNumber: 0 // на каком мы сейчас ходу
		 }
	 }
	 handleClick(i) {
		const history = this.state.history.slice(0,this.state.stepNumber + 1); // создаю копию истории
		const current = history[history.length - 1]; // беру текущее поле(последнее поле)
		const squares = current.squares.slice(); // беру текущее расположение крестиков и ноликов на поле
		if(calculateWinner(squares) || typeof squares[i] === "string") 
				return; // если победитель есть или клеточка не пустая, клик не засчитывается
		squares[i] = current.xIsNext ? "X" : "O";
		this.setState(
			{
			history: [ // обновление истории ходов
				...history,
				{
					squares: squares,
					xIsNext: !current.xIsNext
				}
			],
			stepNumber: history.length
			}
			); // меняю стейт
	 }
	 jumpTo(step) // step - индекс, куда "поедет история"
	 {
		this.setState({
			stepNumber: step, // вношу изменения в state
		})
	 }
	 render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares); // "X","O", или null

		const moves = history.map((step,move) => {
			const desc = move ? 
				'Go to move #' + move:
				'Go to game start';
			return (
				<li key ={move}>
					<button
					 onClick={() => this.jumpTo(move)}
					 className="history"
					 >{desc}
					</button>
				</li>
			)
			
		})
		let status;
		// условия гейм-овера
		if(current.squares.every(content => content !== null) && !calculateWinner(current.squares))
		{
			status = "Game Over! There is no winner!"; 
		}
		else if (winner) {
		  status = 'Winner: ' + winner;
		} else {
		  status = 'Next player: ' + (current.xIsNext ? 'X' : 'O');
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
 
 
 ReactDOM.render( // отрисовка приложения в элемент с id="root"
	<Game />,
	document.getElementById('root')
 );
 










