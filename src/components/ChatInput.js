import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./assets/styles/Themes";
import { useSelector } from "react-redux";
import device from "./assets/styles/devices";

const ChatInput = ({ channelName, channelId, chatRef }) => {
	const [input, setInput] = useState("");
	const [user] = useAuthState(auth);
	const theme = useSelector((store) => {
		return store.app.theme;
	});
	const sideBarIsOpen = useSelector((state) => {
		return state.app.sideBar;
	});

	const sendMessage = (e) => {
		//prevent refresh
		e.preventDefault();

		//this may change later
		if (!channelId) {
			return false;
		}

		db.collection("rooms").doc(channelId).collection("messages").add({
			message: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			user: user?.displayName,
			userImage: user?.photoURL,
		});

		setInput("");

		chatRef.current.scrollIntoView({
			behavior: "smooth",
		});
	};

	return (
		<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
			<ChatInputContainer
				key={channelName}
				size={sideBarIsOpen ? "secondary" : "primary"}
			>
				<form action="">
					<input
						value={input}
						onChange={(e) => {
							setInput(e.target.value);
						}}
						type="text"
						placeholder={`Message #${channelName}`}
					/>
					<Button
						hidden
						type="submit"
						onClick={(e) => {
							sendMessage(e);
						}}
					>
						SEND
					</Button>
				</form>
			</ChatInputContainer>
		</ThemeProvider>
	);
};

export default ChatInput;

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const ChatInputContainer = styled.div`
	border-radius: 20px;
	> form {
		position: relative;
		display: flex;
		justify-content: center;
	}
	> form > input {
		outline: none;

		position: fixed;
		width: 60%;
		color: ${(props) => props.theme.text};
		background: ${(props) => props.theme.secondary};

		bottom: 29px;
		border: 1px solid gray;
		border-radius: 20px;
		padding: 19px;
		animation: ${fadeIn} 1s 1;
		font-family: inherit;
		font-weight: bold;

		@media ${device.mobileXL} {
			width: ${(props) => (props.size === "secondary" ? "30%" : "60%")};
		}

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
			color: transparent;
		}
	}

	> form > button {
		display: none !important;
	}
`;
