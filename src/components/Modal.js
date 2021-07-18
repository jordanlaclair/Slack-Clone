import { dark } from "@material-ui/core/styles/createPalette";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { db } from "../firebase";
import * as action from "../store/actions/index";
import { darkTheme, lightTheme } from "./assets/styles/Themes";
import CloseIcon from "@material-ui/icons/Close";
import devices from "./assets/styles/devices";
import { Button } from "@material-ui/core";

const Modal = () => {
	const theme = useSelector((state) => state.app.theme);
	const [outsideModalClick, setOutsideModalClick] = useState(false);
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
					<FormTop>
						<h3>Please enter the channel name: </h3>
						<CloseIcon
							onClick={() => {
								handleClose();
							}}
						/>
					</FormTop>
					<hr />
					<form action="">
						<input
							type="text"
							name="input"
							value={channelName}
							required
							placeholder="Enter here"
							onChange={(e) => {
								setChannelName(e.target.value);
							}}
						/>
						<Button
							hidden
							type="submit"
							name="submit_channel"
							onClick={(e) => {
								handleSubmit(e);
							}}
						>
							SEND
						</Button>
						<FormBottom>
							<ButtonComponent
								onClick={() => {
									handleClose();
								}}
							>
								<h4>Close</h4>
							</ButtonComponent>
							<ButtonComponent
								type="submit"
								onClick={(e) => {
									handleSubmit(e);
								}}
							>
								<h4>Submit</h4>
							</ButtonComponent>
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

const slideDown = keyframes`
	0% {
		transform: translate(-50%, -100%);

	}
	50%{
		transform: translate(-50%, -22%);
	}
	65%{
		transform: translate(-50%, -34%);
	}
	80%{
		transform: translate(-50%, -26%);
	}
	95%{
		transform: translate(-50%, -32%);
	}			
	100% {
		transform: translate(-50%, -30%);
	}
`;

const FormTop = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	.MuiSvgIcon-root {
		font-size: 2.5rem;
		cursor: pointer;
	}
`;

const FormBottom = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end !important;
	align-items: center;
	margin-top: 15px;
`;

const ButtonComponent = styled.button`
	margin: 4px;
	font-family: inherit;
	padding: 5px 10px;
	outline: none;
	color: ${(props) => props.theme.text};
	background: ${(props) => (props.theme == lightTheme ? "white" : "#3F0F40")};
	cursor: pointer;
	border-radius: 5px;
	border: 2px solid whitesmoke;

	:hover {
		background: ${(props) => props.theme.hover};
	}
`;

const ModalContainer = styled.div`
	position: fixed;
	cursor: default !important;
	width: 500px;
	z-index: 101 !important;
	top: 10rem;
	left: 50%;
	/* transform: translate(-50%, -50%); */
	display: flex;
	-webkit-box-shadow: 2px 2px 5px 2px #3f0f40;
	box-shadow: 2px 2px 3px 2px #3f0f40;

	animation: ${slideDown} 1s ease 1 forwards;
	opacity: initial;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 23px;
	border-radius: 10px;
	background: ${(props) =>
		props.theme == lightTheme ? "#3F0F40" : props.theme.secondary};

	> hr {
		width: 100%;
		margin: 1rem 0px;
	}
	> form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end !important;
		margin-top: 20px;
		width: 80%;
	}

	> form > button {
		display: none !important;
	}

	> form > input {
		opacity: unset;
		outline: none;
		width: 80%;
		color: ${(props) => props.theme.text};
		background: ${(props) => props.theme.secondary};
		border: 1px solid gray;
		border-radius: 20px;
		padding: 18px;
		animation: ${fadeIn} 1s 1;
		font-family: inherit;
		font-weight: bold;

		::-webkit-input-placeholder {
			color: ${(props) => props.theme.text};
			opacity: 0.5;
			transition: all 1s ease-out;
		}
		::-moz-placeholder {
			color: ${(props) => props.theme.text};
			opacity: 0.5;
			transition: all 1s ease-out;
		}
		:-ms-input-placeholder {
			color: ${(props) => props.theme.text};
			opacity: 0.5;
			transition: all 1s ease-out;
		}

		:focus::-webkit-input-placeholder {
			opacity: 0.5;
			color: transparent;
		}
	}

	@media ${devices.mobileXL} {
		width: 350px;
		font-size: smaller;
	}

	@media ${devices.mobileM} {
		width: 300px;
	}
	@media ${devices.mobileXS} {
		width: 220px;
	}
`;

const ModalWrapper = styled.div`
	position: fixed;
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
