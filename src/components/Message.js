import React from "react";
import styled, { keyframes } from "styled-components";

const Message = ({ timestamp, message, userImage, user }) => {
	return (
		<MessageContainer>
			<img src={userImage} alt="" />
			<MessageInfo>
				<h4>
					{user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
				</h4>
				<p>{message}</p>
			</MessageInfo>
		</MessageContainer>
	);
};

export default Message;

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const MessageContainer = styled.div`
	display: flex;
	animation: ${fadeIn} 1s ease-in-out 1;
	align-items: center;
	padding: 19px;
	> img {
		height: 49px;
		border-radius: 7px;
	}
`;

const MessageInfo = styled.div`
	padding-left: 9px;
	> h4 > span {
		font-size: 10;
		color: gray;
		margin-left: 4px;
		font-weight: 300;
	}
`;
