import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';


function calculateWinner(squares)
{
	const lines = [ // перечисление всех возможных случаев победы
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
	 ];
	 for(let i = 0; i < lines.length;i++)
	 {
		 const [a,b,c] = lines[i]; // деструктуризация "победной линии" в переменные a,b,c - индексы предпологаемых победных клеток
		 if(squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c])
			 return squares[a]
		 
	 }
	 return null; // дефолтный случай
}


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
			onClick={() => this.props.onClick(i)} // лесенка пропсов
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
					 squares : Array(9).fill(null)
			}],
			xIsNext: true // ходил ли "X"
		 }
	 }
	 handleClick(i) {
		const history = this.state.history; // создаю копию истории
		const current = history[history.length - 1]; // беру текущее поле
		const squares = current.squares; // беру текущее расположение крестиков и ноликов на поле
		if(calculateWinner(squares) || typeof squares[i] === "string") 
				return // если победитель есть или клеточка не пустая, клик не засчитывается
		squares[i] = this.state.xIsNext ? "X" : "O";
		this.setState(
			{
			history: [ // обновление истории ходов
				...history,
				{squares: squares}
			],
			xIsNext: !this.state.xIsNext,	
			}
			); // меняю стейт
	 }
	render() {
		const history = this.state.history;
		const current = history[history.length - 1];
		const winner = calculateWinner(current.squares)
		let status;
		if(winner) status = "Winner : " + winner;
		else status = "Next player : " + (this.state.xIsNext ? "X" : "O");
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
			  <ol>{/* TODO */}</ol>
			</div>
		 </div>
	  );
	}
 }
 
 
 ReactDOM.render( // отрисовка приложения в элемент с id="root"
	<Game />,
	document.getElementById('root')
 );
 
