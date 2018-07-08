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
			message: "player1's turn"
		}
	}

	setPiece(x) {
		let settable = true;
		let newboard = this.state.board

		// validate choice
		if (!newboard[x].includes(0)) return false;

		// set piece
		let newRow = this.state.board[x].reverse().map((e, y) => {
			if (e == 0 && settable) {
				settable = false;
				this.scanForWin(x, Y_LEN - y);
				return this.state.player;
			} else {
				return e;
			}
		});
		newboard[x] = newRow.reverse();
		let nextPlyer = this.state.player == 1 ? 2 : 1;
		this.setState({
			board: newboard,
			player: nextPlyer,
			message: `player${nextPlyer}'s turn`
		});
	}

	scanForWin(x, y) {
		console.log(x, y);
		const directions = [
			[1, 1], //[＼]方向
			[0, 1], //[│]方向
			[1, 0], //[─]方向
			[-1, 1] //[／]方向
		]
		directions.forEach((d) => {
			if (this.scanDirection(x, y, d) == WINCNT) {
				console.log('there is a winner!');
			}
		});

	}

	scanDirection(x_id, y_id, dir) {
		let cnt = 1;
		let x, y;
		for (let i = 1; i < WINCNT; i++) {
			y = x_id + (dir[1] * i);
			x = y_id + (dir[0] * i);
			if (this.state.board[x][y] == this.state.player) {
				cnt++;
			} else {
				break;
			}
		}
		for (let i = 1; i < WINCNT; i++) {
			y = x_id + (-1 * dir[1] * i);
			x = y_id + (-1 * dir[0] * i);
			if (this.state.board[x][y] == this.state.player) {
				cnt++;
			} else {
				break;
			}
		}
		console.log(cnt);
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
                        onClick={(e) => this.setPiece(x)}>
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