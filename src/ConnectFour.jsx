import React from 'react';

const ROW = 7;
const LINE = 6;
// board[ROW(縦)][LINE(横)]

export default class ConnectFour extends React.Component {
	constructor() {
		super();
		this.state = {
			board: [...Array(ROW)].map(e => Array(LINE).fill(0)),
			player: 1
		}
	}

	setPiece(rowNum) {
		let set = true;
		let newboard = this.state.board
		let newRow = this.state.board[rowNum].reverse().map((e) => {
			if (e == 0 && set) {
				set = false;
				return this.state.player;
			} else {
				return e;
			}
		});
		newboard[rowNum] = newRow.reverse();
		this.setState({
			board: newboard,
			player: this.state.player == 1 ? 2 : 1
		});
	}

	render() {
		let board = this.state.board;
		return (
			<table>
			   <tbody>
			    {board.map((rows, l_idx) => {
			      return(
			        <tr key={`line-${l_idx}`}>
			          {rows.map((val, r_idx) => {
			            return (
                    <td key={`${l_idx}-${r_idx}`}
                      id={`${l_idx}-${r_idx}`}
                      onClick={(e) => this.setPiece(r_idx)}>
                      {board[r_idx][l_idx]}
                    </td>);
			          })}
			        </tr>
			      );
			    })}
			  </tbody>
			</table>
		);
	}
}