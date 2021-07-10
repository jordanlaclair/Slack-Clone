import * as actionTypes from "./actionTypes";

export const enterRoom = (id) => {
	return {
		type: actionTypes.ENTER_ROOM,
		value: id,
	};
};

export const toggleTheme = () => {
	return {
		type: actionTypes.TOGGLE_THEME,
	};
};

export const toggleSideBar = () => {
	return {
		type: actionTypes.TOGGLE_SIDEBAR,
	};
};
