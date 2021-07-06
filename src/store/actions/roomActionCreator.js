import * as actionTypes from "./actionTypes";

export const enterRoom = (id) => {
	return {
		type: actionTypes.ENTER_ROOM,
		value: id,
	};
};
