import * as actionTypes from "../actions/actionTypes";

const initialState = {
	roomId: null,
	theme: "light",
	sideBar: true,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ENTER_ROOM:
			return {
				...state,
				roomId: action.value,
			};

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

		default:
			return state;
	}
};

export default reducer;
