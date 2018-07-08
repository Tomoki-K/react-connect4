import React from 'react';

const WINCNT = 4;

// board[X_LEN(縦)][Y_LEN(横)]
const X_LEN = 7;
const Y_LEN = 6;

export default class ConnectFour extends React.Component {
	constructor() {
		super();
		this.state = {
			board: [...Array(X_LEN)].map(e => Array(Y_LEN).fill(0)),
			player: 1,
			message: "player1's turn",
			gameset: false
		}
	}

	initialize() {
		this.setState({
			board: [...Array(X_LEN)].map(e => Array(Y_LEN).fill(0)),
			player: 1,
			message: "player1's turn",
			gameset: false
		});
	}

	handleClick(x) {
		if (this.state.gameset) {
			this.initialize();
		} else {
			this.setPiece(x);
		}
	}

	setPiece(x) {
		let settable = true;
		let last_x, last_y;
		let newboard = this.state.board

		// validate choice
		if (!newboard[x].includes(0)) return false;

		// set piece
		let newRow = this.state.board[x].reverse().map((e, y) => {
			if (e == 0 && settable) {
				settable = false;
				last_x = x;
				last_y = Y_LEN - y - 1;
				return this.state.player;
			} else {
				return e;
			}
		});
		newboard[x] = newRow.reverse();

		let nextPlayer = this.state.player == 1 ? 2 : 1;
		if (this.isGameSet(last_x, last_y)) {
			this.setState({
				board: newboard,
				message: `player${this.state.player} wins!`,
				gameset: true
			});
		} else {
			this.setState({
				board: newboard,
				player: nextPlayer,
				message: `player${nextPlayer}'s turn`,
				gameset: false
			});
		}
	}

	isGameSet(x, y) {
		const directions = [
			[1, 1], //[＼]方向
			[0, 1], //[│]方向
			[1, 0], //[─]方向
			[-1, 1] //[／]方向
		]
		let flg = false;
		directions.forEach((d) => {
			if (this.scanDirection(x, y, d) == WINCNT) {
				flg = true;
			}
		});
		return flg;
	}

	scanDirection(x_id, y_id, dir) {
		let cnt = 1;
		let x, y;
		// console.log("dir = " + dir[0] + " " + dir[1]);
		for (let i = 1; i < WINCNT; i++) {
			x = x_id + (dir[1] * i);
			y = y_id + (dir[0] * i);
			// console.log("  x , y = " + x + " " + y);
			if (x >= X_LEN) break;
			if (this.state.board[x][y] == this.state.player) {
				cnt++;
			} else {
				break;
			}
		}
		for (let i = 1; i < WINCNT; i++) {
			x = x_id + (-1 * dir[1] * i);
			y = y_id + (-1 * dir[0] * i);
			// console.log("  x , y = " + x + " " + y);
			if (x < 0) break;
			if (this.state.board[x][y] == this.state.player) {
				cnt++;
			} else {
				break;
			}
		}
		return cnt;
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
            {board.map((xs, y) => {
              return(
                <tr key={`y-${y}`}>
                  {xs.map((val, x) => {
                    return (
                      <td key={`${y}-${x}`}
                        id={`${y}-${x}`}
                        className={`player${board[y][x]}`}
                        onClick={(e) => this.handleClick(x)}>
                        {x + "," + y}
                      </td>
                    );
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