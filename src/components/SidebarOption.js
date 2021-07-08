import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../store/actions/index";
import { IconButton } from "@material-ui/core";
import device from "./assets/styles/devices";

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
		fontSize: "inherit",
		width: "100%",
		borderRadius: "0px",
		padding: "inherit",
	};

	return (
		<SidebarOptionContainer
			onClick={addChannelOption ? addChannel : selectChannel}
		>
			{" "}
			<IconButton style={optionStyle} color="inherit">
				{Icon ? (
					<>
						<Icon style={{ padding: "inherit", paddingRight: "5px" }} />{" "}
						<h3>{title}</h3>{" "}
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
	cursor: pointer;
	transition: all 0.5s linear;
	padding: 8px;

	@media ${device.mobileXL} {
		font-size: 8px;
		padding: 5px;
	}

	@media (max-height: 900px) {
		font-size: 10px;
		padding: 5px;
	}
	:hover {
		opacity: 0.9;
		background-color: #862e9c;
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
	padding: 2px 2px;
	font-weight: 300;
`;
