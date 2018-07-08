import React from 'react';

export default class Board extends React.Component {
	constructor(props) {
		super(props);
	}

	transpose(arr) {
		const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
		return transpose(arr)
	}

	render() {
		let board = this.transpose(this.props.board);
		return (
			<table>
        <tbody>
          {board.map((cols, y) => {
            return(
              <tr key={`row-${y}`} id={`row_${y}`}>
                {cols.map((val, x) => {
                  return (
                    <td key={`${y}-${x}`}
                      id={`cell_${y}-${x}`}
                      className={`player${board[y][x]}`}
                      onClick={(e) => this.props.handleClick(x)}>
                      {this.props.debugMode ? x + "," + y: ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
    </table>
		);
	}
}