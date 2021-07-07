import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { auth, provider } from "../firebase";

const Login = () => {
	const signIn = (e) => {
		e.preventDefault();
		auth.signInWithPopup(provider).catch((error) => {
			alert(error.message);
		});
	};
	return (
		<LoginContainer>
			<LoginInnerContainer>
				<img
					src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
					alt="slack logo"
				/>
				<h1>Sign in</h1>
				<p>slack.com</p>
				<Button
					onClick={(e) => {
						signIn(e);
					}}
				>
					Sign in with Google
				</Button>
			</LoginInnerContainer>
		</LoginContainer>
	);
};

export default Login;

const LoginContainer = styled.div`
	background-color: #f8f8f8;
	height: 100vh;
	display: grid;
	place-items: center;
`;

const LoginInnerContainer = styled.div`
	background-color: white;
	padding: 99px;
	text-align: center;
	border-radius: 9px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	> img {
		object-fit: contain;
		height: 100px;
		margin-bottom: 39px;
	}

	> button {
		margin-top: 49px;
		text-transform: inherit !important;
		background-color: #0a8d48;
		color: white;
	}
`;
