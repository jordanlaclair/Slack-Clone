import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../store/actions/index";
import { IconButton } from "@material-ui/core";

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
	const dispatch = useDispatch();
	const selectChannel = () => {
		if (id) {
			dispatch(action.enterRoom(id));
		}
	};

	const addChannel = () => {
		const channelName = prompt("Please enter the channel name");
		if (channelName) {
			db.collection("rooms").add({
				name: channelName,
			});
		}
	};

	const optionStyle = {
		display: "flex",
		justifyContent: "flex-start",
		fontWeight: 500,
		paddingLeft: "10px",
		fontSize: "12px",
		width: "100%",
		borderRadius: "0px",
	};

	return (
		<SidebarOptionContainer
			onClick={addChannelOption ? addChannel : selectChannel}
		>
			{" "}
			<IconButton style={optionStyle} color="inherit">
				{Icon ? (
					<>
						<Icon style={{ padding: 5 }} /> <h3>{title}</h3>{" "}
					</>
				) : (
					<SidebarOptionChannel>
						<span>#</span> {title}
					</SidebarOptionChannel>
				)}
			</IconButton>
		</SidebarOptionContainer>
	);
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
	display: flex;
	font-size: 12px;
	align-items: center;
	padding-left: 2px;
	cursor: pointer;
	transition: all 0.5s linear;
	:hover {
		opacity: 0.9;
		background-color: #862e9c;
	}

	> h3 {
		font-weight: 500;
	}

	> h3 > span {
		padding: 15px;
	}

	> .MuiSvgIcon-root {
		font-size: 12px !important;
		font-weight: 500 !important;
		padding-left: 2px !important;
	}
`;

const SidebarOptionChannel = styled.h3`
	padding: 10px 0;
	font-weight: 300;
`;
