import React from 'react';

const ROW = 7;
const LINE = 6;

export default class ConnectFour extends React.Component {
	constructor() {
		super();
		this.state = {
			board: [...Array(LINE)].map(e => Array(ROW).fill(0)),
			player: 1;
		}
	}

	render() {
		return (
			<table>
         <tbody>
          {this.state.board.map((l, l_idx) => {
            return(
              <tr key={`line-${l_idx}`}>
                {l.map((r, r_idx) => {
                  return <td key={`row-${l_idx}-${r_idx}`}>{r}</td>
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
		);
	}
}