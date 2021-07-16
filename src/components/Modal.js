import { dark } from "@material-ui/core/styles/createPalette";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import * as action from "../store/actions/index";
import { darkTheme, lightTheme } from "./assets/styles/Themes";

const Modal = () => {
	const theme = useSelector((state) => state.app.theme);

	const handleClose = () => {
		dispatch(action.closeModal());
	};

	const handleSubmit = () => {
		dispatch(action.closeModal());
	};

	const dispatch = useDispatch();

	return (
		<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
			<ModalContainer>
				<h2>Modal</h2>
				<button
					onClick={() => {
						handleClose();
					}}
				>
					Close
				</button>
				<button
					onClick={() => {
						handleSubmit();
					}}
				>
					Submit
				</button>
			</ModalContainer>
		</ThemeProvider>
	);
};

export default Modal;

const ModalContainer = styled.div`
	position: fixed;
	top: 20%;
	left: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	padding: 20px;

	color: ${(props) => (props.theme == lightTheme ? "FFF" : props.theme.text)};
	background: ${(props) =>
		props.theme == lightTheme ? "#3F0F40" : props.theme.secondary};
`;
