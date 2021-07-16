import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "./ChatInput.js";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Chat = () => {
	const chatRef = useRef(null);
	const roomId = useSelector((state) => state.rooms.roomId);
	const [user] = useAuthState(auth);

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
						{roomMessages.docs.length == 0 ? (
							<NoMessages>Be the first to send a message!</NoMessages>
						) : (
							roomMessages?.docs.map((doc) => {
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
							})
						)}
						<ChatBottom ref={chatRef} />
					</ChatMessages>

					<ChatInput
						chatRef={chatRef}
						channelId={roomId}
						channelName={roomDetails?.data().name}
					/>
				</>
			) : user && loading ? null : (
				<HomePageContainer>
					<HomePageContents>
						<h1>Welcome!</h1>
						<h4>Select a room to begin chatting!</h4>
						<svg
							viewBox="0 0 112 112"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="Group 1">
								<g id="Slack logo (new)" clip-path="url(#clip0)">
									<path
										id="logo8"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M40.9655 30.069H11.1724C5.00193 30.069 0 35.0709 0 41.2414C0 47.4119 5.00193 52.4138 11.1724 52.4138H40.9655C47.136 52.4138 52.1379 47.4119 52.1379 41.2414C52.1379 35.0709 47.136 30.069 40.9655 30.069"
										fill="#36C5F0"
									/>
									<path
										id="logo7"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M81.931 41.2414V11.4483C81.931 5.27779 76.9291 0.275862 70.7586 0.275862C64.5881 0.275862 59.5862 5.27779 59.5862 11.4483V41.2414C59.5862 47.4119 64.5881 52.4138 70.7586 52.4138C76.9291 52.4138 81.931 47.4119 81.931 41.2414"
										fill="#2EB67D"
									/>
									<path
										id="logo6"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M70.7586 82.2069H100.552C106.722 82.2069 111.724 77.205 111.724 71.0345C111.724 64.864 106.722 59.8621 100.552 59.8621H70.7586C64.5881 59.8621 59.5862 64.864 59.5862 71.0345C59.5862 77.205 64.5881 82.2069 70.7586 82.2069"
										fill="#ECB22E"
									/>
									<path
										id="logo5"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M29.7931 71.0345V100.828C29.7931 106.998 34.795 112 40.9655 112C47.136 112 52.1379 106.998 52.1379 100.828V71.0345C52.1379 64.8634 47.136 59.8621 40.9655 59.8621C34.795 59.8621 29.7931 64.864 29.7931 71.0345"
										fill="#E01E5A"
									/>
									<path
										id="logo4"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M40.9655 0.275862C34.795 0.275862 29.7931 5.27779 29.7931 11.4483C29.7931 17.6188 34.795 22.6207 40.9655 22.6207H52.1379V11.4483C52.1379 5.27779 47.136 0.275862 40.9655 0.275862"
										fill="#36C5F0"
									/>
									<path
										id="logo3"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M111.724 41.2414C111.724 35.0709 106.722 30.069 100.552 30.069C94.3812 30.069 89.3793 35.0709 89.3793 41.2414V52.4138H100.552C106.722 52.4138 111.724 47.4119 111.724 41.2414"
										fill="#2EB67D"
									/>
									<path
										id="logo2"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M70.7586 112C76.9291 112 81.931 106.998 81.931 100.828C81.931 94.6571 76.9291 89.6552 70.7586 89.6552H59.5862V100.828C59.5862 106.998 64.5881 112 70.7586 112"
										fill="#ECB22E"
									/>
									<path
										id="logo1"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M0 71.0345C0 77.205 5.00193 82.2069 11.1724 82.2069C17.3429 82.2069 22.3448 77.205 22.3448 71.0345V59.8621H11.1724C5.00193 59.8621 0 64.864 0 71.0345"
										fill="#E01E5A"
									/>
								</g>
							</g>
							<defs>
								<clipPath id="clip0">
									<rect width="112" height="112" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</HomePageContents>
				</HomePageContainer>
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

const fade = keyframes`
	  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const ChatContainer = styled.div`
	flex: 0.7;
	margin-top: 60px;
	flex-grow: 1;
	overflow-y: auto;
	overflow-x: hidden;
`;

const ChatBottom = styled.div`
	padding-bottom: 200px;
`;

const Header = styled.div`
	display: flex;
	margin-top: 8px;
	justify-content: space-between;
	align-items: center !important;
	padding: 15px 20px;
	border-bottom: 1px solid lightgray;
`;

const HeaderRight = styled.div`
	> p {
		display: flex;
		align-items: center;
		font-size: 13px;
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

	.MuiSvgIcon-root {
		font-size: 20px;
	}
`;

const ChatMessages = styled.div``;

const HomePageContainer = styled.div`
	display: flex;
	height: 80%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	text-align: center;
	margin-top: 30px;
	animation: ${fadeIn} 1s linear;
`;
const NoMessages = styled.div`
	margin-left: 10px;
	padding: 10px;
	font-size: 1rem;
`;
const HomePageContents = styled.div`
	font-size: 2rem;
	text-align: center;
	margin-top: 30px;

	> svg {
		object-fit: contain;
		width: 200px;
		margin-top: 30px;

		#logo1 {
			opacity: 1;
			animation: ${fade} 4s ease-in-out 1s infinite;
		}

		#logo2 {
			opacity: 1;
			animation: ${fade} 4s ease-in-out 3s infinite;
		}

		#logo3 {
			opacity: 1;
			animation: ${fade} 4s ease-in-out 3s infinite;
		}

		#logo4 {
			opacity: 1;
			animation: ${fade} 4s ease-in-out 2s infinite;
		}

		#logo5 {
			opacity: 1;
			animation: ${fade} 4s ease-in-out 3s infinite;
		}
		#logo6 {
			opacity: 1;
			animation: ${fade} 4s ease-in-out 1s infinite;
		}
		#logo7 {
			opacity: 1;
			animation: ${fade} 4s ease-in-out 1s infinite;
		}
		#logo8 {
			opacity: 1;
			animation: ${fade} 4s ease-in-out 1s infinite;
		}
	}
`;
