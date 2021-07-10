import * as actionTypes from "../actions/actionTypes";

const initialState = {
	roomId: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ENTER_ROOM:
			return {
				...state,
				roomId: action.value,
			};

		default:
			return state;
	}
};

export default reducer;
