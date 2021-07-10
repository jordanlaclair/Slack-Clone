import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { purple, green } from "@material-ui/core/colors";
import { IconButton } from "@material-ui/core";
import { lightTheme, darkTheme } from "./assets/styles/Themes";
import { GlobalStyles } from "./assets/styles/globalStyles";
import { ThemeProvider } from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../store/actions/index";
import Switch from "@material-ui/core/Switch";
import device from "./assets/styles/devices";

const Header = () => {
	const [user, loading] = useAuthState(auth);
	const [sliderState, setSliderState] = useState(false);
	const [input, setInput] = useState("");
	const theme = useSelector((state) => state.app.theme);
	const dispatch = useDispatch();
	const SlackSwitch = withStyles({
		switchBase: {
			color: purple[300],

			"&$checked": {
				color: purple[500],
			},
			"&$checked + $track": {
				backgroundColor: purple[500],
			},
		},
		checked: {},
		track: { backgroundColor: purple[50] },
	})(Switch);

	const themeToggler = (e) => {
		dispatch(action.toggleTheme());

		setSliderState((prevState) => {
			return !prevState;
		});
	};

	const clear = (e) => {
		if (e.which === 13) {
			e.preventDefault();
			setInput("");
		}
	};

	useEffect(() => {
		console.log({ theme });
	}, [theme]);

	return (
		<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
			<GlobalStyles />
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
					<IconButton color="inherit">
						<SearchIcon />
					</IconButton>
					<form action="">
						<input
							onKeyPress={clear}
							type="text"
							value={input}
							onChange={(e) => {
								setInput(e.target.value);
							}}
							placeholder="Search"
						/>
					</form>
				</HeaderSearch>

				<HeaderRight>
					<SlackSwitch
						checked={sliderState}
						onChange={themeToggler}
						name="checkedA"
						inputProps={{ "aria-label": "secondary checkbox" }}
					/>
					<IconButton id="help_icon" color="inherit">
						<HelpOutlineIcon />
					</IconButton>
				</HeaderRight>
			</HeaderContainer>
		</ThemeProvider>
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
	color: white;
	border: 1px whitesmoke solid;

	> form {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	form > input {
		background-color: transparent;
		border: none;
		text-align: start;
		min-width: 10vw;
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
		@media ${device.mobileXL} {
			display: none;
		}
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
	align-items: center;
	justify-content: flex-end !important;
	> .MuiSvgIcon {
		align-self: flex-end;
		margin-left: auto;
		margin-right: 20px;
	}

	#help_icon {
		@media ${device.mobileXL} {
			display: none;
		}
	}
`;
