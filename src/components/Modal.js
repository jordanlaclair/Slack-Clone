import { dark } from "@material-ui/core/styles/createPalette";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { db } from "../firebase";
import * as action from "../store/actions/index";
import { darkTheme, lightTheme } from "./assets/styles/Themes";

const Modal = () => {
	const theme = useSelector((state) => state.app.theme);
	const [channelName, setChannelName] = useState("");

	const handleClose = () => {
		dispatch(action.closeModal());
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (channelName) {
			db.collection("rooms").add({
				name: channelName,
			});
		}
		dispatch(action.closeModal());
		setChannelName("");
	};

	const dispatch = useDispatch();

	return (
		<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
			<ModalWrapper>
				<ModalContainer>
					<h2>Please enter the channel name: </h2>
					<form action="">
						<input
							type="text"
							value={channelName}
							required
							placeholder="Enter here"
							onChange={(e) => {
								setChannelName(e.target.value);
							}}
						/>
						<FormBottom>
							<Button1
								onClick={() => {
									handleClose();
								}}
							>
								Close
							</Button1>
							<Button2
								type="submit"
								onClick={(e) => {
									handleSubmit(e);
								}}
							>
								Submit
							</Button2>
						</FormBottom>
					</form>
				</ModalContainer>
			</ModalWrapper>
		</ThemeProvider>
	);
};

export default Modal;

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const FormBottom = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end !important;
	align-items: center;
	margin-top: 15px;
`;

const Button1 = styled.button`
	margin: 4px;
`;

const Button2 = styled.button`
	margin: 4px;
`;

const ModalContainer = styled.div`
	position: absolute;
	cursor: default !important;
	width: 500px;
	z-index: 101 !important;
	top: 20%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	opacity: initial;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	border-radius: 10px;
	color: ${(props) => (props.theme == lightTheme ? "FFF" : props.theme.text)};
	background: ${(props) =>
		props.theme == lightTheme ? "#3F0F40" : props.theme.secondary};

	> form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end !important;
		margin-top: 20px;
		width: 80%;
	}

	> form > input {
		opacity: unset;
		outline: none;
		width: 80%;
		color: ${(props) => props.theme.text};
		background: ${(props) => props.theme.secondary};
		border: 1px solid gray;
		border-radius: 20px;
		padding: 19px;
		animation: ${fadeIn} 1s 1;
		font-family: inherit;
		font-weight: bold;

		::-webkit-input-placeholder {
			color: ${(props) => props.theme.text};
			opacity: 0.7;
			transition: all 1s ease-out;
		}
		::-moz-placeholder {
			color: ${(props) => props.theme.text};
			opacity: 0.7;
			transition: all 1s ease-out;
		}
		:-ms-input-placeholder {
			color: ${(props) => props.theme.text};
			opacity: 0.7;
			transition: all 1s ease-out;
		}

		:focus::-webkit-input-placeholder {
			opacity: 0.7;
			color: transparent;
		}
	}
`;

const ModalWrapper = styled.div`
	:before {
		content: "";
		position: fixed;
		top: 0px;
		z-index: 100 !important;
		left: 0px;
		background-color: ${(props) => props.theme.accent};
		opacity: 0.1;
		width: 100vw;
		height: 100vh;
	}
`;
