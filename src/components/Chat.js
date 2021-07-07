import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "./ChatInput.js";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
const Chat = () => {
	const chatRef = useRef(null);
	const roomId = useSelector((state) => state.rooms.roomId);
	const [roomDetails] = useDocument(
		roomId && db.collection("rooms").doc(roomId)
	);
	const [roomMessages, loading] = useCollection(
		roomId &&
			db
				.collection("rooms")
				.doc(roomId)
				.collection("messages")
				.orderBy("timestamp", "asc")
	);
	useEffect(() => {
		chatRef?.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [roomId, loading]);
	return (
		<ChatContainer>
			{roomDetails && roomMessages ? (
				<>
					<Header>
						<HeaderLeft key={roomDetails?.data().name}>
							<h4>
								<strong>#{roomDetails?.data().name}</strong>
							</h4>
							<StarBorderOutlinedIcon />
						</HeaderLeft>

						<HeaderRight>
							<p>
								<InfoOutlinedIcon /> Details
							</p>
						</HeaderRight>
					</Header>
					<ChatMessages>
						{roomMessages?.docs.map((doc) => {
							const { message, timestamp, user, userImage } = doc.data();

							return (
								<Message
									key={doc.id}
									message={message}
									timestamp={timestamp}
									user={user}
									userImage={userImage}
								/>
							);
						})}
						<ChatBottom ref={chatRef} />
					</ChatMessages>

					<ChatInput
						chatRef={chatRef}
						channelId={roomId}
						channelName={roomDetails?.data().name}
					/>
				</>
			) : (
				<div>
					<h4>Pick a room!</h4>
				</div>
			)}
		</ChatContainer>
	);
};

export default Chat;

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const ChatContainer = styled.div`
	flex: 0.7;
	margin-top: 60px;
	flex-grow: 1;
	overflow-y: scroll;
`;

const ChatBottom = styled.div`
	padding-bottom: 200px;
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
	animation: ${fadeIn} 1s 1;

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
