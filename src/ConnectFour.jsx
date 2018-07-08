import React from 'react';

const ROW = 7;
const LINE = 6;
// board[ROW(縦)][LINE(横)]

export default class ConnectFour extends React.Component {
	constructor() {
		super();
		this.state = {
			board: [...Array(ROW)].map(e => Array(LINE).fill(0)),
			player: 1,
			message: "player1's turn"
		}
	}

	setPiece(rowNum) {
		let settable = true;
		let newboard = this.state.board

		// validate choice
		if (!newboard[rowNum].includes(0)) return false;

		// set piece
		let newRow = this.state.board[rowNum].reverse().map((e, lineNum) => {
			if (e == 0 && settable) {
				settable = false;
				this.scanForWin(rowNum, LINE - lineNum - 1);
				return this.state.player;
			} else {
				return e;
			}
		});
		newboard[rowNum] = newRow.reverse();
		let nextPlyer = this.state.player == 1 ? 2 : 1;
		this.setState({
			board: newboard,
			player: nextPlyer,
			message: `player${nextPlyer}'s turn`
		});
	}

	scanForWin(row, line) {

	}

	transpose(arr) {
		const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
		return transpose(arr)
	}


	render() {
		let board = this.transpose(this.state.board);
		return (
			<div className='mainWrapper'>
        <p className='message'>{this.state.message}</p>
        <table>
           <tbody>
            {board.map((rows, l_idx) => {
              return(
                <tr key={`line-${l_idx}`}>
                  {rows.map((val, r_idx) => {
                    return (
                      <td key={`${l_idx}-${r_idx}`}
                        id={`${l_idx}-${r_idx}`}
                        className={`player${board[l_idx][r_idx]}`}
                        onClick={(e) => this.setPiece(r_idx)}>
                        {r_idx + "," + l_idx}
                      </td>);
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
		);
	}
}