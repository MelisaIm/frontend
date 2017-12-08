import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HiveContainer from "./graphql/HiveContainer";
import SignupContainer from "./graphql/SignupContainer";
import login from "./helperFunctions/login";
import jwtDecode from "jwt-decode";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticatedId: this.props.authenticatedId
		};
	}
	handleLogin = async ({ email, password }) => {
		let { token } = await login({ email, password }, "http://localhost:3000");
		if (token) {
			localStorage.setItem("token", token);
			let { sub: authenticatedId } = jwtDecode(token);
			this.setState({ authenticatedId: parseInt(authenticatedId, 10) });
		}
		return;
	};

	handleLogOut = () => {
		localStorage.removeItem("token");
		this.setState({ authenticatedId: null });
	};

	handleSignup = (email, password, display_name) => {
		console.log(email, password, display_name);
		this.setState({ email, password, display_name });
	};

	render() {
		return (
			<Router>
				<div>
					<Route
						exact
						path="/"
						render={() => {
							return (
								<HiveContainer
									handleLogin={this.handleLogin}
									handleLogOut={this.handleLogOut}
									authenticatedId={this.state.authenticatedId}
								/>
							);
						}}
					/>
					<Route
						exact
						path="/hive"
						render={() => {
							return (
								<HiveContainer
									handleLogin={this.handleLogin}
									handleLogOut={this.handleLogOut}
									authenticatedId={this.state.authenticatedId}
								/>
							);
						}}
					/>
					<Route
						exact
						path="/signup"
						render={() => {
							return (
								<SignupContainer
									authenticatedId={this.state.authenticatedId}
									handleLogin={this.handleLogin}
									handleLogOut={this.handleLogOut}
									handleSignup={this.handleSignup}
									email={this.state.email}
									password={this.state.password}
									display_name={this.state.display_name}
								/>
							);
						}}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
