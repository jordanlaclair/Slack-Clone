import React from "react";
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

const Sidebar = () => {
	const [channels, loading, error] = useCollection(db.collection("rooms"));
	const [user] = useAuthState(auth);

	return (
		<SidebarContainer>
			<SidebarHeader>
				<SidebarInfo>
					<h2>Jordan's HQ</h2>
					<h3>
						<RadioButtonCheckedIcon />
						{user?.displayName}
					</h3>
				</SidebarInfo>
				<CreateIcon />
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
		</SidebarContainer>
	);
};

export default Sidebar;

const SidebarContainer = styled.div`
	background-color: var(--slack-color);
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
