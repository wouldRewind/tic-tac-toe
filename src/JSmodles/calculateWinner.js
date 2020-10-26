export function calculateWinner(squares)
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