import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Spinner from "react-spinkit";

function App() {
	const [user, loading] = useAuthState(auth);

	if (loading) {
		return (
			<AppLoading>
				<AppLoadingContents>
					<img
						src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
						alt="slack logo"
					/>
					<Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
				</AppLoadingContents>
			</AppLoading>
		);
	}

	return (
		<div className="app">
			<Router>
				{!user ? (
					<Login />
				) : (
					<>
						<Header />
						<AppBody>
							<Sidebar />
							<Switch>
								<Route exact path="/" component={Chat} />
							</Switch>
						</AppBody>
					</>
				)}
			</Router>
		</div>
	);
}

export default App;

const AppBody = styled.div`
	display: flex;
	height: 100vh;
`;

const AppLoading = styled.div`
	display: grid;
	height: 100vh;
	place-items: center;
	width: 100%;
`;

const AppLoadingContents = styled.div`
	text-align: center;
	padding-bottom: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> img {
		height: 99px;
		padding: 19px;
		margin-bottom: 39px;
	}
`;
