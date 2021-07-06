import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { db } from "../firebase";
const ChatInput = ({ channelName, channelId }) => {
	const [input, setInput] = useState("");
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
			user: "Jordan Molina",
		});

		setInput("");
	};

	return (
		<ChatInputContainer>
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
	);
};

export default ChatInput;

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
		bottom: 29px;
		border: 1px solid gray;
		border-radius: 20px;
		padding: 19px;
	}

	> form > button {
		display: none !important;
	}
`;
