import React from "react";
import ReactDom from "react-dom";
import ConnectFour from "./ConnectFour";

class App extends React.Component {
	render() {
		return (
			<ConnectFour/>
		);
	}
}

ReactDom.render(<App/>, document.getElementById("app"));