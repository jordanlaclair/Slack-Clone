import roomReducer from "./roomReducer";
import globalReducer from "./globalReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({
	app: globalReducer,
	rooms: roomReducer,
});

export default allReducers;
