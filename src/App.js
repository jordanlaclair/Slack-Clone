import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
	const appHeight = () => {
		const doc = document.documentElement;
		doc.style.setProperty("--app-height", `${window.innerHeight}px`);
	};
	window.addEventListener("resize", appHeight);
	appHeight();

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
	height: 100%;
`;

const AppLoading = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	/* bring your own prefixes */
	transform: translate(-50%, -50%);
	overflow: hidden !important;
`;

const AppLoadingContents = styled.div`
	position: relative;
	text-align: center;
	overflow: hidden !important;

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
