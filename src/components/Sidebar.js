import React, { useState } from "react";
import styled from "styled-components";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import SidebarOption from "./SidebarOption";
import { useAuthState } from "react-firebase-hooks/auth";
import device from "./assets/styles/devices";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { IconButton } from "@material-ui/core";
import devices from "./assets/styles/devices";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/actions/index";
function Sidebar() {
	const [channels, loading, error] = useCollection(db.collection("rooms"));
	const [user] = useAuthState(auth);
	const sideBarIsOpen = useSelector((state) => {
		return state.app.sideBar;
	});
	const dispatch = useDispatch();
	return sideBarIsOpen ? (
		<SidebarContainerOpen>
			<SidebarHeader>
				<SidebarInfo>
					<h2>Jordan's HQ</h2>
					<h3>
						<RadioButtonCheckedIcon />
						{user?.displayName}
					</h3>
				</SidebarInfo>
				<IconButton
					onClick={() => {
						dispatch(action.toggleSideBar());
					}}
				>
					<NavigateBeforeIcon />
				</IconButton>
			</SidebarHeader>

			<SidebarOption Icon={InsertCommentIcon} title="Threads" />
			<SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
			<SidebarOption Icon={DraftsIcon} title="Saved Items" />
			<SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
			<SidebarOption Icon={PeopleAltIcon} title="People & User Groups" />
			<SidebarOption Icon={AppsIcon} title="Apps" />
			<SidebarOption Icon={FileCopyIcon} title="File Browser" />
			<SidebarOption Icon={ExpandLessIcon} title="Show Less" />
			<hr />
			<SidebarOption Icon={ExpandMoreIcon} title="Channels" />
			<hr />
			<SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
			{channels?.docs.map((doc) => {
				return (
					<SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
				);
			})}
		</SidebarContainerOpen>
	) : (
		<SidebarContainerClosed
			onClick={() => {
				dispatch(action.toggleSideBar());
			}}
		>
			<div>&nbsp;</div>
			<div>&nbsp;</div>
		</SidebarContainerClosed>
	);
}

export default Sidebar;

const SidebarContainerClosed = styled.div`
	background-color: var(--slack-color);
	cursor: pointer;
	margin-top: 80px;
	transition: all 1s ease-in;
	display: block;
	width: 25px;
	height: 15vh;
	border-bottom-right-radius: 999px;
	border-top-right-radius: 999px;
	border: 1px solid gray;
	border-left: 0px;
	display: flex;

	> div {
		margin: 1.5px;
		position: relative;
		top: 18%;
		left: 5px;
		background-color: whitesmoke;
		width: 2px;
		height: 60%;
	}
`;

const SidebarContainerOpen = styled.div`
	background-color: var(--slack-color);
	transition: all 1s ease-in;
	color: white;
	flex: 0.3;
	margin-top: 60px;
	@media ${device.mobileXL} {
		min-width: 50%;
	}

	border-top: 1px solid rgb(148, 148, 148);

	> hr {
		margin-top: 10px;
		margin-bottom: 10px;
		border: 1px solid rgb(148, 148, 148);
	}
	overflow-y: auto;
`;

const SidebarHeader = styled.div`
	display: flex;
	border-bottom: 1px solid rgb(148, 148, 148);
	padding: 13px;

	.MuiSvgIcon-root {
		color: #49274b;
		padding: 8px;
		font-size: 17px;
		background-color: white;
		border-radius: 50%;
		cursor: pointer;
	}
`;

const SidebarInfo = styled.div`
	flex: 1;
	> h2 {
		font-size: 15px;
		font-weight: 900;
		margin-bottom: 5px;
	}
	> h3 {
		display: flex;
		font-size: 15px;
		font-weight: 400;
		align-items: center;
	}

	> h3 > {
		.MuiSvgIcon-root {
			padding: 8px;
			background: transparent;
			font-size: 14px;
			margin-top: 1px;
			margin-right: 2px;
			color: rgb(0, 231, 0);
		}
	}
`;
