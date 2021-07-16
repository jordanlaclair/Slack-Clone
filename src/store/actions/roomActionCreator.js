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

export const showModal = () => {
	return {
		type: actionTypes.SHOW_MODAL,
	};
};

export const closeModal = () => {
	return {
		type: actionTypes.CLOSE_MODAL,
	};
};
