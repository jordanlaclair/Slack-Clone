import * as actionTypes from "../actions/actionTypes";

const initialState = {
	theme: "light",
	sideBar: true,
	showModal: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_THEME:
			return {
				...state,
				theme: state.theme === "light" ? "dark" : "light",
			};

		case actionTypes.TOGGLE_SIDEBAR:
			return {
				...state,
				sideBar: !state.sideBar,
			};

		case actionTypes.SHOW_MODAL:
			return {
				...state,
				showModal: true,
			};

		case actionTypes.CLOSE_MODAL:
			return {
				...state,
				showModal: false,
			};

		default:
			return state;
	}
};

export default reducer;
