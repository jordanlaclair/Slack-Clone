import React from "react";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "./ChatInput.js";
import { useSelector } from "react-redux";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
const Chat = () => {
	const roomId = useSelector((state) => state.rooms.roomId);
	const [roomDetails] = useDocument(
		roomId && db.collection("rooms".doc(roomId))
	);
	const [roomMessages] = useCollection(
		roomId &&
			db
				.collection("rooms")
				.doc(roomId)
				.collection("messages")
				.orderBy("timestamp", "asc")
	);
	console.log(roomId);
	return (
		<ChatContainer>
			<>
				<Header>
					<HeaderLeft>
						<h4>
							<strong>#Room-name</strong>
						</h4>
						<StarBorderOutlinedIcon />
					</HeaderLeft>

					<HeaderRight>
						<p>
							<InfoOutlinedIcon /> Details
						</p>
					</HeaderRight>
				</Header>
				<ChatMessages></ChatMessages>

				<ChatInput channelId={roomId} channelName={roomDetails?.data().name} />
			</>
		</ChatContainer>
	);
};

export default Chat;

const ChatContainer = styled.div`
	flex: 0.7;
	margin-top: 60px;
	flex-grow: 1;
	overflow-y: scroll;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	border-bottom: 1px solid lightgray;
`;

const HeaderRight = styled.div`
	> p {
		display: flex;
		align-items: center;
		font-size: 14px;
	}

	> p > .MuiSvgIcon-root {
		margin-right: 5px !important;
		font-size: 15px;
	}
`;

const HeaderLeft = styled.div`
	display: flex;
	align-items: center;

	> h4 {
		display: flex;
		text-transform: lowercase;
		margin-right: 10px;
	}

	> h4 > .MuiSvgIcon-root {
		margin-left: 20px;
		font-size: 18px;
	}
`;

const ChatMessages = styled.div``;
