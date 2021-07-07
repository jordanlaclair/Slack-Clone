import React from "react";
import styled, { css } from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Header = () => {
	const [user, loading] = useAuthState(auth);

	return (
		<HeaderContainer>
			<HeaderLeft>
				<HeaderAvatar
					onClick={() => {
						auth.signOut();
					}}
					src={user?.photoURL}
					alt={user?.displayName}
				/>
				<AccessTimeIcon />
			</HeaderLeft>

			<HeaderSearch>
				<SearchIcon />
				<input type="text" placeholder="Search" />
			</HeaderSearch>

			<HeaderRight>
				<HelpOutlineIcon />
			</HeaderRight>
		</HeaderContainer>
	);
};

export default Header;

const HeaderSearch = styled.div`
	flex: 0.4;
	justify-content: flex-start;

	opacity: 1;
	border-radius: 6px;
	background-color: #421f44;
	display: flex;
	padding: 0 15px;
	color: gray;
	border: 1px gray solid;
	> input {
		background-color: transparent;
		border: none;
		text-align: start;
		min-width: 30vw;
		outline: none;
		color: white;
		font-family: inherit;

		::placeholder {
			color: white;
		}

		::-webkit-input-placeholder {
			transition: all 1s ease-out;
		}
		::-moz-placeholder {
			transition: all 1s ease-out;
		}
		:-ms-input-placeholder {
			transition: all 1s ease-out;
		}

		:focus::-webkit-input-placeholder {
			color: transparent;
		}
	}
`;
const HeaderContainer = styled.div`
	display: flex;
	position: fixed;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	padding: 10px 0;
	background: var(--slack-color);
	color: white;
`;

const HeaderLeft = styled.div`
	flex: 0.3;
	display: flex;
	align-items: center;
	margin-left: 19px;

	> .MuiSvgIcon-root {
		margin-left: auto;
		margin-right: 30px;
	}
`;

const HeaderAvatar = styled(Avatar)`
	cursor: pointer;
	:hover {
		opacity: 0.8;
	}
`;

const HeaderRight = styled.div`
	flex: 0.3;
	display: flex;
	align-items: flex-end;
	> .MuiSvgIcon-root {
		margin-left: auto;
		margin-right: 20px;
	}
`;
