import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { db } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../store/actions/index";
import device from "./assets/styles/devices";
import Modal from "./Modal";

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
	const dispatch = useDispatch();
	const showModal = useSelector((state) => state.app.showModal);

	const sideBarIsOpen = useSelector((state) => state.app.sideBar);
	const selectChannel = (e) => {
		if (id) {
			dispatch(action.enterRoom(id));
		}
	};

	const showModalFunc = (e) => {
		dispatch(action.showModal());
	};

	return (
		<SidebarOptionContainer
			onClick={addChannelOption ? showModalFunc : selectChannel}
			isOpen={sideBarIsOpen ? "true" : "false"}
		>
			{Icon ? (
				<>
					<Icon style={{ padding: "inherit", paddingRight: "8px" }} />{" "}
					<h3>{title}</h3>{" "}
				</>
			) : (
				<SidebarOptionChannel>
					<span>#</span> {title}
				</SidebarOptionChannel>
			)}
			{showModal ? <Modal /> : null}
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
	padding: 6px;

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
		font-weight: 500;
		font-size: 30px;
	}

	${(props) => (props.isOpen === "false" ? null : openStyle)}
`;
const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;
const openStyle = css`
	animation: ${fadeIn} 3s;
`;
const SidebarOptionChannel = styled.h3`
	padding: 2px 2px;
	font-weight: 300;
`;
